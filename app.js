
// add feautre change first letter to capital like hello become Hello or make mock text like hElLO 
//we can use regex repeat to pull out big word or any specfiy we did its good for feautres
function removeExtraSpaces(text) {
    // Using regex to replace consecutive spaces with a single space
    return text.replace(/\s+/g, ' ' );
  }

  function removeAllSpaces(text) {
    // Using regex to remove all spaces
    return text.replace(/\s+/g, '');
  }
  //Convert spaces to tabs: Allow users to convert spaces to tab characters, which can be valuable for text formatting in code or tables.
function spacesToTabs(text) {
    
    return text.replace(/\s+/g, '   ');
  }
  function performAction() {
   
    let selectedAction = document.getElementById("actionSelect").value;

   
    let inputText = document.getElementById("textInput").value;
  let outputText;
      switch(selectedAction){
        case "removeExtraSpaces":
          outputText = removeExtraSpaces(inputText);
          break;
          case "removeAllSpaces":
            outputText = removeAllSpaces(inputText);
            break;
            case "ConvertSpacesToTabs":
              outputText = spacesToTabs(inputText);
              break;
              default:
                
      }
  
    
    
    document.getElementById("outputArea").value = outputText;
  }