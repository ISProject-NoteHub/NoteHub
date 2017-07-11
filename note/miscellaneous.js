window.addEventListener("load", function() {
  //CKEditor Initialisation
  CKEDITOR.replace("Editor");
  CKEDITOR.config.resize_enabled = false;

  //Tagging System
  otherTags = new Tags("#SaveAs-Tags");
  noteProperties.tags = new Tags("#NoteInfo-Tags");
});

//Link Sharing
function EditLink() {
  ShowModal("SharingLink");

  if (noteProperties.noteOpened === true) { document.getElementById("Modal-SharingLink-Text").innerHTML = "Below is the link you can share with people who you wish to add as collaborators on this note."; }
  else { document.getElementById("Modal-SharingLink-Text").innerHTML = "Please save your note with a name before sharing it."; }
}

function ViewLink() {
  ShowModal("SharingLink");

  if (noteProperties.noteOpened === true) { document.getElementById("Modal-SharingLink-Text").innerHTML = "Below is the link you can share to let others view this note."; }
  else { document.getElementById("Modal-SharingLink-Text").innerHTML = "Please save your note with a name before sharing it."; }
}

//Accordion Navigation
function DetailsAsAccordion(event, element) {
  event.preventDefault();

  for (i = 0; i < document.getElementsByTagName("details").length; i++) {
    document.getElementsByTagName("details")[i].removeAttribute("open");
  }

  element.setAttribute("open", "");
}

//Tabbed Navigation for File Picker
function SwitchToFiles(category) {
  for (i = 1; i < 3; i++) {
    if (i == category) {
      document.getElementById("SaveAs-Header" + i).classList.add("w3-blue");
      document.getElementById("SaveAs-Header" + i).classList.remove("w3-light-grey");

      document.getElementById("SaveAs-Content" + i).style.display = "block";
    }
    else {
      document.getElementById("SaveAs-Header" + i).classList.remove("w3-blue");
      document.getElementById("SaveAs-Header" + i).classList.add("w3-light-grey");

      document.getElementById("SaveAs-Content" + i).style.display = "none";
    }
  }
}

//App Menu
function OpenAppMenu() { document.getElementById("App-Menu").style.display = "block"; }
function CloseAppMenu() { document.getElementById("App-Menu").style.display = "none"; }

//No Label
function ConfirmLeave() { return ""; }

//Snackbars
function ShowSnackBar(snackbarId) {
  var x = document.getElementById("Snackbar-" + snackbarId);
  x.classList.add("show");
  setTimeout(function(){ x.classList.remove("show"); }, 3000);
}

//Modal Dialogs
function ShowModal(modalId) {
  var modalsClosed = 0;

  while (document.getElementsByClassName("Modal").length > modalsClosed) {
    document.getElementsByClassName("Modal")[modalsClosed].style.display = "none";
    modalsClosed++;
  }

  document.getElementById("Modal-" + modalId).style.display = "block";
}

//Modal Dialogs
function CloseModal() {
  var modalsClosed = 0;

  while (document.getElementsByClassName("w3-modal").length > modalsClosed) {
    document.getElementsByClassName("w3-modal")[modalsClosed].style.display = "none";
    modalsClosed++;
  }
}