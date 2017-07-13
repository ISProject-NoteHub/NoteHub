function PrepareSaveAs() {
  if (document.getElementsByClassName("cke_wysiwyg_frame cke_reset")[0].contentDocument.body.innerHTML == "<p><br></p>") {
    ShowSnackBar("NoContent");
  }
  else {
    ListSuggestions();
    otherTags.addTags(noteProperties.tags.getTags());
    ShowModal("SaveAs");

    ListNotes();
  }
}

function ListNotes() {
  //List them private notes
  var getPHPFile = new XMLHttpRequest();
  getPHPFile.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var privateNotes = JSON.parse(getPHPFile.responseText);
      document.getElementById("SaveAs-Content2-Content").innerHTML = "";

      if (privateNotes.length == 2) {
        document.getElementById("SaveAs-Content2-Content").innerHTML = "<div class='FilePicker-Item' style='text-align: center;'>You don't have any private notes.<br>&#xAF;\\_(&#x30C4;)_/&#xAF;</div>";
      }

      for (i = 2; i < privateNotes.length; i++) {
        var note = document.createElement("div");
        note.innerHTML = privateNotes[i];
        note.classList = "FilePicker-Item";
        note.setAttribute("onclick", "document.getElementById('SaveAs-NoteName').value = '" + privateNotes[i] + "';");

        document.getElementById("SaveAs-Content2-Content").innerHTML = document.getElementById("SaveAs-Content2-Content").innerHTML + note.outerHTML;
      }
    }
  }

  getPHPFile.open("POST", "/databases/notes/private-notes/list.php", true);
  getPHPFile.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  getPHPFile.send("username=" + user.username);

  //List those public notes
  var getJSONFile = new XMLHttpRequest();
  getJSONFile.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var publicNotes = JSON.parse(getJSONFile.responseText);
      document.getElementById("SaveAs-Content1-Content").innerHTML = "";

      for (i = 1; i < publicNotes.length; i++) {
        var note = document.createElement("div");
        note.innerHTML = "<b>" + publicNotes[i][0] + "</b><br>" + publicNotes[i][1];
        note.classList = "FilePicker-Item";
        note.setAttribute("onclick", "ListNotebook('" + (i - 1) + "');");

        notebooks[i - 1] = publicNotes[i];

        document.getElementById("SaveAs-Content1-Content").innerHTML = document.getElementById("SaveAs-Content1-Content").innerHTML + note.outerHTML;
      }
    }
  }

  getJSONFile.open("GET", "/databases/notes/notes-map.txt", true);
  getJSONFile.send();
}

function ListNotebook(notebook) {
  noteProperties.topic = notebooks[notebook][6];

  document.getElementById("SaveAs-Content1-Content").innerHTML = "";
  document.getElementById("SaveAs-Content1-Objects").innerHTML = "Notes";

  for (i = 0; i < notebooks[notebook][5].length; i++) {
    var note = document.createElement("div");
    note.innerHTML = "<b>" + notebooks[notebook][5][i][0] + "</b> by " + notebooks[notebook][5][i][1];
    note.classList = "FilePicker-Item";
    note.setAttribute("onclick", "document.getElementById('SaveAs-NoteName').value = '" + notebooks[notebook][5][i][0] + "';");

    document.getElementById("SaveAs-Content1-Content").innerHTML = document.getElementById("SaveAs-Content1-Content").innerHTML + note.outerHTML;
  }
}

function SaveNote() {
  //Check for empty fields
  if (otherTags.getTags() == []) {
    ShowSnackBar("Tags");
  }
  else if (document.getElementById("SaveAs-NoteName").value == "") {
    ShowSnackBar("Name");
  }
  else {
    //UI updates
    document.getElementById("Saving-Status").innerHTML = '<i class="fa fa-fwfa-spinner fa-pulse fa-5x fa-fw"></i>';
    ShowModal("Saving"); console.log("note=" + JSON.stringify({ noteContent: document.getElementsByClassName("cke_wysiwyg_frame cke_reset")[0].contentDocument.body.innerHTML.replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").trim() }) + "&action=WriteNote&saveas=true&topic=" + noteProperties.topic + "&notename" + document.getElementById("SaveAs-NoteName").value);
    
    //Update database
    var getPHPFile = new XMLHttpRequest();
    getPHPFile.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) { console.log(getPHPFile.responseText);
        //Update UI
        document.getElementById("Saving-Status").innerHTML = '<i class="fa fa-fwfa-check fa-5x"></i>';
      }
    }

    getPHPFile.open("POST", "backend/public-notes.php", true);
    getPHPFile.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    getPHPFile.send("note=" + document.getElementsByClassName("cke_wysiwyg_frame cke_reset")[0].contentDocument.body.innerHTML.replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").trim() + "&action=WriteNote&saveas=true&topic=" + "getting-started-with-notehub" + "&notename=" + document.getElementById("SaveAs-NoteName").value);
  }
}