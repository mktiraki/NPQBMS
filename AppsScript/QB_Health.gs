/**
 * ==========================================================
 * QB_Health.gs
 * Database Health Check
 * Version : 1.0.0
 * ==========================================================
 */

function runDatabaseHealthCheck(){

  const ss = SpreadsheetApp.getActive();

  const requiredSheets = [

    QB.SHEETS.QUESTIONS,
    QB.SHEETS.CONCEPTS,
    QB.SHEETS.OCCURRENCES,
    QB.SHEETS.VARIANTS,
    QB.SHEETS.ID_COUNTER,
    QB.SHEETS.AUDIT

  ];

  let report = [];

  report.push("========== NPQBMS HEALTH CHECK ==========\n");

  requiredSheets.forEach(function(name){

    const sheet = ss.getSheetByName(name);

    if(sheet){

      report.push("✅ " + name);

    }else{

      report.push("❌ Missing : " + name);

    }

  });

  report.push("");

  const qSheet = ss.getSheetByName(QB.SHEETS.QUESTIONS);

  if(qSheet){

    report.push(
      "Questions : " +
      Math.max(qSheet.getLastRow()-1,0)
    );

  }

  const cSheet = ss.getSheetByName(QB.SHEETS.CONCEPTS);

  if(cSheet){

    report.push(
      "Concepts : " +
      Math.max(cSheet.getLastRow()-1,0)
    );

  }

  const oSheet = ss.getSheetByName(QB.SHEETS.OCCURRENCES);

  if(oSheet){

    report.push(
      "Occurrences : " +
      Math.max(oSheet.getLastRow()-1,0)
    );

  }

  const vSheet = ss.getSheetByName(QB.SHEETS.VARIANTS);

  if(vSheet){

    report.push(
      "Variants : " +
      Math.max(vSheet.getLastRow()-1,0)
    );

  }

  Logger.log(report.join("\n"));

  SpreadsheetApp
    .getUi()
    .alert(report.join("\n"));

}