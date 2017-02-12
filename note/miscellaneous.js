function CheckSmallScreen() {
  if (window.innerWidth == 540 || window.innerWidth < 540) {
    document.getElementById("App-InviteCollabs").style.display = "none";
    document.getElementById("App-Functions-Invite").style.display = "block";
  }
  else {
    document.getElementById("App-InviteCollabs").style.display = "block";
    document.getElementById("App-Functions-Invite").style.display = "none";
  }
}
