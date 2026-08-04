/**
 * ============================================================================
 * Utility Functions
 * ============================================================================
 */

function uuid() {
  return Utilities.getUuid();
}

function timestamp() {
  return Utilities.formatDate(
    new Date(),
    Session.getScriptTimeZone(),
    "yyyy-MM-dd HH:mm:ss"
  );
}

function log(message) {

  Logger.log(message);

}

function cleanText(text){

  if(!text) return "";

  return text
    .replace(/\r/g,"")
    .replace(/[ \t]+/g," ")
    .replace(/\n{3,}/g,"\n\n")
    .trim();

}

function isBlank(v){

  return v===null ||
         v===undefined ||
         v==="";

}

function throwError(message){

  throw new Error(message);

}