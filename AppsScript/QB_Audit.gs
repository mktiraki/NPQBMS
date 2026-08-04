function writeAudit(action, status, remarks) {

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(QB.SHEETS.AUDIT);

  if (!sheet) {
    throw new Error("audit log sheet not found");
  }

  sheet.appendRow([
    new Date(),
    action,
    status,
    remarks
  ]);

}

function testAudit(){

  writeAudit(
    "TEST",
    "SUCCESS",
    "Audit logging connected"
  );

}