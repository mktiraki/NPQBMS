/**
 * ============================================================================
 * NPQBMS
 * File : QB_Gemini.gs
 * Purpose : Gemini Multimodal PDF Parser
 * ============================================================================
 */

function parsePDFWithGemini(fileId) {

  if (!fileId) {
    throw new Error("PDF File ID missing.");
  }


  const file = DriveApp.getFileById(fileId);

  const blob = file.getBlob();


  const base64 =
    Utilities.base64Encode(
      blob.getBytes()
    );


  const prompt = `
You are a professional exam paper parser.

Parse this physics examination PDF.

Return JSON ONLY.

Rules:

1. Preserve every question number exactly.

2. Never merge questions.

3. Never split options from questions.

4. Output format:

[
 {
  "question_number":"",
  "question":"",
  "options":[],
  "answer":"",
  "diagram":"",
  "table":[]
 }
]


5. Convert all mathematical expressions into LaTeX.

Example:
$5\\times10^{22}m^{-3}$


6. Preserve tables as arrays.

7. For diagrams or graphs:
describe the visual information.

Example:
"diagram":
"AC voltage and current sinusoidal graph. Voltage leads current by phase angle."


8. If OCR text is unclear, use the visual layout to infer.


Return only valid JSON.
`;


  const payload = {

    contents: [
      {
        parts: [

          {
            text: prompt
          },

          {
            inline_data: {
              mime_type: "application/pdf",
              data: base64
            }
          }

        ]
      }
    ]

  };


  const options = {

    method: "post",

    contentType: "application/json",

    payload: JSON.stringify(payload),

    muteHttpExceptions: true

  };


  const response =
    UrlFetchApp.fetch(
      GEMINI_ENDPOINT,
      options
    );


  const result =
    JSON.parse(
      response.getContentText()
    );


  if (!result.candidates) {

    throw new Error(
      "Gemini returned no candidates:\n" +
      response.getContentText()
    );

  }


  let text =
    result
    .candidates[0]
    .content
    .parts[0]
    .text;


  // Remove markdown JSON wrapper if Gemini adds it

  text =
    text.replace(/```json/g,"")
        .replace(/```/g,"")
        .trim();


  return JSON.parse(text);

}


function testGemini(){

  const id="1yl6tV03jRjz0h0AwfbkvB10p61UgDDrt";

  const data=parsePDFWithGemini(id);

  Logger.log(JSON.stringify(data,null,2));

}


function listGeminiModels(){

  const url =
    "https://generativelanguage.googleapis.com/v1beta/models?key="
    + GEMINI_API_KEY;


  const response =
    UrlFetchApp.fetch(url);


  Logger.log(
    response.getContentText()
  );

}