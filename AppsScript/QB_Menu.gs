/**
 * ============================================================================
 * NPQBMS - Menu
 * Version : 0.1.0
 * ============================================================================
 */

function onOpen() {

  SpreadsheetApp.getUi()
    .createMenu("📚 Question Bank")

    .addItem(
      "Initialize Database",
      "initializeDatabase"
    )

    .addSeparator()

    .addItem(
      "Load NCERT Master",
      "loadNCERTMaster"
    )

    .addSeparator()

    .addItem(
      "Check Database",
      "runDatabaseHealthCheck"
    )

    .addSeparator()

    .addItem(
      "Generate Test Question ID",
      "testQuestionIDGenerator"
    )

    .addSeparator()

    .addItem(
      "About NPQBMS",
      "showAbout"
    )

    .addToUi();

}


function showAbout() {

  SpreadsheetApp.getUi().alert(
    "NPQBMS\n\nVersion 0.1.0\n\nNational Physics Question Bank Management System"
  );

}