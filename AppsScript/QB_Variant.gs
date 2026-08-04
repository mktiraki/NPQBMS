/**
 * ==========================================================
 * NPQBMS
 * File : QB_Variant.gs
 * Purpose : Variant Management
 * Version : 1.0
 * ==========================================================
 */


/**
 * Creates a new variant
 */
function createVariant(data){

  validateVariant(data);

  const variantID = generateVariantID();

  const sheet = SpreadsheetApp
    .getActive()
    .getSheetByName(QB.SHEETS.VARIANTS);

  if(!sheet){
    throw new Error("Variant_DB sheet not found.");
  }

  sheet.appendRow([

    variantID,

    data.Question_ID,

    data.Variant_Type || "ORIGINAL",

    data.Variant_Text,

    data.Language || "English",

    data.Created_By || "SYSTEM",

    new Date()

  ]);

  writeAudit(
    "CREATE VARIANT",
    "SUCCESS",
    "Variant created : " + variantID
  );

  return{

    status:"SUCCESS",

    Variant_ID:variantID

  };

}



/**
 * Validate Variant
 */
function validateVariant(data){

  if(!data){

    throw new Error("Variant data missing.");

  }

  if(!data.Question_ID){

    throw new Error("Question_ID missing.");

  }

  if(!data.Variant_Text){

    throw new Error("Variant text missing.");

  }

}



/**
 * Generate Variant ID
 */
function generateVariantID(){

  const sheet = SpreadsheetApp
    .getActive()
    .getSheetByName(QB.SHEETS.ID_COUNTER);

  const data = sheet.getDataRange().getValues();

  for(let i=1;i<data.length;i++){

    if(data[i][0]=="VAR"){

      let last = Number(data[i][1]);

      last++;

      sheet.getRange(i+1,2).setValue(last);

      return "VAR-" + String(last).padStart(6,"0");

    }

  }

  throw new Error("VAR counter not found.");

}



/**
 * Test Variant
 */
function testVariant(){

  const result = createVariant({

    Question_ID:"PHY11-WAV-000001",

    Variant_Type:"ORIGINAL",

    Variant_Text:"Explain the working principle of a cyclotron.",

    Language:"English",

    Created_By:"SYSTEM"

  });

  SpreadsheetApp
    .getUi()
    .alert(JSON.stringify(result,null,2));

}