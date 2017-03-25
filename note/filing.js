var currentNoteAsObject = null;
var privateNote = false, user = "00001", noteID = "sysadmin-000001-A.json";

//Save Note
function SaveNote() {
  var noteAsJSON = JSON.stringify({
    meta: {
      name: document.getElementById("App-NoteName").innerHTML,
      topics: ["NoteHub", "Admin"],
      notebook: document.getElementById("Pane-Details-Notebook-Name").innerHTML, "comment": "All notes in this notebook will appear editable but only save under the user's account when saved, because they are tutorials.",
      author: "SysAdmin"
    },
    content: document.getElementById("App-NoteBox").innerHTML
  });
  
  var getPHPFile = new XMLHttpRequest();
  getPHPFile.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) { console.log(getPHPFile.responseText);
      var response = JSON.parse(getPHPFile.responseText);
      console.log("Note saved.");
      
      //Fill up report pane
      
      if (response.errors == "none") {
        ShowSnack('Your note has been saved for everyone to see. <a href="javascript:ShowReportPane();">More Info</a>');
      }
      else {
        ShowSnack('Your note has been saved as a draft on our server. <a href="javascript:ShowReportPane();">More Info</a>');
      }
    }
  }
          
  getPHPFile.open("POST", "https://notehub-serverside.000webhostapp.com/handlers/filing.php", true);
  getPHPFile.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  getPHPFile.send("requestedFunction=write&note=" + noteAsJSON + "&noteID=" + "&topic=private-notes\00001");
}

//Retrieve Note
function GetNote(topic, noteID) {
  var getPHPFile = new XMLHttpRequest();
  getPHPFile.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("App-NoteBox").innerHTML = getPHPFile.responseText;
      
      //Parse Note
      currentNoteAsObject = JSON.parse(getPHPFile.responseText);
      
      //Debug
      console.log("Note requested and response was received.");
      console.log(currentNoteAsObject);
      
      if ((currentNoteAsObject.meta.notebook = "NoteHub Basics") || (currentNoteAsObject.meta.notebook = "My Private Notebook")) {
        privateNote = true;
      }
      
      //Note Editor
      document.getElementById("App-NoteName").innerHTML = currentNoteAsObject.meta.name;
      document.getElementById("App-NoteBox").innerHTML = currentNoteAsObject.content;
      
      //Push extra information - notebook
      document.getElementById("App-Functions-NoteInfo").innerHTML = "About '" + currentNoteAsObject.meta.name + "'";
      document.getElementById("Pane-Details-Notebook-Name").innerHTML = currentNoteAsObject.meta.notebook;
      
      //Push extra information - note
      document.getElementById("Pane-Details-Note-Name").innerHTML = currentNoteAsObject.meta.name;
      document.getElementById("Pane-Details-Note-Author").innerHTML = currentNoteAsObject.meta.author;
    }
  }
  getPHPFile.open("GET", "https://notehub-serverside.000webhostapp.com/handlers/filing.php?requestedFunction=read&topic=" + topic + "&noteId=" + noteID, true);
  getPHPFile.send();
}

//Copy Note to Editor
function CopyNote(topic, noteID) {
}
