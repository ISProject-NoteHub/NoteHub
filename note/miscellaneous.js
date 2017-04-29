var notehubVersion = "20th March 2017, Build 1", localDataChangesMade = "No changes"; //Tracks for whether or not user's localStorage requires updates.  Can be 'No changes' or 'Changes made'.

//Adapt layout for small screen
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

//Show snackbar
function ShowSnack(message) {
  var x = document.getElementById("snackbar");
  x.className = "show";
  x.innerHTML = message;

  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}

//Show tooltips in panes
function ShowTooltip(tooltip) {
  var tooltipElement = document.getElementById("Tooltip-" + tooltip);
  
  if (tooltipElement.style.display == "block") {
    tooltipElement.style.display = "none";
    tooltipElement.style.animationName = "";
    tooltipElement.style.animationDuration = "";
    tooltipElement.style.animationFillMode = "";
  }
  else {
    tooltipElement.style.display = "block";
    tooltipElement.style.animationName = "ExposeTooltip";
    tooltipElement.style.animationDuration = "0.75s";
    tooltipElement.style.animationFillMode = "forwards";
  }
}

//Check for first use
function DoNecessaryForFirstUse() {
  if (localStorage.getItem("newUser") == "nope") { return; }
  else {
    localStorage.setItem("newUser", "nope");
    GetNote("notehub-basics", "notehub-000001-A.json");
  }
  
  CheckVersion();
}

//Check for version of NoteHub that localStorage has recognised
function CheckVersion() {
  if (localStorage.getItem("notehubVersion") == notehubVersion) { return; }
  else {
    //Fix later
    localStorage.setItem("notehubVersion", notehubVersion);
  }
}

//Panes
function InitPanes() {
  var request = null;

  if (window.XMLHttpRequest) { request = new XMLHttpRequest(); }
  else { /*Internet Explorer*/ request = new ActiveXObject("Microsoft.XMLhttps"); }

  request.onreadystatechange = function() {
    if (request.readyState == 4 && request.status == 200) {
      document.getElementById("App-Panes").innerHTML = request.responseText;
    }
    else {  }
  }

  request.open("GET", "panes.html", true);
  request.send();
}

//Display pane
function ShowPane(id) {
  var panesPresent = document.getElementById("App-Panes").childNodes.length, panes = document.getElementById("App-Panes"), panesCounted = 0;

  while (panesCounted < panesPresent) {
    panes.childNodes[panesCounted].style.display = "none";
    panesCounted += 2;
  }

  if (id == "closeAll") {
    panes.style.display = "none";
    document.getElementById("App-Panes-Close").style.display = "none";
  }
  else {
    document.getElementById("Pane-" + id).style.display = "block";
    panes.style.display = "block";
    document.getElementById("App-Panes-Close").style.display = "block";
  }
}
