/**
 * ==========================================================
 * NPQBMS
 * File : QB_Import.gs
 * Purpose : Import Exam PDF
 * ==========================================================
 */


function importExam(fileId){



  if(!fileId){

    throw new Error(
      "PDF file ID missing"
    );

  }



  const questions =
    cleanQuestions(
      parsePDFWithGemini(fileId)
    );



  if(!Array.isArray(questions)){


    throw new Error(
      "Invalid Gemini output"
    );

  }



  const results=[];




  questions.forEach(function(q){



    const classification =
      classifyQuestion(
        q.question
      );




    const result =
      processQuestion({



        Question_Number:
        q.question_number,



        QuestionType:
        q.type || "MCQ",



        Chapter:
        classification.Chapter_Name,



        Topic:
        classification.Concept_Name,



        Difficulty:
        classification.Difficulty,



        Question_Text:
        q.question,



        Image:
        q.diagram || "",



        Marks:
        classification.Marks || "",



        Year:
        "",



        Source:
        "PDF Import"



      });




    results.push({



      Question_Number:
      q.question_number,



      Chapter:
      classification.Chapter_Name,



      Topic:
      classification.Concept_Name,



      Status:
      result.status,



      Question_ID:
      result.Question_ID



    });



  });



  return results;


}




function testImport(){



const pdfId =
"1yl6tV03jRjz0h0AwfbkvB10p61UgDDrt";



const result =
importExam(pdfId);



Logger.log(
JSON.stringify(
result,
null,
2
)
);



}