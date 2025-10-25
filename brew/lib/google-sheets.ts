type ContactData = {
  name: string
  email: string
  phone: string
  message: string
}

export async function appendContactRow(data: ContactData) {
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID
  const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL
  let privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY

  if (!spreadsheetId || !clientEmail || !privateKey) {
    throw new Error("Google Sheets env eksik; işlem atlandı")
  }

  // .env içinde \n ile gelen anahtarı gerçek yeni satıra çevir
  privateKey = privateKey.replace(/\\n/g, "\n")

  const { google } = await import("googleapis")

  const auth = new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  })

  const sheets = google.sheets({ version: "v4", auth })
  const sheetName = process.env.GOOGLE_SHEETS_SHEET_NAME || "Leads"

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${sheetName}!A:E`,
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [[new Date().toISOString(), data.name, data.email, data.phone, data.message]],
    },
  })
}


