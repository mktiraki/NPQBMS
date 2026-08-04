/**
 * ============================================================================
 * NPQBMS
 * File : QB_Manager.gs
 * Purpose : Question Database Manager
 * Version : 0.1.0
 * ============================================================================
 */


/**
 * Add a new question
 */
function addQuestion(question) {

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName("Question_DB");

  if (!sheet) {
    throw new Error("Question_DB sheet not found.");
  }
if (!question) {
  throw new Error("No question data provided.");
}

  if (!question.Question_ID) {
    throw new Error("Question_ID is required.");
  }
// Prevent duplicate Question IDs

const existing =
  getQuestionByID(question.Question_ID);

if (existing) {

  throw new Error(
    "Question ID already exists: " +
    question.Question_ID
  );

}

  const row = [

    question.Question_ID || "",
    question.Class || "",
    question.Subject || "Physics",
    question.Chapter_ID || "",
    question.Chapter_Name || "",
    question.Topic_ID || "",
    question.Topic_Name || "",
    question.Question_Text || "",
    question.Concept_ID || "",
    question.Variant_ID || "",
    question.Marks || "",
    question.Difficulty || "",
    question.Status || "ACTIVE",
    new Date(),
    new Date()

  ];


  sheet.appendRow(row);


  return question.Question_ID;

}



/**
 * Get question by ID
 */
function getQuestionByID(questionID) {

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName("Question_DB");


  const data = sheet.getDataRange().getValues();


  for (let i = 1; i < data.length; i++) {

    if (data[i][0] === questionID) {

      return {

        Question_ID: data[i][0],
        Class: data[i][1],
        Subject: data[i][2],
        Chapter_ID: data[i][3],
        Chapter_Name: data[i][4],
        Topic_ID: data[i][5],
        Topic_Name: data[i][6],
        Question_Text: data[i][7],
        Concept_ID: data[i][8],
        Variant_ID: data[i][9],
        Marks: data[i][10],
        Difficulty: data[i][11],
        Status: data[i][12]

      };

    }

  }


  return null;

}



/**
 * Update existing question
 */
function updateQuestion(questionID, updates) {

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName("Question_DB");

  const data = sheet.getDataRange().getValues();


  for (let i = 1; i < data.length; i++) {


    if (data[i][0] === questionID) {


      Object.keys(updates).forEach(key => {

        const columnMap = {

          Question_ID:1,
          Class:2,
          Subject:3,
          Chapter_ID:4,
          Chapter_Name:5,
          Topic_ID:6,
          Topic_Name:7,
          Question_Text:8,
          Concept_ID:9,
          Variant_ID:10,
          Marks:11,
          Difficulty:12,
          Status:13

        };


        if (columnMap[key]) {

          sheet
          .getRange(
            i+1,
            columnMap[key]
          )
          .setValue(updates[key]);

        }

      });


      sheet
      .getRange(i+1,15)
      .setValue(new Date());


      return true;

    }

  }


  return false;

}



/**
 * Delete question
 * (Soft delete)
 */
function deleteQuestion(questionID) {

  return updateQuestion(
    questionID,
    {
      Status:"DELETED"
    }
  );

}



/**
 * Test Manager
 */
function testQuestionManager() {

  const testID = "PHY11-WAV-000001";

  const result =
    getQuestionByID(testID);


  if (result) {

    SpreadsheetApp.getUi()
      .alert(
        "Question Found:\n\n" +
        result.Question_ID +
        "\n\n" +
        result.Question_Text
      );

  } else {

    SpreadsheetApp.getUi()
      .alert(
        "Question not found"
      );

  }

}