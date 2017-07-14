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
  
}

function ListNotebook(notebook) {
  
}

function SaveNote() {
  
}