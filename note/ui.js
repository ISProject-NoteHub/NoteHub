//Add references
function AddReference() {
  var a = document.getElementById("Reference-Table");
  var b = document.getElementById("References-AddBar-Reference"), c = document.getElementById("References-AddBar-Author");
  var d = document.getElementById("References-AddBar-Types").selectedIndex;

  if (b.value == "") {
    b.style.animation = "vibrate 0.9s linear";
    setTimeout(900, function() { b.style.animation = ""; });
  }
  else if (c.value == "") {
    c.style.animation = "vibrate 0.9s linear";
    setTimeout(900, function() { c.style.animation = ""; });
  }
  else {
    if (noteProperties.references == null) {
      a.deleteRow(1);
      noteProperties.references = [];
    }

    noteProperties.references[noteProperties.references.length] = {
      type: d,
      name: b.value, author: c.value
    };

    var reference = a.insertRow(-1);

    var type = reference.insertCell(-1);
    var name = reference.insertCell(-1);
    var author = reference.insertCell(-1);

    switch (d) {
      case 0:
        type.innerHTML = "Written Work";
        name.innerHTML = b.value;
        break;
      
      case 1:
        type.innerHTML = "Website";
        name.innerHTML = "<a target='_blank' href='" + b.value + "'>" + b.value + "</a>";
        break;
      
      case 2:
        type.innerHTML = "Multimedia";
        name.innerHTML = "<a target='_blank' href='" + b.value + "'>" + b.value + "</a>";
        break;
      
      case 3:
        type.innerHTML = "Other";
        name.innerHTML = b.value;
        break;
    }

    author.innerHTML = c.value;
  }
}

//Display note from JSON
function LoadBook() {
  for (i = 0; i < notebook.length; i++) {
    //Display note tab header
    var tab = document.getElementById("TabStrip").insertCell(-1);

    var tabHeader = document.createElement("button");
    tabHeader.style.whiteSpace = "nowrap";
    tabHeader.style.width = "100%";
    tabHeader.classList = "w3-bar-item w3-button tablink";
    tabHeader.setAttribute("onclick", "SwitchNote(event, '" + notebook[i].name + "');");
    tabHeader.innerHTML = notebook[i].name;

    if (i == 0) { tabHeader.classList.add("w3-white"); }

    tab.innerHTML = tabHeader.outerHTML;

    //Display note content header
    if (notebook[i].type == "Note") {
      var tabContent = document.createElement("div");
      tabContent.setAttribute("id", "Notes-" + notebook[i].name);
      tabContent.classList = "city";
      tabContent.style.display = "none";

      var tabTitle = document.createElement("div");
      tabTitle.classList = "w3-padding";
      tabTitle.style.display = "inline-block";
      tabTitle.innerHTML = "<b>" + notebook[i].name + "</b>";
      tabContent.innerHTML = tabTitle.outerHTML;
      tabContent.innerHTML = tabContent.innerHTML + "<div style=\"float: right;\"><button class=\"w3-button\"><i class=\"fa fa-trash fa-fw\" aria-hidden=\"true\"></i> Delete Note</button></div>";

      if (i == 0) {
        tabContent.style.display = "block";
      }

      document.getElementById("TabContent").innerHTML = document.getElementById("TabContent").innerHTML + tabContent.outerHTML;
    }

    //Display note contents
    if (i == 0) {
      document.getElementsByClassName("cke_wysiwyg_frame cke_reset")[0].contentDocument.body.innerHTML = notebook[i].content;
    }
  }
}

//Note Switching
function SwitchNote(evt, noteName) {
  var i, x, tablinks;

  x = document.getElementsByClassName("city");
  for (i = 0; i < x.length; i++) { x[i].style.display = "none"; }

  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < x.length; i++) { tablinks[i].className = tablinks[i].className.replace(" w3-white", ""); }

  if (noteName == "References") {
    document.getElementById("Notes-" + noteName).style.display = "block";
    document.getElementById("cke_Editor").style.display = "none";
  }
  else {
    document.getElementById("Notes-" + noteName).style.display = "block";
    document.getElementById("cke_Editor").style.display = "block";
  }

  for (a = 0; a < notebook.length; a++) {
    if (notebook[a].name == noteName) { document.getElementsByClassName("cke_wysiwyg_frame cke_reset")[0].contentDocument.body.innerHTML = notebook[a].content; }
  }

  evt.currentTarget.className += " w3-white";
}

//Update placeholders of references
function UpdateReferencesBar() {
  var a = document.getElementById("References-AddBar-Types").selectedIndex;
  var b = document.getElementById("References-AddBar-Reference"), c = document.getElementById("References-AddBar-Author");

  switch (a) {
    case 0:
      b.setAttribute("placeholder", "Title of Written Work");
      c.setAttribute("placeholder", "Author / Publisher of Written Work");
      break;
    
    case 1:
      b.setAttribute("placeholder", "Title / Name of Website");
      c.setAttribute("placeholder", "Author of Website");
      break;
    
    case 2:
      b.setAttribute("placeholder", "Location (URL) of Multimedia");
      c.setAttribute("placeholder", "Creator of Multimedia");
      break;
    
    case 3:
      b.setAttribute("placeholder", "Title / Name of Reference");
      c.setAttribute("placeholder", "Author / Creator of Reference");
      break;
  }
}