/**
 * ============================================================================
 * NPQBMS
 * File : QB_Duplicate.gs
 * Purpose : Duplicate Detection Engine
 * Version : 0.1.0
 * ============================================================================
 */


/**
 * Normalize question text
 */
function normalizeQuestion(text) {

  if (!text) return "";

  return text
    .toString()
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();

}


/**
 * Find exact duplicate
 */
function findExactDuplicate(questionText){


  if(!questionText){

    return {
      found:false
    };

  }



  const sheet =
    SpreadsheetApp
    .getActive()
    .getSheetByName(
      QB.SHEETS.QUESTIONS
    );



  if(!sheet){

    return {
      found:false
    };

  }



  const lastRow =
    sheet.getLastRow();



  if(lastRow < 2){

    return {
      found:false
    };

  }



  const data =
    sheet
    .getRange(
      2,
      1,
      lastRow-1,
      8
    )
    .getValues();



  const cleanInput =
    questionText
    .toString()
    .trim()
    .toLowerCase()
    .replace(/\s+/g," ");



  for(let i=0;i<data.length;i++){


    const existing =
      data[i][7]
      ? data[i][7]
      .toString()
      .trim()
      .toLowerCase()
      .replace(/\s+/g," ")
      : "";



    if(existing === cleanInput){


      return {


        found:true,


        questionID:
        data[i][0]


      };


    }


  }



  return {


    found:false


  };


}


/**
 * Test Duplicate Engine
 */
function testDuplicateEngine() {

  const sample =
    "Derive the Lens Maker's Formula.";

  const result =
    findExactDuplicate(sample);

  if (result.found) {

    SpreadsheetApp.getUi().alert(
      "Duplicate found:\n\n" +
result.questionID +
"\nRow: " +
result.row
    );

  } else {

    SpreadsheetApp.getUi().alert(
      "No duplicate found."
    );

  }

}