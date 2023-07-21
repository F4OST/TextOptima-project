// add feautre change first letter to capital like hello become Hello or make mock text like hElLO
//we can use regex repeat to pull out big word or any specfiy we did its good for feautres
const patterns = {
  extraSpaces: / +(?!\n)/g,
  allSpaces: / /g,
  spacesToTabs: / +/g, // Pattern to match three or more spaces for replacement with a tab
  emptyLines: /^\s*[\r\n]+/gm,
  lineBreaks: /\r?\n/g,
};


function removeExtraSpaces(text) {
  // Using regex to replace consecutive spaces with a single space
  return text.replace(patterns.extraSpaces, ' ');
}

function removeAllSpaces(text) {
  // Using regex to remove all spaces
  return text.replace(patterns.allSpaces,'');
}
//Convert spaces to tabs: Allow users to convert spaces to tab characters, which can be valuable for text formatting in code or tables.
function spacesToTabs(text) {
  return text.replace(patterns.spacesToTabs,' ');
}
//remove empty lines
function removeEmptyLines(text) {
  return text.replace(patterns.emptyLines,'');
}
function removeLineBreaks(text) {
  return text.replace(patterns.lineBreaks,'');
}
/*
let  keepLineChar ="."
     Removes empty lines from the input text while preserving lines ending with the specified char
  function removeEmptyLines(text, keepLineChar) {
    const pattern = new RegExp(`([^${keepLineChar}])\\s*[\\r\\n]+`, 'g');
    return text.replace(pattern, '$1\n');
  }
*/
//declare a object and store the pattreens , myeby password genretor regex

function performAction() {
  let selectedAction = document.getElementById("actionSelect").value;

  let inputText = document.getElementById("textInput").value;
  let outputText;
  switch (selectedAction) {
    case "removeExtraSpaces":
      outputText = removeExtraSpaces(inputText);
      break;
    case "removeAllSpaces":
      outputText = removeAllSpaces(inputText);
      break;
    case "convertSpacesToTabs":
      outputText = spacesToTabs(inputText);
      break;
    case "removeEmptyLines":
      outputText = removeEmptyLines(inputText);
      break;
      case "removeLineBreaks":
        outputText = removeLineBreaks (inputText);
        break;
    default:
  }

  document.getElementById("outputArea").value = outputText;
}
