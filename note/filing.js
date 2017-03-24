var currentNoteAsObject = null;

//Save Note
function SaveNote() {
  var getPHPFile = new XMLHttpRequest();
  getPHPFile.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      alert('Note Saved!')
    }
  }
  getPHPFile.open("POST", "https://notehub-serverside.000webhostapp.com/handlers/filing.php", true);
  getPHPFile.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
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
  getPHPFile.open("POST", "https://notehub-serverside.000webhostapp.com/handlers/filing.php?requestedFunction=read&topic=" + topic + "&noteId=" + noteID, true);
  getPHPFile.send();
}

//Copy Note to Editor
function CopyNote(topic, noteID) {
}
