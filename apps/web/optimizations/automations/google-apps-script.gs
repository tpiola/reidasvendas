/**
 * Google Apps Script — Web App para receber leads (POST JSON).
 * Deploy: Publicar como Web app → Executar como: Eu → Quem acessa: Qualquer pessoa.
 * Cole a URL em GOOGLE_SHEETS_WEBHOOK_URL (Vercel) e VITE_GOOGLE_SHEETS_URL (opcional, client).
 */
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Leads') || SpreadsheetApp.getActiveSheet();
  let data = {};
  try {
    data = JSON.parse(e.postData.contents);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: 'invalid_json' })).setMimeType(
      ContentService.MimeType.JSON,
    );
  }

  sheet.appendRow([
    new Date(),
    data.name || '',
    data.email || '',
    data.phone || '',
    data.source || '',
    data.variant || '',
    data.pagePath || '',
    data.receivedAt || '',
  ]);

  return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON);
}
