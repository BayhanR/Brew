// Cross-platform copy of public/ and .next/static into .next/standalone
// - Safe no-op if standalone or sources don't exist
const fs = require('fs')
const path = require('path')

function copyDir(src, dest) {
  if (!fs.existsSync(src)) return
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true })
  }
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name)
    const d = path.join(dest, entry.name)
    if (entry.isDirectory()) {
      copyDir(s, d)
    } else if (entry.isFile()) {
      fs.copyFileSync(s, d)
    }
  }
}

function main() {
  const root = process.cwd()
  const standaloneDir = path.join(root, '.next', 'standalone')
  const nextStatic = path.join(root, '.next', 'static')
  const targetStatic = path.join(standaloneDir, '.next', 'static')
  const publicDir = path.join(root, 'public')
  const targetPublic = path.join(standaloneDir, 'public')

  if (!fs.existsSync(standaloneDir)) {
    // Not a standalone build; skip
    return
  }
  if (fs.existsSync(publicDir)) {
    copyDir(publicDir, targetPublic)
  }
  if (fs.existsSync(nextStatic)) {
    copyDir(nextStatic, targetStatic)
  }
}

main()


