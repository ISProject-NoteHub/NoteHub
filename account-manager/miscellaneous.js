function RevealIconDescriptors() {
  var description = document.getElementById("Menu-IconBar");
  
  if (description.getAttribute("data-open") == "closed") { description.setAttribute("data-open", "open"); }
  else { description.setAttribute("data-open", "closed");  }
}

function Autorun() {
  if (CheckSignIn() === true) {
    if ((localStorage.getItem("logInStatus") == "Newcomer!") && (document.body.getAttribute("data-hasintro") == "true")) {
      document.getElementById("EditorPanes-NewUser").style.display = "block";
    }

    document.getElementById("IconBar-LogInOut-Content").innerHTML = "&nbsp;&nbsp;Logout";
    document.getElementById("IconBar-LogInOut").setAttribute("onclick", "Logout(); window.location.href = '../accounts/sign-in.html';");
  }
  else {
    if ((document.body.getAttribute("data-filemanager") == "true") && (getParameterByName("tab") !== "private")) { /*...*/ }
    else {
      window.location.href = "../accounts/sign-in.html";
    }
  }
}