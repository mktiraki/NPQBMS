/**
 * ============================================================================
 * NPQBMS
 * Database Builder
 * ============================================================================
 */

function initializeDatabase() {

  const ss = SpreadsheetApp.getActiveSpreadsheet();

  const sheets = {

    Questions: [
      "QuestionID",
      "QuestionNo",
      "QuestionType",
      "Subject",
      "Chapter",
      "Topic",
      "Difficulty",
      "Question",
      "Image",
      "Marks",
      "Year",
      "Source",
      "Created"
    ],

    Options: [
      "QuestionID",
      "OptionA",
      "OptionB",
      "OptionC",
      "OptionD",
      "OptionE"
    ],

    AnswerKey: [
      "QuestionID",
      "CorrectAnswer",
      "Explanation"
    ],

    Metadata: [
      "Key",
      "Value"
    ],

    Subjects: [
      "Subject"
    ],

    Chapters: [
      "Subject",
      "Chapter"
    ],

    Logs: [
      "Time",
      "Action",
      "Details"
    ],

    Settings: [
      "Property",
      "Value"
    ],

    Dashboard: [
      "NPQBMS Dashboard"
    ]

  };

  Object.keys(sheets).forEach(function(name){

    let sh = ss.getSheetByName(name);

    if(!sh){

      sh = ss.insertSheet(name);

    }

    sh.clear();

    sh.getRange(1,1,1,sheets[name].length)
      .setValues([sheets[name]]);

    sh.getRange(1,1,1,sheets[name].length)
      .setFontWeight("bold")
      .setBackground("#d9ead3");

    sh.setFrozenRows(1);

    sh.autoResizeColumns(1,sheets[name].length);

  });

  SpreadsheetApp.flush();

  Logger.log("Database Created.");

}