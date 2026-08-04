/**
 * ============================================================================
 * NPQBMS
 * Version : 0.1.0
 * File    : QB_NCERT.gs
 * Purpose : NCERT Master Loader
 * ============================================================================
 */

function loadNCERTMaster() {

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(CONFIG.SHEETS.NCERT);

  if (!sheet) {
    SpreadsheetApp.getUi().alert(
      "NCERT_Master sheet not found.\nRun Initialize Database first."
    );
    return;
  }

  // Don't load twice
  if (sheet.getLastRow() > 1) {
    SpreadsheetApp.getUi().alert(
      "NCERT Master is already loaded."
    );
    return;
  }

  const chapters = [

  // ==========================
  // CLASS 11
  // ==========================
  ["11","PHY11-PW","Physical World"],
  ["11","PHY11-UM","Units and Measurements"],
  ["11","PHY11-MSL","Motion in a Straight Line"],
  ["11","PHY11-MP","Motion in a Plane"],
  ["11","PHY11-LOM","Laws of Motion"],
  ["11","PHY11-WEP","Work, Energy and Power"],
  ["11","PHY11-SPRM","System of Particles and Rotational Motion"],
  ["11","PHY11-GRAV","Gravitation"],
  ["11","PHY11-MPS","Mechanical Properties of Solids"],
  ["11","PHY11-MPF","Mechanical Properties of Fluids"],
  ["11","PHY11-TPM","Thermal Properties of Matter"],
  ["11","PHY11-THERM","Thermodynamics"],
  ["11","PHY11-KTG","Kinetic Theory"],
  ["11","PHY11-OSC","Oscillations"],
  ["11","PHY11-WAV","Waves"],

  // ==========================
  // CLASS 12
  // ==========================
  ["12","PHY12-CE","Electric Charges and Fields"],
  ["12","PHY12-EP","Electrostatic Potential and Capacitance"],
  ["12","PHY12-CEC","Current Electricity"],
  ["12","PHY12-MEI","Moving Charges and Magnetism"],
  ["12","PHY12-MM","Magnetism and Matter"],
  ["12","PHY12-EMI","Electromagnetic Induction"],
  ["12","PHY12-AC","Alternating Current"],
  ["12","PHY12-EMW","Electromagnetic Waves"],
  ["12","PHY12-RO","Ray Optics and Optical Instruments"],
  ["12","PHY12-WO","Wave Optics"],
  ["12","PHY12-DRM","Dual Nature of Radiation and Matter"],
  ["12","PHY12-AT","Atoms"],
  ["12","PHY12-NUC","Nuclei"],
  ["12","PHY12-SCD","Semiconductor Electronics"]

];

  const rows = chapters.map(ch => [
    ch[0],        // Class
    ch[1],        // Chapter_ID
    ch[2],        // Chapter_Name
    "",           // Topic_ID
    ""            // Topic_Name
  ]);

  sheet.getRange(2,1,rows.length,5).setValues(rows);

  SpreadsheetApp.getUi().alert(
    "Class 11 NCERT chapters loaded successfully."
  );

}