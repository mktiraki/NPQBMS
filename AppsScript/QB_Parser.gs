/**
 * ============================================================================
 * NPQBMS
 * File : QB_Parser.gs
 * Purpose : OCR Question Parser v3.0
 * ============================================================================
 */


/**
 * Clean OCR
 */
function cleanQuestionOCR(text){


  if(!text){
    throw new Error("Empty OCR text");
  }


  text = text
  .replace(/\r/g,"")
  .replace(/Page\s*\d+\s*\/\s*\d+\s*\d+%/gi,"")
  .replace(/\n-\d+\s*\n/g,"\n");



  // remove marks pattern
  text=text.replace(
    /\(?\s*\d+\s*x\s*\d+\s*=\s*\d+\s*\)?/gi,
    ""
  );



  /*
    Recover hidden question numbers

    Example:

    shape. in 2)

    becomes:

    shape. in
    2)

  */


  text=text.replace(
    /([a-z\.])\s+(\d{1,2})\)\s+(?=[a-zA-Z])/g,
    "$1\n$2) "
  );



  /*
    Fix common OCR:
    
    depends on its : area
    becomes

    depends on its :
    3)

  */


  text=text.replace(
    /(volume|material|length|area of cross-section)\s+(?=\d{1,2}\))/gi,
    "$1\n"
  );

/*
 Fix OCR joined question numbers
 Example:
 shape. in 2)
 becomes:
 shape. in
 2)
*/

text = text.replace(
 /(\b(?:in|is|are|law|object|gravity|question)\.?)\s+(\d{1,2})\)\s+/gi,
 "$1\n$2) "
);

  return text.trim();

}






/**
 * Parser
 */
function parseQuestions(text){


  text = cleanQuestionOCR(text);


  let starts=[];


  /*
    Detect all possible question numbers
  */

  const regex =
/(?:^|\n)\s*(\d{1,2})\)\s+/g;


  let m;


  while(
    (m=regex.exec(text))!==null
  ){


    let num =
    Number(m[1]);


    if(num<1 || num>45)
      continue;



    let after =
    text.substring(
      m.index + m[0].length,
      m.index + m[0].length + 80
    );



    let before =
    text.substring(
      Math.max(0,m.index-80),
      m.index
    );



    /*
      Reject statements:

      Statement-1)
      Statement-2)
    */

    if(
      /Statement[-\s]*$/i.test(before)
    ){
      continue;
    }



    /*
      Reject option labels

      a) 1)
      b) 2)
    */

    if(
      /[abcd]\)\s*$/i.test(before)
    ){
      continue;
    }



    /*
      Accept if:

      next text starts with:
      - letter
      - option
      - question words

    */

    if(
      /^[A-Za-z\(]/.test(after.trim())
    ){


      starts.push({

        number:num,

        index:m.index

      });


    }


  }




  let questions=[];



  for(
    let i=0;
    i<starts.length;
    i++
  ){


    let start =
    starts[i].index;


    let end =
    i+1 < starts.length
    ?
    starts[i+1].index
    :
    text.length;



    let body =
    text.substring(
      start,
      end
    ).trim();



    questions.push({

      Question_Number:
      starts[i].number,


      Question_Text:
      body

    });


  }



  return repairQuestions(questions);

}






/**
 * Merge OCR fragments
 */
function repairQuestions(list){

  if(!list){
    return [];
  }


  let result=[];


  for(let i=0;i<list.length;i++){

    let q=list[i];


    /*
      If question only contains options,
      merge with previous
    */

    if(
      i>0 &&
      (
        q.Question_Text.length < 50 ||
        /^[0-9]+\)\s*(a\)|b\)|c\)|d\))/i.test(q.Question_Text)
      )
    ){

      result[result.length-1].Question_Text +=
      "\n"+
      q.Question_Text;

      continue;

    }


    result.push(q);

  }


  return result;

}


function removeFalseDuplicateNumbers(list){

let output=[];

for(let i=0;i<list.length;i++){

let q=list[i];

if(
 i>0 &&
 q.Question_Number === list[i-1].Question_Number &&
 q.Question_Text.length < 100
){

output[output.length-1].Question_Text +=
"\n"+q.Question_Text;

}
else{

output.push(q);

}

}

return output;

}




/**
 * Remove duplicates
 */
function finalCleanQuestions(list){


  if(!list){
    return [];
  }



  let result=[];



  for(let i=0;i<list.length;i++){


    let q=list[i];


    let last =
    result[result.length-1];



    /*
      Same question number:
      merge back together

      Example:

      4)
      part 1

      4)
      part 2

    */


    if(
      last &&
      last.Question_Number === q.Question_Number
    ){


      last.Question_Text +=
      "\n" +
      q.Question_Text;


      continue;

    }



    result.push(q);


  }




  return result;

}








/**
 * TEST
 */
function testRealPDFParser(){


  const fileId =
  "1yl6tV03jRjz0h0AwfbkvB10p61UgDDrt";



  const pdfText =
  extractPDFText(fileId);



  let questions =
parseQuestions(pdfText);


questions =
repairQuestions(
questions
);


questions =
removeFalseDuplicateNumbers(
questions
);


questions =
finalCleanQuestions(
questions
);



  Logger.log(
    "TOTAL QUESTIONS : "+
    questions.length
  );



  Logger.log(
    JSON.stringify(
      questions.slice(0,10),
      null,
      2
    )
  );


}