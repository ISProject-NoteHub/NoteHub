function RevealIconDescriptors() {
  var description = document.getElementById("Menu-IconBar");
  
  if (description.getAttribute("data-open") == "closed") { description.setAttribute("data-open", "open"); }
  else { description.setAttribute("data-open", "closed");  }
}

function Autorun() {
  if (CheckSignIn() === true) {
    if (localStorage.getItem("logInStatus") == "Newcomer!") {
      document.getElementById("EditorPanes-NewUser").style.display = "block";
    }
    else { /*Nothing*/ }
  }
  else {
    //window.location.href = "../accounts/sign-in.html"; - Commented this out so that it won't get in the way of UI development.
    //Sure :D
  }
}