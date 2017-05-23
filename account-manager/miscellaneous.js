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
    
    document.getElementById("NewUserName").innerHTML = atob(localStorage.getItem("loggedIn")).split(",")[0];
    document.getElementById("Home-Username").innerHTML = atob(localStorage.getItem("loggedIn")).split(",")[0];
    document.getElementById("NewUser-Name").innerHTML = atob(localStorage.getItem("loggedIn")).split(",")[0];
    
    //Get and display account details on panes
  }
  else {
    window.location.href = "sign-in.html";
  }
}