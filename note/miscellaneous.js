function RevealIconDescriptors() {
  var description = document.getElementById("Menu-IconBar");
  
  if (description.getAttribute("data-open") == "closed") { description.setAttribute("data-open", "open"); }
  else { description.setAttribute("data-open", "closed");  }
}

function Autorun() {
  //Quill
  var container = document.getElementById('Editor-Inside');
  var quill = new Quill(container, {
    modules: {
      toolbar: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }, { 'font': [] }, { size: [ 'small', false, 'large', 'huge' ]}],
        ['bold', 'italic', 'underline', 'strike', 'blockquote', 'clean'],
        ['link', 'image', 'code-block'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'indent': '-1'}, { 'indent': '+1' }, { 'align': [] }],
        [{ 'color': [] }, { 'background': [] }]
      ],
      history: {
        delay: 1000,
        maxStack: 500
      }
    },
    theme: 'snow'
  });

  LoadLanguageData();

  if (CheckSignIn() === true) { /*Nothing*/ }
  else {
    document.getElementById("MyAccount").style.display = "none";
    document.getElementById("LoggedInOut").innerHTML = "Login";
  }

  if (getParameterByName("edit") !== null) {
    document.getElementById("Modal-Overlay").style.display = "block"; //Hide when note is loaded

    
  }
  else { /*Nothing*/ }

  if (localStorage.getItem("seenNotice") !== "seen") {
    ShowModal("WhatWorks");
  }
  else { /*Who cares*/ }
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