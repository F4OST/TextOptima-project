

function removeExtraSpaces(text) {
    // Using regex to replace consecutive spaces with a single space
    return text.replace(/\s+/g, ' ');
  }

  function removeAllSpaces(text) {
    // Using regex to remove all spaces
    return text.replace(/\s+/g, '');
  }

  function performAction() {
   
    let selectedAction = document.getElementById("actionSelect").value;

   
    let inputText = document.getElementById("textInput").value;

  
    let outputText;
    if (selectedAction === "removeExtraSpaces") {
      outputText = removeExtraSpaces(inputText);
    } else if (selectedAction === "removeAllSpaces") {
      outputText = removeAllSpaces(inputText);
    }

    
    document.getElementById("outputArea").value = outputText;
  }