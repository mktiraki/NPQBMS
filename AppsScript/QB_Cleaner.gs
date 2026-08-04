/**
 * ============================================================================
 * NPQBMS
 * File : QB_Cleaner.gs
 * Purpose : Clean OCR extracted PDF text before parsing
 * Version : 0.2.0
 * ============================================================================
 */


function cleanPDFText(text) {


  if (!text) {

    throw new Error(
      "No text received for cleaning."
    );

  }


  // Remove Google PDF viewer text

  text =
    text.replace(
      /Page\s*\d+\s*\/\s*\d+\s*\d+%/gi,
      ""
    );


  // Remove repeated exam header numbers
  // Example: 33 (NS)

  text =
    text.replace(
      /\d+\s*\(NS\)/gi,
      ""
    );


  // Remove page numbers like -12 -13 -14

  text =
    text.replace(
      /-\s*\d+\s*/g,
      "\n"
    );


  // Remove extra spaces

  text =
    text.replace(
      /[ \t]+/g,
      " "
    );


  // Normalize line breaks

  text =
    text.replace(
      /\n\s*\n\s*\n+/g,
      "\n\n"
    );


  return text.trim();

}


/**
 * Clean Gemini extracted questions
 */

function cleanQuestions(questions){


  if(!Array.isArray(questions)){

    throw new Error(
      "Invalid question list."
    );

  }


  const cleaned = [];



  questions.forEach(function(q){



    if(!q.question){

      return;

    }



    cleaned.push({


      question_number:
      String(q.question_number || "")
      .trim(),



      question:
      q.question
      .replace(/\s+/g," ")
      .trim(),



      options:
      Array.isArray(q.options)
      ?
      q.options
      :
      [],



      answer:
      q.answer || "",



      diagram:
      q.diagram || "",



      table:
      q.table || []


    });



  });



  return cleaned;


}