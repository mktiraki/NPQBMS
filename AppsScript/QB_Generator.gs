/**
 * ============================================================================
 * NPQBMS
 * File : QB_Generator.gs
 * Purpose : Permanent Question ID Generator
 * Version : 0.1.0
 * ============================================================================
 */

function generateQuestionID(chapterID) {

  const ss = SpreadsheetApp.getActiveSpreadsheet();

  const counterSheet = ss.getSheetByName("ID_Counter");

  if (!counterSheet) {
    throw new Error("ID_Counter sheet not found.");
  }

  // Read all counters
  const data = counterSheet.getDataRange().getValues();

  // Skip header row
  for (let i = 1; i < data.length; i++) {

    if (data[i][0] === chapterID) {

      let nextNumber = Number(data[i][1]) + 1;

      counterSheet.getRange(i + 1, 2).setValue(nextNumber);

      return chapterID + "-" + String(nextNumber).padStart(6, "0");
    }
  }

  // First question of this chapter
  counterSheet.appendRow([chapterID, 1]);

  return chapterID + "-000001";
}


/**
 * Test Function
 */
function testQuestionIDGenerator() {

  const id = generateQuestionID("PHY11-WAV");

  SpreadsheetApp.getUi().alert("Generated ID:\n\n" + id);

}