/**
 * ==========================================================
 * QB_Concept.gs
 * Concept Engine
 * Version : 1.0.0
 * ==========================================================
 */

/**
 * Create or reuse a concept
 */
function createConcept(mainConcept, subConcept, chapterID) {

  mainConcept = cleanText(mainConcept);
  subConcept = cleanText(subConcept);

  if (!mainConcept) {
    throw new Error("Main Concept is required.");
  }

  const existing = findConcept(
    mainConcept,
    subConcept,
    chapterID
  );

  if (existing.found) {

    writeAudit(
      "CREATE CONCEPT",
      "REUSED",
      existing.conceptID
    );

    return existing.conceptID;

  }

  const conceptID = generateConceptID();

  const sheet =
    SpreadsheetApp
      .getActive()
      .getSheetByName(
        QB.SHEETS.CONCEPTS
      );

  sheet.appendRow([

    conceptID,

    chapterID,

    mainConcept,

    subConcept,

    "",

    "SYSTEM",

    new Date()

  ]);

  writeAudit(

    "CREATE CONCEPT",

    "SUCCESS",

    conceptID

  );

  return conceptID;

}


/**
 * Search for an existing concept
 */
function findConcept(mainConcept, subConcept, chapterID){

  const sheet =
    SpreadsheetApp
      .getActive()
      .getSheetByName(
        QB.SHEETS.CONCEPTS
      );

  if(sheet.getLastRow() < 2){

    return {

      found:false

    };

  }

  const data =
    sheet
      .getRange(
        2,
        1,
        sheet.getLastRow()-1,
        7
      )
      .getValues();

  for(let i=0;i<data.length;i++){

    const row = data[i];

    if(

      row[1] == chapterID &&

      row[2] == mainConcept &&

      row[3] == subConcept

    ){

      return {

        found:true,

        conceptID:row[0]

      };

    }

  }

  return {

    found:false

  };

}


/**
 * Generate Concept ID
 */
function generateConceptID(){

  return generateSimpleID("CON");

}


/**
 * Validate Concept
 */
function validateConcept(mainConcept){

  if(!mainConcept){

    throw new Error(
      "Main Concept missing."
    );

  }

  return true;

}


/**
 * Test Function
 */
function testConcept(){

  const conceptID =

    createConcept(

      "Cyclotron",

      "Working Principle",

      "PHY11-WAV"

    );

  SpreadsheetApp

    .getUi()

    .alert(

      "Concept ID : " +

      conceptID

    );

}