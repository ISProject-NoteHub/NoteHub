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
      document.getElementById("App-NoteBox").innerHTML = getPHPfile.responseText;
    }
  }
  getPHPFile.open("POST", "https://notehub-backend.gear.host/handlers/filing.php", true);
  getPHPFile.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  getPHPFile.send("topic=getting-started&notename=getting-started-00001.txt");
}
