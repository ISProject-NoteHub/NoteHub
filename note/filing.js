function PrepareSaveAs() {
  if (document.getElementsByClassName("cke_wysiwyg_frame cke_reset")[0].contentDocument.body.innerHTML == "<p><br></p>") {
    ShowSnackBar("NoContent");
  }
  else {
    noteProperties.private = false;
    ListSuggestions();
    otherTags.addTags(noteProperties.tags.getTags());
    ShowModal("SaveAs");
  }
}

function Vote(upOrDown) {
  var updateSuggestions = new XMLHttpRequest();
  updateSuggestions.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      ShowSnackbar("Voted");
    }
  }
  updateSuggestions.open("POST", "backend/public-notes.php");
  updateSuggestions.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  updateSuggestions.send("vote=" + upOrDown);
}

function PrepareSaveChanges() {
  if (noteProperties.name == "") { PrepareSaveAs(); return; }

  document.getElementById("SaveAs-NoteName").value = noteProperties.name.trim();
  SaveNote();
}

function SaveNote() {
  noteProperties.name = document.getElementById("SaveAs-NoteName").value;

  if ((noteProperties.topic == 0) && (noteProperties.private == false)) { ShowSnackBar("NeedsTopic"); return; }
  if ((document.getElementsByClassName("cke_wysiwyg_frame cke_reset")[0].contentDocument.body.innerHTML.length < 512) && (noteProperties.private == false)) { ShowSnackBar("LongerPlease"); return; }

  if (noteProperties.name == "") { ShowSnackBar("Name"); return; }
  else {
    if (noteProperties.private == false) {
      if (noteProperties.tags.getTags() == []) { ShowSnackBar("Tags"); return; }
      else {
        noteProperties.name = noteProperties.topic + "/" + document.getElementById("SaveAs-NoteName").value;

        //Update UI
        document.getElementById("Saving-Status").innerHTML = '<i class="fa fa-fw fa-spinner fa-pulse fa-5x fa-fw "></i><br><h3>Saving Suggestion...</h3>';
        ShowModal("Saving");

        //Add as suggestion to note if necessary
        if (user.username !== notebook[0].author) {
          var updateSuggestions = new XMLHttpRequest();
          updateSuggestions.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
              if (updateSuggestions.responseText == "Write successful.") document.getElementById("Saving-Status").innerHTML = '<i class="fa fa-fw fa-check fa-5x" aria-hidden="true"></i><br><h3>Suggestion Added!</h3>';
              else if (updateSuggestions.responseText == "Write failed.") document.getElementById("Saving-Status").innerHTML = '<i class="fa fa-fw fa-times fa-5x" aria-hidden="true"></i><br><h3>Unable to save suggestion. Please try again.</h3>';
            }
          }
          updateSuggestions.open("POST", "filing.php");
          updateSuggestions.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
          updateSuggestions.send("owner=" + notebook[0].author + "&username=" + user.username + "&password=" + atob(user.password) + "&noteName=" + noteProperties.name + "&noteContent=" + encodeURIComponent(JSON.stringify(notebook)));

          return;
        }
      }
    }

    //Update UI
    document.getElementById("Saving-Status").innerHTML = '<i class="fa fa-fw fa-spinner fa-pulse fa-5x fa-fw "></i><br><h3>Saving Note...</h3>';
    ShowModal("Saving");

    //Update notebook object
    notebook[currentNotebook].content = document.getElementsByClassName("cke_wysiwyg_frame cke_reset")[0].contentDocument.body.innerHTML;

    //Perform request
    var getPHPFile = new XMLHttpRequest();
    getPHPFile.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        if (getPHPFile.responseText == "Write successful.") {
          //Update contributions
          var updateContributions = new XMLHttpRequest();
          updateContributions.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
              document.getElementById("Saving-Status").innerHTML = '<i class="fa fa-fw fa-check fa-5x" aria-hidden="true"></i><br><h3>Note Saved!</h3>';
            }
          }

          updateContributions.open("POST", "filing.php");
          updateContributions.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
          updateContributions.send("username=" + user.username + "&password=" + atob(user.password));
        }
        else if (getPHPFile.responseText == "Write failed.") document.getElementById("Saving-Status").innerHTML = '<i class="fa fa-fw fa-times fa-5x" aria-hidden="true"></i><br><h3>Unable to save note. Please try again.</h3>';
      }
    }
    getPHPFile.open("POST", "filing.php");
    getPHPFile.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    getPHPFile.send("private=" + noteProperties.private + "&username=" + user.username + "&password=" + atob(user.password) + "&noteName=" + noteProperties.name + "&noteContent=" + encodeURIComponent(JSON.stringify(notebook)));
  }
}