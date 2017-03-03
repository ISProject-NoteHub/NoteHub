var username = document.getElementById("Login-Username"), email = document.getElementById("Login-Email"), password = document.getElementById("Login-Password");
var savedStage = {
  username: "", email: "", password = "";
};

function StageOne() {
  savedStage.username = username.value;
  savedStage.email = email.value;
  savedStage.password = password.value;
}
