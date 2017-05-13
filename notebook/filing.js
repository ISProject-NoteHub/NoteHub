var currentNoteAsObject = null;
var privateNote = false;

//Save Note As
function SaveNoteAs() {
  //Here, check for conflicting naming in notebook
  var noteAsJSON = JSON.stringify({
    meta: {
      name: document.getElementById("Title-Title").value,
      topics: document.getElementById("Debug-Tags").value.split(","),
      notebook: document.getElementById("Debug-Notebook").value, "comment": "All notes in this notebook will appear editable but only save under the user's account when saved, because they are tutorials.",
      author: document.getElementById("Debug-Author").value
    },
    content: document.getElementById("Editor").innerHTML
  });
  
  var getPHPFile = new XMLHttpRequest();
  getPHPFile.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      console.log(decodeHTML(getPHPFile.responseText));
      var response = JSON.parse(decodeHTML(getPHPFile.responseText));
      console.log("Note saved.");

      //If errors occured
      if (response.errors == "notAuthenticated") {
        document.getElementById("Modal").style.display = "inline-block";

        document.getElementById("Modal-Title").innerHTML = "Authentication Required";
        document.getElementById("Modal-Message").innerHTML = "You'll need to sign into NoteHub before saving a note (public or private), viewing your notebooks or making any changes to your account. You can sign in from <a style='color: white;' href='https://notehub.ga/' target='_blank'>our homepage</a>. After signing in, close this dialog and attempt to save your note again. <br><br>Alternatively, you can save this note as a public note for all to see as an anonymous user. Your IP address will instead be used to identify you, and will be publicly displayed on the note as its author. <br><br>Sorry for any inconvenience caused.";
        document.getElementById("Modal-Buttons-ActionButton").setAttribute("onclick", "SaveNoteAs('anonymous');");
        document.getElementById("Modal-Buttons-ActionButton").innerHTML = "SAVE NOTE AS ANONYMOUS";
        document.getElementById("Modal-Buttons-ActionButton").style.display = "block";
      }
      else if (response.errors == "over9000") {
        document.getElementById("Modal").style.display = "inline-block";

        document.getElementById("Modal-Title").innerHTML = "Note Too Large";
        document.getElementById("Modal-Message").innerHTML = "It seems that your note has surpassed NoteHub's 1 MB limit on notes. While we understand that 1 MB is really too small for media such as videos, images or the like, we have to instantiate such a limit as we are working with highly limited webspace. This limit <i>will</i> be removed in the near future.";
        document.getElementById("Modal-Buttons-ActionButton").style.display = "none";
      }
    }
  }
          
  getPHPFile.open("POST", "http://notehubserverside.x10host.com//handlers/filing.php", true);
  getPHPFile.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  getPHPFile.send("requestedFunction=write&checkConflict=true&note=" + noteAsJSON + "&noteId=" + document.getElementById("Title-Title").value + ".json" + "&topic=private-notes/" + document.getElementById("Debug-Author").value);
}

//Save Note

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
      console.log(getPHPFile.responseText);
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
  getPHPFile.open("GET", "http://notehubserverside.x10host.com//handlers/filing.php?requestedFunction=read&topic=" + topic + "&noteId=" + noteID, true);
  getPHPFile.send();
}

//Copy Note to Editor
function CopyNote(topic, noteID) {
  
}
