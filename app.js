// add feautre change first letter to capital like hello become Hello or make mock text like hElLO
//we can use regex repeat to pull out big word or any specfiy we did its good for feautres
//add list style to the lines
//add highlight feautre for matched word
const patterns = {
  extraSpaces: / +(?!\n)/g,
  allSpaces: / /g,
  spacesToTabs: / +/g,
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
  return text.replace(patterns.spacesToTabs, "    ");
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

function findAndReplace(
  text,
  findText,
  replaceText,
  customRegex,
  wholeWordOnly
) {
  let pattern;

  // If customRegex is provided, use the custom regex pattern
  if (customRegex) {
    const [regexStr, flags] = customRegex
      .match(/\/(.*?)\/([gimy]{0,4})$/)
      .slice(1);
    pattern = new RegExp(regexStr, flags);
  } else {
    // Using the default findAndReplace pattern
    pattern = findAndReplacePattern(findText, wholeWordOnly);
  }

  return text.replace(pattern, function (match) {
    if (replaceText !== "") {
      // If the replaceText is not empty, replace the match with it
      return replaceText;
    } else {
      return match;
    }
  });
}

function findAndReplacePattern(findText, wholeWordOnly) {
  const escapedFindText = findText.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
  if (wholeWordOnly) {
    return new RegExp(`\\b${escapedFindText}\\b`, "g");
  } else {
    return new RegExp(escapedFindText, "g");
  }
}
const caseTypes = {
  lower: (str) => str.toLowerCase(),
  upper: (str) => str.toUpperCase(),
  sentence: (str) => str.replace(/\b\w/g, (match) => match.toUpperCase()),
};

// Function to convert the text based on the selected case option
function convertCase(text, caseType) {
  return caseTypes[caseType]?.(text) ?? text;
}
function generateLorem(type, count) {
  // Sample Lorem Ipsum text
  const loremText = `Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet consectetur adipiscing elit
   Quisque luctus magna nec luctus tempor Integer in ligula eu neque laoreet feugiat Pellentesque efficitur viverra mauris at mattis
    Sed vitae ipsum quis mauris dapibus iaculis non nec arcu Phasellus vehicula lacus quis lacus porttitor, non eleifend elit aliquet
    Nullam auctor felis vitae cursus tincidunt Aliquam pretium diam vel dui placerat aliquam Fusce id bibendum nunc
    Proin vel lectus eget elit faucibus suscipit ac ac risus Ut euismod urna sed odio viverra interdum
  Aenean ullamcorper, odio non eleifend tincidunt, odio nisi blandit turpis a lacinia est enim nec velit Curabitur id eleifend tortor,
   id varius lectus Duis malesuada ex a lorem dapibus, eget vestibulum purus luctus Nunc sit amet neque nec dui tristique venenatis
   Integer at purus sit amet tortor eleifend eleifend vel a nulla Nulla facilisi Vestibulum consectetur enim non ex pellentesque,
   ac lacinia elit fringilla Curabitur consectetur justo a purus convallis venenatis
  Praesent aliquet velit id justo pharetra euismod venenatis risus finibus. Maecenas nec eros ut massa fermentum dignissim
   Nulla facilisi Vestibulum bibendum sapien vel nisi volutpat, in consectetur lectus pellentesque Nulla eu hendrerit ex,
   quis euismod augue Maecenas eu arcu nunc Curabitur vehicula iaculis risus, sit amet fringilla quam dignissim eu Nam a felis non mi eleifend dapibus
  Suspendisse potenti Nam at dui luctus, scelerisque ex a, laoreet quam Sed eget tincidunt erat
   In facilisis ligula vitae mauris efficitur fermentum Donec eu augue consectetur
   facilisis nisl in congue mi Sed ullamcorper fringilla risus vel fringilla Curabitur feugiat, purus nec finibus laoreet,
    odio metus sagittis lacus sit amet dignissim ligula mi ut turpis Sed pellentesque lacus ut ex ultrices laoreet`;

  // Split the text into an array of words
  const wordsArray = loremText.split(/\s+/);

  const generatedParagraphs = [];

  for (let i = 0; i < count; i++) {
    generatedParagraphs.push(...wordsArray);
  }

  // Shuffle the generatedParagraphs using the Fisher-Yates shuffle algorithm
  for (let i = generatedParagraphs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [generatedParagraphs[i], generatedParagraphs[j]] = [
      generatedParagraphs[j],
      generatedParagraphs[i],
    ];
  }

  let generatedText;

  switch (type) {
    case "paragraph":
      // Join the words back to form paragraphs

      generatedText = generatedParagraphs.slice(0, count * 15).join(" ");
      // Add line breaks after every 20 words to form paragraphs
      generatedText = generatedText.replace(/((\S+\s+){14})(\S+)\.?/g, "$1$3.");

      // Ensure the generatedText starts with "Lorem ipsum dolor sit amet"
      generatedText = "Lorem ipsum dolor sit amet" + generatedText.slice(1);
      break;

    case "word":
      generatedText = generatedParagraphs.slice(0, count).join(" ");
      break;

    case "sentence":
      generatedText = generatedParagraphs.slice(0, count * 15).join(" ");
      generatedText = generatedText.replace(/((\S+\s+){14})(\S+)\.?/g, "$1$3.");
      generatedText = "Lorem ipsum dolor sit amet" + generatedText.slice(1);
      break;

    default:
      generatedText = "Invalid type specified.";
  }

  return generatedText;
}
function stringToBinary(text) {
  return text
    .split("")
    .map((char) => char.charCodeAt(0).toString(2).padStart(8, "0"))
    .join(" ");
}
function binaryToString(binary) {
  return binary
    .split(" ")
    .map((bin) => String.fromCharCode(parseInt(bin, 2)))
    .join("");
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
const ContainStringContainer = document.getElementById(
  "ContainStringContainer"
);
const findAndReplaceContainer = document.getElementById(
  "findAndReplaceContainer"
);
const convertCaseContainer = document.getElementById("convertCaseContainer");
const loramOptionsContainer = document.getElementById("loramOptionsContainer");
//Function to toggle the visibility of the element Container based on the selected value
function toggleOptions() {
  const selectedValue = selectedAction.value;
  ContainStringContainer.classList.toggle(
    "hidden",
    selectedValue !== "removeLinesContaining"
  );
  findAndReplaceContainer.classList.toggle(
    "hidden",
    selectedValue !== "findAndReplace"
  );
  convertCaseContainer.classList.toggle(
    "hidden",
    selectedValue !== "convertCase"
  );
  loramOptionsContainer.classList.toggle(
    "hidden",
    selectedValue !== "generateLorem"
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
      let word = document.getElementById("contain").value;
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
    case "findAndReplace":
      let findText = document.getElementById("find").value;
      let replaceText = document.getElementById("replace").value;
      let customRegexPattern = document.getElementById("regex").value;
      let wholeWordOnly = document.getElementById("wholeWord").checked;
      outputText = findAndReplace(
        inputText,
        findText,
        replaceText,
        customRegexPattern,
        wholeWordOnly
      );
      break;
    case "convertCase":
      let caseOption = document.querySelector(
        'input[name="caseOption"]:checked'
      ).value;
      outputText = convertCase(inputText, caseOption);
      break;
    case "generateLorem":
      let loramType = document.getElementById("loramType").value;
      let loramCount = document.getElementById("loramCount").valueAsNumber;
      outputText = generateLorem(loramType, loramCount);
      break;
      case "stringToBinary":
        outputText = stringToBinary(inputText);
        break;
        case "binaryToString":
      outputText = binaryToString(inputText);
      break;

    default:
  }

  document.getElementById("outputArea").value = outputText;
}
