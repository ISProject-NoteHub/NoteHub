//Login - set localStorage and return true
function Login(usernameToUse, passwordToUse, onSuccess, onFailure) {
  var getPHPFile = new XMLHttpRequest();
  getPHPFile.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      console.log(getPHPFile.responseText);

      if (getPHPFile.responseText == "Authenticated.") {
        onSuccess();
        localStorage.setItem("logInStatus", "Successful.");
        localStorage.setItem("loggedIn", btoa(usernameToUse + "," + passwordToUse));
      }
      else {
        onFailure();
        localStorage.setItem("logInStatus", "Incorrect credentials.");
      }
    }
    else {
      localStorage.setItem("logInStatus", "Could not connect to server.");
    }
  }

  getPHPFile.open("POST", "https://notehub-serverside.000webhostapp.com/handlers/account-data.php?", true);
  getPHPFile.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  getPHPFile.send("requestedFunction=Credentials&username=" + usernameToUse + "&password=" + passwordToUse);
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
