/**
 * ==========================================================
 * NPQBMS
 * File : QB_Occurrence.gs
 * Purpose : Occurrence Management
 * Version : 1.0.0
 * ==========================================================
 */


/**
 * Generate Occurrence ID
 */

function generateOccurrenceID(){


  const sheet =
    SpreadsheetApp
    .getActive()
    .getSheetByName(
      QB.SHEETS.OCCURRENCES
    );


  if(!sheet){

    throw new Error(
      "Occurrence_DB sheet not found."
    );

  }


  const lastRow =
    sheet.getLastRow();


  let count = 0;


  if(lastRow > 1){

    const ids =
      sheet
      .getRange(
        2,
        1,
        lastRow - 1,
        1
      )
      .getValues();


    ids.forEach(function(row){

      if(
        row[0] &&
        row[0]
        .toString()
        .startsWith("OCC-")
      ){

        count++;

      }

    });

  }


  count++;


  return (
    "OCC-" +
    String(count)
    .padStart(6,"0")
  );


}





/**
 * Create Occurrence Record
 */

function createOccurrence(data){


  if(!data){

    throw new Error(
      "Occurrence data missing."
    );

  }



  const sheet =
    SpreadsheetApp
    .getActive()
    .getSheetByName(
      QB.SHEETS.OCCURRENCES
    );



  if(!sheet){

    throw new Error(
      "Occurrence_DB sheet not found."
    );

  }



  const occurrenceID =
    generateOccurrenceID();




  sheet.appendRow([


    occurrenceID,


    data.Concept_ID || "",


    data.Question_ID || "",


    data.Exam || "",


    data.Year || "",


    data.Source || "PDF Import"


  ]);




  writeAudit(

    "CREATE OCCURRENCE",

    "SUCCESS",

    "Occurrence created: "
    + occurrenceID

  );




  return {


    status:"NEW",


    Occurrence_ID:
    occurrenceID


  };


}





/**
 * Test Occurrence Creation
 */

function testOccurrence(){



  const result =
  createOccurrence({


    Concept_ID:
    "CON-000001",


    Question_ID:
    "PHY11-WAV-000005",


    Exam:
    "CBSE",


    Year:
    "2024",


    Source:
    "Board Paper"


  });



  SpreadsheetApp
  .getUi()
  .alert(

    JSON.stringify(
      result,
      null,
      2
    )

  );


}