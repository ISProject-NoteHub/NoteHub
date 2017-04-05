var currentNoteAsObject = null;
var privateNote = false, user = "00001", noteID = "test.json";

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
    if (this.readyState == 4 && this.status == 200) {
      console.log(decodeHTML(getPHPFile.responseText));
      var response = JSON.parse(decodeHTML(getPHPFile.responseText));
      console.log("Note saved.");
      
      //Fill up report pane
      document.getElementById("Pane-Saving-Filename").innerHTML = "Filing Report - Test";
      
      //Show snackbar
      if (response.errors == "none") {
        document.getElementById("Pane-Saving-Status").innerHTML = "Saved as note!";
        
        ShowSnack('Your note has been saved for everyone to see. <a style="color: white;" href="javascript:ShowReportPane();">More Info</a>');
      }
      else if (response.errors == "over9000") {
        document.getElementById("Pane-Saving-Status").innerHTML = "Note rejected due to size restrictions. (<a style='color: white;' href='javascript:SizeMatters();'>?</a>)";
        
        ShowSnack('Your note could not be saved on our server due to its size. <a style="color: white;" href="javascript:ShowReportPane();">More Info</a');
      }
      else {
        ShowSnack('Your note has been saved as a draft on our server. <a style="color: white;" href="javascript:ShowReportPane();">More Info</a>');
      }
    }
  }
          
  getPHPFile.open("POST", "https://backend.ga/handlers/filing.php", true);
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
  getPHPFile.open("GET", "https://backend.ga/handlers/filing.php?requestedFunction=read&topic=" + topic + "&noteId=" + noteID, true);
  getPHPFile.send();
}

//Copy Note to Editor
function CopyNote(topic, noteID) {
  
}
