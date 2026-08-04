/**
 * ============================================================================
 * NPQBMS
 * Options and Answer Storage
 * ============================================================================
 */


function addOptions(data){


  const ss =
  SpreadsheetApp.getActiveSpreadsheet();


  const sheet =
  ss.getSheetByName("Options");


  if(!sheet){

    throw new Error(
      "Options sheet missing."
    );

  }


  const options =
  data.Options || [];


  sheet.appendRow([

    data.Question_ID,

    options[0] || "",

    options[1] || "",

    options[2] || "",

    options[3] || "",

    options[4] || ""

  ]);


}




function addAnswerKey(data){


  const ss =
  SpreadsheetApp.getActiveSpreadsheet();


  const sheet =
  ss.getSheetByName("AnswerKey");


  if(!sheet){

    throw new Error(
      "AnswerKey sheet missing."
    );

  }


  sheet.appendRow([

    data.Question_ID,

    data.CorrectAnswer,

    data.Explanation || ""

  ]);

}