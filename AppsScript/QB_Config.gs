/**
 * ============================================================================
 * NPQBMS v3.0
 * File : CORE_Config.gs
 * Purpose : Global Configuration
 * ============================================================================
 */


/**
 * Gemini API Key
 * Replace with your actual Gemini API key
 */
const GEMINI_API_KEY = "";


/**
 * Gemini Endpoint
 */
const GEMINI_ENDPOINT =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key="
  + GEMINI_API_KEY;



/**
 * Application Configuration
 */
const CONFIG = Object.freeze({

  APP_NAME: "NPQBMS",

  VERSION: "3.0.0",

  ENV: "PRODUCTION",



  /**
   * Spreadsheet Database
   */
  DATABASE: {

    NAME: "NPQBMS Database"

  },



  /**
   * Sheet Names
   */
  SHEETS: {

    QUESTIONS: "Questions",

    OPTIONS: "Options",

    ANSWER_KEY: "AnswerKey",

    VARIANTS: "Variants",

    OCCURRENCES: "Occurrences",

    SUBJECTS: "Subjects",

    CHAPTERS: "Chapters",

    TOPICS: "Topics",

    SETTINGS: "Settings",

    LOGS: "Logs",

    IMPORT_HISTORY: "ImportLog",

    DASHBOARD: "Dashboard"

  },



  /**
   * Gemini Settings
   */
  GEMINI: {

  MODEL: "gemini-flash-latest",

  TEMPERATURE: 0.1,

  MAX_OUTPUT_TOKENS: 65536

},



  /**
   * Import Settings
   */
  IMPORT: {

    MAX_FILE_SIZE_MB: 20,

    MAX_RETRIES: 3,

    BATCH_SIZE: 50

  },



  /**
   * Question Settings
   */
  QUESTION: {

    MAX_OPTIONS: 6,

    MIN_MARKS: 1,

    MAX_MARKS: 100

  },



  /**
   * Logging
   */
  LOG_LEVEL: "INFO"


});



/**
 * Test Configuration
 */
function testConfig(){


  Logger.log(
    CONFIG.APP_NAME
  );


  Logger.log(
    CONFIG.VERSION
  );


  Logger.log(
    CONFIG.SHEETS.QUESTIONS
  );


  Logger.log(
    GEMINI_ENDPOINT
  );


}