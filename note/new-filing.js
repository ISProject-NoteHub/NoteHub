var currentNoteAsObject = null;
var privateNote = false, user = "00001", noteID = "test.json";

//Save Note
function SaveNote() {
  var noteAsJSON = JSON.stringify({
    meta: {
      name: document.getElementById("Title-Title").value,
      topics: ["NoteHub", "Admin"],
      notebook: "Aloy's Private Notebook", "comment": "All notes in this notebook will appear editable but only save under the user's account when saved, because they are tutorials.",
      author: "SysAdmin"
    },
    content: document.getElementById("Editor").innerHTML
  });
  
  var getPHPFile = new XMLHttpRequest();
  getPHPFile.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      console.log(decodeHTML(getPHPFile.responseText));
      var response = JSON.parse(decodeHTML(getPHPFile.responseText));
      console.log("Note saved.");
    }
  }
          
  getPHPFile.open("POST", "https://notehub-serverside.000webhostapp.com/handlers/filing.php", true);
  getPHPFile.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  getPHPFile.send("requestedFunction=write&note=" + noteAsJSON + "&noteId=test.json" + "&topic=private-notes/00001");
}

//Show tooltip explaining note size restrictions
function SizeMatters() {
  ShowTooltip("SizeMatters");
}

//Show report pane
function ShowReportPane() {
  ShowPane("NoteSavingReport");
}

//Decode html entities
function decodeHTML(html) {
  var txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

//Retrieve Note
function GetNote(topic, noteID) {
  var getPHPFile = new XMLHttpRequest();
  getPHPFile.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      //Parse Note
      currentNoteAsObject = JSON.parse(getPHPFile.responseText);
      
      //Debug
      console.log("Note requested and response was received.");
      console.log(currentNoteAsObject);
      
      if ((currentNoteAsObject.meta.notebook = "NoteHub Basics") || (currentNoteAsObject.meta.notebook = "My Private Notebook")) {
        privateNote = true;
      }
      
      //Note Editor
      document.getElementById("Title-Title").value = currentNoteAsObject.meta.name;
      document.getElementById("Editor").innerHTML = currentNoteAsObject.content;
    }
  }
  getPHPFile.open("GET", "https://notehub-serverside.000webhostapp.com/handlers/filing.php?requestedFunction=read&topic=" + topic + "&noteId=" + noteID, true);
  getPHPFile.send();
}

//Copy Note to Editor
function CopyNote(topic, noteID) {
  
}
