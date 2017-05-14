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

  if (getParameterByName("edit") !== "") {
    
  }
}
