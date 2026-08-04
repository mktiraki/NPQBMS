/**
 * ============================================================================
 * NPQBMS
 * File : QB_PDF.gs
 * Purpose : PDF Import Engine - Text Extraction
 * Version : 0.1.0
 * ============================================================================
 */


function extractPDFText(fileId) {


  const file =
    DriveApp.getFileById(fileId);


  const blob =
    file.getBlob();



  const resource = {

    title:
    file.getName(),

    mimeType:
    "application/vnd.google-apps.document"

  };



  const docFile =
    Drive.Files.insert(
      resource,
      blob,
      {
        convert:true
      }
    );



  const doc =
    DocumentApp.openById(
      docFile.id
    );


  const text =
    doc.getBody()
    .getText();



  DriveApp
  .getFileById(
    docFile.id
  )
  .setTrashed(true);



  return text;

}




function testPDFExtraction() {


  const fileId =
  "1yl6tV03jRjz0h0AwfbkvB10p61UgDDrt";



  const text =
    extractPDFText(
      fileId
    );



  Logger.log(text);



  SpreadsheetApp
  .getUi()
  .alert(
    text.substring(0,1000)
  );


}

function saveExtractedText() {

  const fileId =
  "1yl6tV03jRjz0h0AwfbkvB10p61UgDDrt";

  const text =
    extractPDFText(fileId);


  const file =
    DriveApp.createFile(
      "PDF_EXTRACTED_TEXT.txt",
      text
    );


  Logger.log(
    file.getUrl()
  );

}