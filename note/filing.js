function PrepareSaveAs() {
  if (document.getElementsByClassName("cke_wysiwyg_frame cke_reset")[0].contentDocument.body.innerHTML == "<p><br></p>") {
    ShowSnackBar("NoContent");
  }
  else {
    ListSuggestions();
    otherTags.addTags(noteProperties.tags.getTags());
    ShowModal("SaveAs");
  }
}

function SaveNote() {
  noteProperties.name = document.getElementById("SaveAs-NoteName").value;

  if (noteProperties.name == "") { ShowSnackBar("Name"); return; }
  else {
    if (noteProperties.private === false) {
      if (noteProperties.tags.getTags == []) { ShowSnackBar("Tags"); return; }
      else {
        //Public notes, who cares
      }
    }
    //Update UI
    document.getElementById("Saving-Status").innerHTML = '<i class="fa fa-fw fa-spinner fa-pulse fa-5x fa-fw "></i>';
    ShowModal("Saving");

    //Update notebook object
    notebook[currentNotebook].content = document.getElementsByClassName("cke_wysiwyg_frame cke_reset")[0].contentDocument.body.innerHTML;

    //Perform request
    var getPHPFile = new XMLHttpRequest();
    getPHPFile.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        console.log(getPHPFile.responseText);
        if (getPHPFile.responseText == "Write successful.") document.getElementById("Saving-Status").innerHTML = '<i class="fa fa-fw fa-check fa-5x" aria-hidden="true"></i>';
        else if (getPHPFile.responseText == "Write failed.") document.getElementById("Saving-Status").innerHTML = '<i class="fa fa-fw fa-times fa-5x" aria-hidden="true"></i>';
      }
    }
    getPHPFile.open("POST", "filing.php");
    getPHPFile.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    getPHPFile.send("username=" + user.username + "&password=" + atob(user.password) + "&noteName=" + noteProperties.name + "&noteContent=" + encodeURIComponent(JSON.stringify(notebook)));
  }
}