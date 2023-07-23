// add feautre change first letter to capital like hello become Hello or make mock text like hElLO
//we can use regex repeat to pull out big word or any specfiy we did its good for feautres
//add list style to the lines
const patterns = {
  extraSpaces: / +(?!\n)/g,
  allSpaces: / /g,
  spacesToTabs: / +/g, // Pattern to match three or more spaces for replacement with a tab
  emptyLines: /^\s*[\r\n]+/gm,
  lineBreaks: /\r?\n/g,
  linesContaining: (word) => new RegExp(`^.*\\b${word}\\b.*$`, "gm"),
  accentPattern: /[\u0300-\u036f]/g,
  punctuationPattern: /[!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]/g,
  prefixPattern: (prefix) => new RegExp(`^(.*)$`, "gm"),
  postfixPattern: (postfix) => new RegExp(`^(.*)$`, "gm"),
  
};

function removeExtraSpaces(text) {
  // Using regex to replace consecutive spaces with a single space
  return text.replace(patterns.extraSpaces, " ");
}

function removeAllSpaces(text) {
  // Using regex to remove all spaces
  return text.replace(patterns.allSpaces, "");
}
//Convert spaces to tabs: Allow users to convert spaces to tab characters, which can be valuable for text formatting in code or tables.
function spacesToTabs(text) {
  return text.replace(patterns.spacesToTabs, " ");
}
//remove empty lines
function removeEmptyLines(text) {
  return text.replace(patterns.emptyLines, "");
}
function removeLineBreaks(text) {
  return text.replace(patterns.lineBreaks, "");
}
//Remove lines that contain a specified word.
function removeLinesContaining(text, word) {
  const pattern = patterns.linesContaining(word);
  let filteredText = text.replace(pattern, "");
  //Remove any empty lines left after removing lines containing the word
  return removeEmptyLines(filteredText);
}
//Removes accents from a text string.
function removeAccents(text) {
  // Normalize the text to convert accented characters into their base form
  const normalizedText = text.normalize("NFD");
  const pattern = patterns.accentPattern;
  return normalizedText.replace(pattern, "");
}
// remove punctuation
function removePunctuation(text) {
  return text.replace(patterns.punctuationPattern, "");
}
//add specified postfix to start of each line in the text
function addPrefix(text, prefix) {
  const pattern = patterns.prefixPattern(prefix);
  return text.replace(pattern, `${prefix}$1`);
}
//add specified postfix to end of each line in the text
function addPostfix(text, postfix) {
  const pattern = patterns.postfixPattern(postfix);
  return text.replace(pattern, `$1${postfix}`);
}
/*

let  keepLineChar ="."
     Removes empty lines from the input text while preserving lines ending with the specified char
  function removeEmptyLines(text, keepLineChar) {
    const pattern = new RegExp(`([^${keepLineChar}])\\s*[\\r\\n]+`, 'g');
    return text.replace(pattern, '$1\n');
  }
     remove lines not containing spesfic word 
  function removeLinesNotContaining(text, word) {
  const pattern = new RegExp(`^(?!.*${word}).*$`, 'gm'); 
  return text.replace(pattern,'');
}

*/
//declare a object and store the pattreens , myeby password genretor regex
const selectedAction = document.getElementById("actionSelect");
//TODO:edit var name later
const ContainStringContainer = document.getElementById("ContainStringContainer");
//Function to toggle the visibility of the element Container based on the selected value.
function toggleOptions() {
  const selectedValue = selectedAction.value;
  ContainStringContainer.classList.toggle(
    "hidden",
    selectedValue !== "removeLinesContaining"
  );
}

toggleOptions();

selectedAction.addEventListener("change", toggleOptions);
function performAction() {
  //TODO:resolve declartion with selectedAction varible
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
      outputText = removeLineBreaks(inputText);
      break;
    case "removeLinesContaining":
      let word = "apple";
      outputText = removeLinesContaining(inputText, word);
      break;
    case "removeAccents":
      outputText = removeAccents(inputText);
      break;
    case "removePunctuation":
      outputText = removePunctuation(inputText);
      break;
    case "addPrefix":
      let prefix = "[PRE]";
      outputText = addPrefix(inputText, prefix);
      break;
    case "addPostfix":
      let postfix = "[POS]";
      outputText = addPostfix(inputText, postfix);
      break;
   
    default:
  }

  document.getElementById("outputArea").value = outputText;
}
