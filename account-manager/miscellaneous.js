function RevealIconDescriptors() {
  var description = document.getElementById("Menu-IconBar");
  
  if (description.getAttribute("data-open") == "closed") { description.setAttribute("data-open", "open"); }
  else { description.setAttribute("data-open", "closed");  }
}

function Autorun() {
  if (CheckSignIn() === true) {
    //Parse private notes
    if ((document.body.getAttribute("data-filemanager") == "true") && (getParameterByName("tab") !== "private")) {
      InitFilePicker();
    }
    else {
      PrivateNote();
    }

    //Show introduction dialog
    if ((localStorage.getItem("logInStatus") == "Newcomer!") && (document.body.getAttribute("data-hasintro") == "true")) {
      //document.getElementById("EditorPanes-NewUser").style.display = "block";
    }

    //Update all elements with class 'Data-Username'
    for (i = 0; i < document.getElementsByClassName("Data-Username").length; i++) {
      document.getElementsByClassName("Data-Username")[i].innerHTML = atob(localStorage.getItem("loggedIn")).split(",")[0];
    }

    //Set login/logout function
    document.getElementById("IconBar-LogInOut-Content").innerHTML = "&nbsp;&nbsp;Logout";
    document.getElementById("IconBar-LogInOut").setAttribute("onclick", "Logout(); window.location.href = '../accounts/sign-in.html';");
  }
  else {
    if ((document.body.getAttribute("data-filemanager") == "true") && (getParameterByName("tab") !== "private")) {
      InitFilePicker();
    }
    else {
      window.location.href = "../accounts/sign-in.html";
    }
  }
}