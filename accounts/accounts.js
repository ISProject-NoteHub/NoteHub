//Login - set localStorage and return true
function Login(usernameToUse, passwordToUse) {
  var getPHPFile = new XMLHttpRequest();
  getPHPFile.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      console.log(getPHPFile.responseText);

      if (getPHPFile.responseText == "Login successful.") {
        localStorage.setItem("loggedIn", btoa(usernameToUse + "," + passwordToUse));
        return true;
      }
      else {
        return false;
      }
    }
    else {
      return "Connection unsuccessful.";
    }
  }

  getPHPFile.open("POST", "https://backend.ga/handlers/account-data.php", true);
  getPHPFile.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  getPHPFile.send("requestedFunction=login&username=" + document.getElementById("Login-Username").value + "&password=" + document.getElementById("Login-Password").value);
}

//Check for signed-in
function CheckSignIn() {
  if ((localStorage.getItem("loggedIn") === null) || (localStorage.getItem("loggedIn") == "")) { return false; }
  else { return true; }
}

//Logout
function Logout() {
  localStorage.removeItem("loggedIn");
  return true;
}
