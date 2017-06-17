var noteList = null, privateNote = false, noteOpened = false, noteName = "";

//Initialise file picker
function InitFilePicker() {
  var getPHPFile = new XMLHttpRequest();
  getPHPFile.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      noteList = JSON.parse(getPHPFile.responseText);
      ParseInTopics("Files");
    }
  }
  getPHPFile.open("GET", "https://notehub-serverside.000webhostapp.com/notes/notes-map.php");
  getPHPFile.send();
}

//Parse topics into file picker
function ParseInTopics(modalName) {
  document.getElementById(modalName + "-HierachyLevel-Name").innerHTML = "Topics"
  document.getElementById("File-HierachyLevel-Search").setAttribute("placeholder", "Search for a topic...");
  document.getElementById(modalName + "-List").innerHTML = "";
  document.getElementById(modalName + "-HierachyLevel-Back").style.visibility = "hidden";
  
  for (i = 0; i < noteList.length; i++) {
    var topic = document.createElement("div");
    topic.setAttribute("class", "FilePicker-Item");
    topic.innerHTML = "<b>" + noteList[i][0] + "</b>";
    topic.setAttribute("onclick", "ParseInNotebooks('" + modalName + "', " + i + ");");

    //Advanced - descriptions
    var description = document.createElement("div");
    description.style.marginTop = "5px";
    description.innerHTML = noteList[i][2];
    topic.innerHTML = topic.innerHTML + description.outerHTML;

    //Advanced - fancy icon <3
    var bigIcon = document.createElement("span");
    bigIcon.innerHTML = ">";
    bigIcon.style.fontSize = "2em";
    bigIcon.style.position = "absolute";
    bigIcon.style.left = "calc(100% - 1.5em)"; bigIcon.style.top = 10 + (i * 57) + "px";
    topic.innerHTML = topic.innerHTML + bigIcon.outerHTML;

    document.getElementById(modalName + "-List").innerHTML = document.getElementById(modalName + "-List").innerHTML + topic.outerHTML;
  }
}

//Parse notebooks into file picker
function ParseInNotebooks(modalName, topicIndex) {
  document.getElementById(modalName + "-List").innerHTML = "";
  document.getElementById("File-HierachyLevel-Search").setAttribute("placeholder", "Search for a notebook...");
  document.getElementById(modalName + "-HierachyLevel-Name").innerHTML = noteList[topicIndex][0];
  document.getElementById(modalName + "-HierachyLevel-Back").innerHTML = "< back to Topics";
  document.getElementById(modalName + "-HierachyLevel-Back").style.visibility = "visible";
  document.getElementById(modalName + "-HierachyLevel-Back").setAttribute("href", "javascript:ParseInTopics('" + modalName + "');");

  for (i = 0; i < noteList[topicIndex][3].length; i++) {
    var topic = document.createElement("div");
    topic.setAttribute("class", "FilePicker-Item");
    topic.innerHTML = "<b>" + noteList[topicIndex][3][i][0] + "</b><div style='margin-top: 5px;'>" + noteList[topicIndex][3][i][3].length + " notes</div>";
    topic.setAttribute("onclick", "ParseInNotes('" + modalName + "', " + topicIndex + "," + i + ");");

    //Advanced - fancy icon <3
    var bigIcon = document.createElement("span");
    bigIcon.innerHTML = ">";
    bigIcon.style.fontSize = "2em";
    bigIcon.style.position = "absolute";
    bigIcon.style.left = "calc(100% - 1.5em)"; bigIcon.style.top = 10 + (i * 57) + "px";
    topic.innerHTML = topic.innerHTML + bigIcon.outerHTML;

    document.getElementById(modalName + "-List").innerHTML = document.getElementById(modalName + "-List").innerHTML + topic.outerHTML;
  }
}

//Parse notes into file picker
function ParseInNotes(modalName, topicIndex, notebookIndex) {
  document.getElementById(modalName + "-List").innerHTML = "";
  document.getElementById("File-HierachyLevel-Search").setAttribute("placeholder", "Search for a note...");
  document.getElementById(modalName + "-HierachyLevel-Name").innerHTML = noteList[topicIndex][0] + " > " + noteList[topicIndex][3][notebookIndex][0];
  document.getElementById(modalName + "-HierachyLevel-Back").innerHTML = "< back to " + noteList[topicIndex][3][notebookIndex][0];
  document.getElementById(modalName + "-HierachyLevel-Back").setAttribute("href", "javascript:ParseInNotebooks('" + modalName + "', " + topicIndex + ");");

  globalTopicIndex = topicIndex; globalNotebookIndex = notebookIndex;

  for (i = 0; i < noteList[topicIndex][3][notebookIndex][3].length; i++) {
    //Display file
    var topic = document.createElement("div");
    topic.setAttribute("class", "FilePicker-Item");
    topic.innerHTML = "<b>" + noteList[topicIndex][3][notebookIndex][3][i][0] + "</b>";
    topic.setAttribute("data-filename", noteList[topicIndex][3][notebookIndex][3][i][0]);

    //Display functions
    var functionsBar = document.createElement("div");
    functionsBar.style.marginTop = "5px";

    var editFile = document.createElement("a");
    editFile.href = "javascript:return false;";
    editFile.innerHTML = "Suggest";
    editFile.style.marginRight = "5px"; editFile.style.textDecoration = "underline";
    
    functionsBar.appendChild(editFile);

    var copyFile = document.createElement("a");
    copyFile.href = "javascript:CopyToPrivate();";
    copyFile.innerHTML = "Copy to Your Notes";
    copyFile.style.marginRight = "5px"; copyFile.style.textDecoration = "underline";
    
    functionsBar.appendChild(copyFile);

    topic.innerHTML = topic.innerHTML + functionsBar.outerHTML;

    //Display tags
    var tags = document.createElement("div");
    tags.className = "FilePicker-Item-Tags";

    for (a = 0; a < noteList[topicIndex][3][notebookIndex][3][i][1].length; a++) {
      var tag = document.createElement("div");
      tag.className = "FilePicker-Item-Tag";
      tag.innerHTML = noteList[topicIndex][3][notebookIndex][3][i][1][a];

      tags.innerHTML = tags.innerHTML + tag.outerHTML;
    }
    
    topic.innerHTML = topic.innerHTML + tags.outerHTML;

    document.getElementById(modalName + "-List").innerHTML = document.getElementById(modalName + "-List").innerHTML + topic.outerHTML;
  }
}

//Switch to private note
function PrivateNote() {
  document.getElementById("File-HierachyLevel-Search").setAttribute("placeholder", "Search for a note...");
  document.getElementById("Editor-PrivateNotes").setAttribute("data-open", "true");
  document.getElementById("Editor-PublicNotes").setAttribute("data-open", "false");
  document.getElementById("Files-HierachyLevel-Back").style.visibility = "hidden";

  privateNote = true;
  var username = atob(localStorage.getItem("loggedIn")).split(",")[0], password = atob(localStorage.getItem("loggedIn")).split(",")[1];

  var getPHPFile = new XMLHttpRequest();
  getPHPFile.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("Files-List").innerHTML = "";
      console.log(getPHPFile.responseText);

      var privateNotes = JSON.parse(getPHPFile.responseText);

      if (privateNotes.length == 0) {
        var topic = document.createElement("div");
        topic.setAttribute("class", "FilePicker-Item");
        topic.style.textAlign = "center";
        topic.innerHTML = "You don't have any private notes to browse.<br>&#xAF;\\_(&#x30C4;)_/&#xAF;";

        document.getElementById("Files-List").innerHTML = topic.outerHTML;
      }
      else {
        for (i = 0; i < privateNotes.length; i++){
          var topic = document.createElement("div");
          topic.setAttribute("class", "FilePicker-Item");
          topic.innerHTML = "<b>" + privateNotes[i] + "</b>";

          //Onclick
          topic.setAttribute("onclick", "window.open('https://notehub.ga/note?private=true&edit=private-notes/" + atob(localStorage.getItem("loggedIn")).split(",")[0] + "/" + privateNotes[i] + "', '_blank');");

          //Display functions
          var functionsBar = document.createElement("div");
          functionsBar.style.marginTop = "5px";

          var editFile = document.createElement("a");
          editFile.href = "javascript:return false;";
          editFile.innerHTML = "Make Note Public";
          editFile.style.marginRight = "5px"; editFile.style.textDecoration = "underline";
          
          functionsBar.appendChild(editFile);

          var copyFile = document.createElement("a");
          copyFile.href = "javascript:return false";
          copyFile.innerHTML = "Delete Note";
          copyFile.style.marginRight = "5px"; copyFile.style.textDecoration = "underline";
          
          functionsBar.appendChild(copyFile);

          topic.innerHTML = topic.innerHTML + functionsBar.outerHTML;

          document.getElementById("Files-List").innerHTML = document.getElementById("Files-List").innerHTML + topic.outerHTML;
        }
      }
    }
  }
  getPHPFile.open("POST", "https://notehub-serverside.000webhostapp.com/handlers/filing.php", true);
  getPHPFile.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  getPHPFile.send("username=" + username + "&password=" + password + "&requestedFunction=GetPrivateNotes");
}

//Copy note to private notes
function CopyToPrivate() {
  ShowModal("SavingNote");
  document.getElementById("Modal-SavingNote-Status").setAttribute("src", "../resources/loading.svg");
}

//Basic search - advanced search is in the gallery :3
function SearchCurrent() {
  
}
