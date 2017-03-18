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
      
      var noteReceived = JSON.parse(getPHPFile.responseText);
      console.log(noteReceived);
    }
  }
  getPHPFile.open("POST", "https://notehub-serverside.000webhostapp.com/handlers/filing.php?requestedFunction=read&topic=getting-started-with-notehub&noteId=notehub-000001-A.json", true);
  getPHPFile.send();
}
