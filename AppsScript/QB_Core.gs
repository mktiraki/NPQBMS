/**
 * ==========================================================
 * QB_Core.gs
 * NCERT Physics Question Bank Management System
 * Version : 2.0.0
 * ==========================================================
 */

const QB = {

  VERSION : "2.0.0",

  APPNAME : "NCERT Physics Question Bank",

  SHEETS : {

    QUESTIONS   : "Question_Master_DB",
    VARIANTS    : "Variant_DB",
    OCCURRENCES : "Occurrence_DB",
    CONCEPTS    : "Concept_DB",
    ID_COUNTER  : "ID_Counter",
    SETTINGS    : "Settings",
    AUDIT       : "Audit_Log"

  }

};


/* ==========================================================
   MENU
========================================================== */

function onOpen(){

  SpreadsheetApp.getUi()

    .createMenu("📚 Question Bank")

    .addItem(
      "Initialize Database",
      "initializeDatabase"
    )

    .addItem(
      "Check Database",
      "runDatabaseHealthCheck"
    )

    .addSeparator()

    .addItem(
      "Test Question Engine",
      "testCorePipeline"
    )

    .addItem(
      "Test Concept Engine",
      "testConcept"
    )

    .addToUi();

}


/* ==========================================================
   MAIN QUESTION PIPELINE
========================================================== */

function processQuestion(questionData){

  if(!questionData){

    throw new Error(
      "Question data missing."
    );

  }

  if(!questionData.Question_Text){

    throw new Error(
      "Question text missing."
    );

  }


  /* ------------------------------------------
     Duplicate Check
  ------------------------------------------- */

  const duplicate =
    findExactDuplicate(
      questionData.Question_Text
    );

  if(duplicate.found){

    writeAudit(

      "CREATE QUESTION",

      "DUPLICATE",

      "Duplicate Question_ID : " +
      duplicate.questionID

    );

    return {

      status : "DUPLICATE",

      Question_ID :
      duplicate.questionID

    };

  }


  /* ------------------------------------------
     Create / Reuse Concept
  ------------------------------------------- */

  const conceptID =
    createConcept(

      questionData.Main_Concept,

      questionData.Sub_Concept,

      questionData.Chapter_ID

    );


  /* ------------------------------------------
     Generate Question ID
  ------------------------------------------- */

  const questionID =
    generateQuestionID(
      questionData.Chapter_ID
    );


  /* ------------------------------------------
     Save Question
  ------------------------------------------- */

  const sheet =
    SpreadsheetApp
      .getActive()
      .getSheetByName(
        QB.SHEETS.QUESTIONS
      );

  if(!sheet){

    throw new Error(
      "Question_Master_DB sheet not found."
    );

  }


  sheet.appendRow([

    questionID,

    questionData.Question_Text,

    questionData.Subject || "Physics",

    questionData.Class || "11",

    questionData.Chapter_ID || "",

    conceptID,

    questionData.Question_Type || "MCQ",

    questionData.Difficulty || "Medium",

    questionData.Marks || "",

    questionData.Answer || "",

    questionData.Solution || "",

    questionData.Source || "PDF Import",

    "ACTIVE",

    new Date()

  ]);


  /* ------------------------------------------
     Audit
  ------------------------------------------- */

  writeAudit(

    "CREATE QUESTION",

    "SUCCESS",

    "Question created : " + questionID

  );


  /* ------------------------------------------
     Create Occurrence
  ------------------------------------------- */

  createOccurrence({

    Question_ID : questionID,

    Exam : questionData.Exam || "",

    Board : questionData.Board || "",

    Paper : questionData.Paper || "",

    Year : questionData.Year || "",

    Source : questionData.Source || "",

    Marks : questionData.Marks || ""

  });


  return{

    status:"NEW",

    Question_ID:questionID

  };

}


/* ==========================================================
   TEST QUESTION ENGINE
========================================================== */

function testCorePipeline(){

  const result =
    processQuestion({

      Subject : "Physics",

      Class : "11",

      Chapter_ID : "PHY11-WAV",

      Main_Concept : "Cyclotron",

      Sub_Concept : "Working Principle",

      Question_Text :
      "Explain the working principle of a cyclotron and mention its applications.",

      Question_Type :
      "SHORT ANSWER",

      Difficulty :
      "Medium",

      Marks :
      "3",

      Answer :
      "",

      Solution :
      "",

      Exam :
      "CBSE",

      Board :
      "CBSE",

      Paper :
      "Board Examination",

      Year :
      "2024",

      Source :
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


/* ==========================================================
   DIRECT SHEET TEST
========================================================== */

function testQuestionSheetWrite(){

  const sheet =
    SpreadsheetApp
      .getActive()
      .getSheetByName(
        QB.SHEETS.QUESTIONS
      );

  if(!sheet){

    throw new Error(
      "Question_Master_DB not found."
    );

  }

  sheet.appendRow([

    "TEST-ID",

    "Direct write test",

    "Physics",

    "11",

    "PHY11-WAV",

    "CON-000001",

    "MCQ",

    "Easy",

    "1",

    "",

    "",

    "TEST",

    "ACTIVE",

    new Date()

  ]);

  Logger.log(
    "Test row inserted."
  );

}