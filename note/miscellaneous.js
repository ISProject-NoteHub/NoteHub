function RevealIconDescriptors() {
  var description = document.getElementById("Menu-IconBar");
  
  if (description.getAttribute("data-open") == "closed") { description.setAttribute("data-open", "open"); }
  else { description.setAttribute("data-open", "closed");  }
}

function ResizeEditor() {
  var height = window.innerHeight;
  document.getElementById("cke_1_contents").style.height = (height - 207) + "px";
}

function Autorun() {
  //CKEditor
  CKEDITOR.replace("Editor-Inside");
  var height = window.innerHeight;
  CKEDITOR.config.height = (height - 207) + "px";
  CKEDITOR.config.resize_enabled = false;

  //Load vulgarities, informalities, etc.
  LoadLanguageData();

  //Show alpha dialog
  if (localStorage.getItem("seenNotice") !== "seen") {
    ShowModal("WhatWorks");
  }
  else { /*Who cares*/ }

  //Tagging
  tagsTags = new Tags("#NoteInfo-Tags");
  keywordsTags = new Tags("#NoteInfo-Keywords");

  
  if (CheckSignIn() === true) {
    //Set login/logout function
    document.getElementById("IconBar-LogInOut-Content").innerHTML = "&nbsp;&nbsp;Logout";
    document.getElementById("IconBar-LogInOut").setAttribute("onclick", "Logout(); window.location.href = '../accounts/sign-in.html';");
  }
}

function ShowModal(modalId) {
  var modalsClosed = 0;

  while (document.getElementsByClassName("Modal").length > modalsClosed) {
    document.getElementsByClassName("Modal")[modalsClosed].style.display = "none";
    modalsClosed++;
  }

  document.getElementById("Modal-" + modalId).style.display = "block";
  document.getElementById("Modal-Overlay").style.display = "block";
}

function CloseModal() {
  var modalsClosed = 0;

  while (document.getElementsByClassName("Modal").length > modalsClosed) {
    document.getElementsByClassName("Modal")[modalsClosed].style.display = "none";
    modalsClosed++;
  }

  document.getElementById("Modal-Overlay").style.display = "none";
}

function CloseNotice() {
  CloseModal();
  localStorage.setItem("seenNotice", "seen");
}