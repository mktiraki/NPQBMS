/**
 * ==========================================================
 * QB_Test.gs
 * Master Test Runner
 * Version : 1.0.0
 * ==========================================================
 */

function runAllTests() {

  Logger.log("========== NPQBMS TEST ==========");

  Logger.log("1. Question ID");
  testGenerateQuestionID();

  Logger.log("2. Concept");
  testConcept();

  Logger.log("3. Question Pipeline");
  testCorePipeline();

  Logger.log("4. Occurrence");
  testOccurrence();

  Logger.log("5. Variant");
  testVariant();

  Logger.log("========== ALL TESTS COMPLETED ==========");

  SpreadsheetApp
    .getUi()
    .alert("All NPQBMS tests completed.");

}