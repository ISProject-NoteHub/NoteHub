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
    duplicateReference = false;

    for (i = 0; i < notebook[notebook.length - 1].content.length; i++) {
      if (notebook[notebook.length - 1].content[i].name == b.value) {
        ShowSnackBar("DuplicateReference");
        duplicateReference = true;
      }
    }

    if (duplicateReference !== true) {
      if (notebook[notebook.length - 1].content.length == 0) { a.deleteRow(1); }

      notebook[notebook.length - 1].content[notebook[notebook.length - 1].content.length] = {
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
}

//Display note from JSON
function LoadBook() {
  for (i = 0; i < notebook.length; i++) {
    //Set editor mode
    if ((user.username !== notebook[0].author) && (noteProperties.private == "true")) { document.getElementById("App-Mode").innerHTML = "Viewing - Is Viewer"; }
    if ((user.username !== notebook[0].author) && (noteProperties.private == "false")) { document.getElementById("App-Mode").innerHTML = "Suggesting"; }
    else if (user.username == notebook[0].author) { document.getElementById("App-Mode").innerHTML = "Editing - Is Owner"; }

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
      tabContent.innerHTML = tabContent.innerHTML +
      "<div style=\"float: right;\"><button onclick=\"RenameNote('" + notebook[i].name + "');\" class=\"w3-button\"><i class=\"fa fa-pencil fa-fw\" aria-hidden=\"true\"></i> Rename Note</button><button onclick=\"DeleteNote();\" class=\"w3-button\"><i class=\"fa fa-trash fa-fw\" aria-hidden=\"true\"></i> Delete Note</button></div>";

      if (i == 0) {
        tabContent.style.display = "block";
      }

      document.getElementById("TabContent").innerHTML = tabContent.outerHTML + document.getElementById("TabContent").innerHTML;
    }

    //Display note contents
    if (i == 0) {
      document.getElementsByClassName("cke_wysiwyg_frame cke_reset")[0].contentDocument.body.innerHTML = notebook[i].content;
    }
  }
}

//Open 'Rename Note' Dialog
function RenameNote(noteName) {
  ShowModal("Rename");
  document.getElementById("Rename-OldName").innerHTML = noteName;
}

//Perform Rename
function PerformRename() {
  for (i = 0; i < notebook.length; i++) {
    if (notebook[i].name == document.getElementById("Rename-OldName").innerHTML) {
      CloseModal();

      notebook[i].name = document.getElementById("Rename-NewName").value;
      document.getElementById("TabStrip").children[i].children[0].setAttribute("onclick", "SwitchNote(event, '" + document.getElementById("Rename-NewName").value + "');");
      document.getElementsByClassName("city")[(notebook.length - 2) - i].setAttribute("id", "Notes-" + document.getElementById("Rename-NewName").value);

      document.getElementById("TabStrip").children[i].children[0].innerHTML = document.getElementById("Rename-NewName").value;
      document.getElementsByClassName("city")[(notebook.length - 2) - i].children[0].innerHTML = "<b>" + document.getElementById("Rename-NewName").value + "</b>";
    }
  }
}

//Add Note to Notebook
function AddNote() {
  //Save note content
  notebook[currentNotebook].content = document.getElementsByClassName("cke_wysiwyg_frame cke_reset")[0].contentDocument.body.innerHTML;

  //Update notebook
  notebook.splice(notebook.length - 1, 0, { name: "Note " + (notebook.length - 1), type: "Note", author: "", content: "<p><h1><b>New Note</b></h1><small>by you</small></p><hr><p>Content</p>" });
  document.getElementById("TabStrip").innerHTML = "";
  document.getElementById("TabContent").innerHTML = "";
  LoadBook();

  currentNotebook = 0;
}

//Delete current note from notebook
function DeleteNote() {

}

//Note Switching
function SwitchNote(evt, noteName) {
  var i, x, tablinks;

  //Save note content
  notebook[currentNotebook].content = document.getElementsByClassName("cke_wysiwyg_frame cke_reset")[0].contentDocument.body.innerHTML;

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

    for (a = 0; a < notebook.length; a++) {
      if (notebook[a].name == noteName) {
        currentNotebook = a;
        document.getElementsByClassName("cke_wysiwyg_frame cke_reset")[0].contentDocument.body.innerHTML = notebook[a].content;
      }
    }
  }

  //Set tab header colour
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