/**
 * NPQBMS Question Master Database
 * Creates and manages Question_Master_DB
 */


function initializeQuestionMasterDB() {

  const ss = SpreadsheetApp.getActiveSpreadsheet();

  const sheetName = "Question_Master_DB";

  let sheet = ss.getSheetByName(sheetName);


  // Create sheet if missing
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
  }


  // Headers

  const headers = [
    "Question_ID",
    "Question_Text",
    "Subject",
    "Class",
    "Chapter_ID",
    "Concept_ID",
    "Question_Type",
    "Difficulty",
    "Marks",
    "Answer",
    "Solution",
    "Source",
    "Status",
    "Created_Date"
  ];


  // Clear only first row and recreate headers

  sheet.getRange(1,1,1,headers.length)
       .setValues([headers]);


  sheet.setFrozenRows(1);


  // Formatting

  sheet.getRange(1,1,1,headers.length)
       .setFontWeight("bold");


  sheet.autoResizeColumns(
      1,
      headers.length
  );


  logAudit(
    "QUESTION_MASTER_INIT",
    "SUCCESS",
    "Question_Master_DB initialized"
  );


  return "Question_Master_DB ready";

}