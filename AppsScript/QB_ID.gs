/**
 * ==========================================================
 * QB_ID.gs
 * ID Generation Engine
 * Version : 2.0.0
 * ==========================================================
 */


/* ==========================================================
   QUESTION ID
   Example:
   PHY11-WAV-000001
========================================================== */

function generateQuestionID(chapterCode){

  if(!chapterCode){

    chapterCode = "UNASSIGNED";

  }

  const sheet =
    SpreadsheetApp
      .getActive()
      .getSheetByName(
        QB.SHEETS.ID_COUNTER
      );

  if(!sheet){

    throw new Error(
      "ID_Counter sheet not found."
    );

  }

  const data =
    sheet
      .getDataRange()
      .getValues();

  let row = -1;

  for(let i=1;i<data.length;i++){

    if(data[i][0] == chapterCode){

      row = i+1;

      break;

    }

  }

  let nextNumber;

  if(row == -1){

    nextNumber = 1;

    sheet.appendRow([

      chapterCode,

      nextNumber

    ]);

  }

  else{

    nextNumber =
      Number(
        sheet
        .getRange(row,2)
        .getValue()
      ) + 1;

    sheet
      .getRange(row,2)
      .setValue(
        nextNumber
      );

  }

  return chapterCode +

    "-" +

    Utilities.formatString(
      "%06d",
      nextNumber
    );

}


/* ==========================================================
   GENERIC ID
   Example:
   CON-000001
   VAR-000001
   OCC-000001
========================================================== */

function generateSimpleID(prefix){

  const sheet =
    SpreadsheetApp
      .getActive()
      .getSheetByName(
        QB.SHEETS.ID_COUNTER
      );

  if(!sheet){

    throw new Error(
      "ID_Counter sheet not found."
    );

  }

  const data =
    sheet
      .getDataRange()
      .getValues();

  let row = -1;

  for(let i=1;i<data.length;i++){

    if(data[i][0] == prefix){

      row = i+1;

      break;

    }

  }

  let nextNumber;

  if(row == -1){

    nextNumber = 1;

    sheet.appendRow([

      prefix,

      nextNumber

    ]);

  }

  else{

    nextNumber =
      Number(
        sheet
        .getRange(row,2)
        .getValue()
      ) + 1;

    sheet
      .getRange(row,2)
      .setValue(
        nextNumber
      );

  }

  return prefix +

    "-" +

    Utilities.formatString(
      "%06d",
      nextNumber
    );

}


/* ==========================================================
   TEST QUESTION ID
========================================================== */

function testGenerateQuestionID(){

  Logger.log(

    generateQuestionID(

      "PHY11-WAV"

    )

  );

}


/* ==========================================================
   TEST GENERIC ID
========================================================== */

function testGenerateSimpleID(){

  Logger.log(

    generateSimpleID("CON")

  );

  Logger.log(

    generateSimpleID("VAR")

  );

  Logger.log(

    generateSimpleID("OCC")

  );

}


/* ==========================================================
   VIEW ID COUNTER
========================================================== */

function checkIDCounter(){

  const sheet =
    SpreadsheetApp
      .getActive()
      .getSheetByName(
        QB.SHEETS.ID_COUNTER
      );

  Logger.log(

    sheet
      .getDataRange()
      .getValues()

  );

}