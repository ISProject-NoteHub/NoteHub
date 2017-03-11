function InitPanes() {
  var request = null;

  if (window.XMLHttpRequest) { request = new XMLHttpRequest(); }
  else { /*Internet Explorer*/ request = new ActiveXObject("Microsoft.XMLHTTP"); }

  request.onreadystatechange = function() {
    if (request.readyState == 4 && request.status == 200) {
      document.getElementById("App-Panes").innerHTML = request.responseText;
    }
    else {  }
  }

  request.open("GET", "panes.html", true);
  request.send();
}

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
