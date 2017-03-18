var currentNoteAsObject = null;

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

function GetNote(topic, noteID) {
  var getPHPFile = new XMLHttpRequest();
  getPHPFile.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("App-NoteBox").innerHTML = getPHPFile.responseText;
      
      //Parse Note
      currentNoteAsObject = JSON.parse(getPHPFile.responseText);
      
      //Note Editor
      document.getElementById("App-NoteName").innerHTML = currentNoteAsObject.meta.name;
      document.getElementById("App-NoteBox").innerHTML = ParseNoteContent(currentNoteAsObject.content);
      
      //Push extra information - notebook
      document.getElementById("App-Functions-Note").innerHTML = "About '" + currentNoteAsObject.meta.name + "'";
      document.getElementById("Pane-Details-Notebook-Name").innerHTML = currentNoteAsObject.meta.notebook;
      
      //Push extra information - note
      document.getElementById("Pane-Details-Note-Name").innerHTML = currentNoteAsObject.meta.name;
      document.getElementById("Pane-Details-Note-Author").innerHTML = currentNoteAsObject.meta.author;
    }
  }
  getPHPFile.open("POST", "https://notehub-serverside.000webhostapp.com/handlers/filing.php?requestedFunction=read&topic=notehub-basics&noteId=notehub-000001-A.json", true);
  getPHPFile.send();
}

function CopyNote(topic, noteID) {
}
