/**
 * Güvenlik Utility Fonksiyonları
 * Rate limiting, input sanitization, ve güvenlik loglama
 */

// Rate limiting için IP bazlı kayıt
const rateLimitMap = new Map<
  string,
  { count: number; resetTime: number }
>();

// Engellenmiş IP listesi
const BLOCKED_IPS = [
  '47.90.254.34', // Saldırgan IP
  // Buraya ek IP'ler eklenebilir
];

// Rate limit ayarları
const RATE_LIMIT = {
  windowMs: 60000, // 1 dakika
  maxRequests: 100, // Maksimum istek sayısı
  apiMaxRequests: 20, // API için maksimum istek sayısı
};

/**
 * IP adresini request'ten çıkarır
 */
export function getClientIP(request: Request | { headers: Headers }): string {
  const headers = request.headers;
  const forwardedFor = headers.get('x-forwarded-for');
  const realIP = headers.get('x-real-ip');
  const cfConnectingIP = headers.get('cf-connecting-ip'); // Cloudflare

  if (forwardedFor) {
    // x-forwarded-for birden fazla IP içerebilir, ilkini al
    return forwardedFor.split(',')[0].trim();
  }

  return realIP || cfConnectingIP || 'unknown';
}

/**
 * Rate limiting kontrolü
 */
export function checkRateLimit(
  ip: string,
  isApiRoute: boolean = false
): { allowed: boolean; remaining: number; resetTime: number } {
  const now = Date.now();
  const maxRequests = isApiRoute
    ? RATE_LIMIT.apiMaxRequests
    : RATE_LIMIT.maxRequests;
  const record = rateLimitMap.get(ip);

  // Eski kayıtları temizle (memory leak önleme)
  if (rateLimitMap.size > 10000) {
    const cutoff = now - RATE_LIMIT.windowMs;
    for (const [key, value] of rateLimitMap.entries()) {
      if (value.resetTime < cutoff) {
        rateLimitMap.delete(key);
      }
    }
  }

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, {
      count: 1,
      resetTime: now + RATE_LIMIT.windowMs,
    });
    return {
      allowed: true,
      remaining: maxRequests - 1,
      resetTime: now + RATE_LIMIT.windowMs,
    };
  }

  if (record.count >= maxRequests) {
    logSecurityEvent('rate_limit_exceeded', {
      ip,
      count: record.count,
      isApiRoute,
    });
    return {
      allowed: false,
      remaining: 0,
      resetTime: record.resetTime,
    };
  }

  record.count++;
  return {
    allowed: true,
    remaining: maxRequests - record.count,
    resetTime: record.resetTime,
  };
}

/**
 * IP engelleme kontrolü
 */
export function isIPBlocked(ip: string): boolean {
  return BLOCKED_IPS.includes(ip);
}

/**
 * Input sanitization - Tehlikeli karakterleri temizler
 */
export function sanitizeInput(input: string): string {
  if (typeof input !== 'string') {
    return '';
  }

  // Shell komut karakterlerini engelle
  const dangerousChars = [
    ';',
    '|',
    '&',
    '`',
    '$',
    '(',
    ')',
    '<',
    '>',
    '\n',
    '\r',
    '\0',
  ];

  let sanitized = input;
  dangerousChars.forEach((char) => {
    sanitized = sanitized.replace(new RegExp(`\\${char}`, 'g'), '');
  });

  // Base64 decode girişimlerini engelle (basit kontrol)
  if (sanitized.match(/^[A-Za-z0-9+/=]{50,}$/)) {
    logSecurityEvent('suspicious_base64', { input: input.substring(0, 100) });
  }

  return sanitized.trim();
}

/**
 * URL validation - Güvenli URL kontrolü
 */
export function isValidURL(url: string): boolean {
  try {
    const parsed = new URL(url);
    // Sadece http ve https protokollerine izin ver
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      return false;
    }
    // Localhost ve private IP'leri engelle
    if (
      parsed.hostname === 'localhost' ||
      parsed.hostname.startsWith('127.') ||
      parsed.hostname.startsWith('192.168.') ||
      parsed.hostname.startsWith('10.') ||
      parsed.hostname.startsWith('172.')
    ) {
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

/**
 * Güvenlik olaylarını loglar
 */
export function logSecurityEvent(
  type:
    | 'attack'
    | 'suspicious'
    | 'blocked'
    | 'rate_limit_exceeded'
    | 'suspicious_base64'
    | 'invalid_input',
  details: Record<string, any>
): void {
  const logEntry = {
    timestamp: new Date().toISOString(),
    type,
    ...details,
  };

  // Development'ta console'a yaz
  if (process.env.NODE_ENV === 'development') {
    console.error(`[SECURITY] ${type.toUpperCase()}:`, logEntry);
  }

  // Production'da bir log servisine gönderilebilir (Sentry, LogRocket, vb.)
  // Örnek: Sentry.captureMessage(`Security event: ${type}`, { extra: logEntry });
}

/**
 * Request'i güvenlik açısından kontrol eder
 */
export function validateRequest(request: Request): {
  valid: boolean;
  reason?: string;
} {
  const ip = getClientIP(request);
  const userAgent = request.headers.get('user-agent') || '';

  // IP engelleme kontrolü
  if (isIPBlocked(ip)) {
    logSecurityEvent('blocked', { ip, reason: 'blocked_ip' });
    return { valid: false, reason: 'IP blocked' };
  }

  // Şüpheli user agent kontrolü
  const suspiciousPatterns = [
    /curl/i,
    /wget/i,
    /python/i,
    /^$/,
    /base64/i,
  ];
  if (suspiciousPatterns.some((pattern) => pattern.test(userAgent))) {
    logSecurityEvent('suspicious', {
      ip,
      userAgent,
      reason: 'suspicious_user_agent',
    });
  }

  return { valid: true };
}

