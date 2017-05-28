function RevealIconDescriptors() {
  var description = document.getElementById("Menu-IconBar");
  
  if (description.getAttribute("data-open") == "closed") { description.setAttribute("data-open", "open"); }
  else { description.setAttribute("data-open", "closed");  }
}

function Autorun() {
  if (CheckSignIn() === true) { /*Nothing*/ }
  else {
    document.getElementById("MyAccount").style.display = "none";
    document.getElementById("LoggedInOut").innerHTML = "Login";
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