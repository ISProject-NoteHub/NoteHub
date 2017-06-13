//Initialise file picker
function InitFilePicker() {
  var getPHPFile = new XMLHttpRequest();
  getPHPFile.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      noteList = JSON.parse(getPHPFile.responseText);
      ParseInTopics("Modal-SaveFilePicker");
      ShowModal("SaveFilePicker");
    }
  }
  getPHPFile.open("GET", "https://notehub-serverside.000webhostapp.com/notes/notes-map.php");
  getPHPFile.send();
}

//Parse topics into file picker
function ParseInTopics(modalName) {
  document.getElementById(modalName + "-HierachyLevel-Name").innerHTML = "Topics"
  document.getElementById(modalName + "-List").innerHTML = "";
  document.getElementById(modalName + "-HierachyLevel-Back").style.visibility = "hidden";
  
  for (i = 0; i < noteList.length; i++) {
    var topic = document.createElement("div");
    topic.setAttribute("class", "FilePicker-Item");
    topic.innerHTML = noteList[i][0];
    topic.setAttribute("onclick", "ParseInNotebooks('" + modalName + "', " + i + ");")

    document.getElementById(modalName + "-List").innerHTML = document.getElementById(modalName + "-List").innerHTML + topic.outerHTML;
  }
}

//Parse notebooks into file picker
function ParseInNotebooks(modalName, topicIndex) {
  document.getElementById(modalName + "-SaveAs").setAttribute("disabled", "disabled");

  document.getElementById(modalName + "-List").innerHTML = "";
  document.getElementById(modalName + "-HierachyLevel-Name").innerHTML = noteList[topicIndex][0];
  document.getElementById(modalName + "-HierachyLevel-Back").style.visibility = "visible";
  document.getElementById(modalName + "-HierachyLevel-Back").setAttribute("href", "javascript:ParseInTopics('" + modalName + "');");

  for (i = 0; i < noteList[topicIndex][3].length; i++) {
    var topic = document.createElement("div");
    topic.setAttribute("class", "FilePicker-Item");
    topic.innerHTML = noteList[topicIndex][3][i][0];
    topic.setAttribute("onclick", "ParseInNotes('" + modalName + "', " + topicIndex + "," + i + ");");

    document.getElementById(modalName + "-List").innerHTML = document.getElementById(modalName + "-List").innerHTML + topic.outerHTML;
  }
}

//Parse notes into file picker
function ParseInNotes(modalName, topicIndex, notebookIndex) {
  document.getElementById(modalName + "-SaveAs").removeAttribute("disabled");

  document.getElementById(modalName + "-List").innerHTML = "";
  document.getElementById(modalName + "-HierachyLevel-Name").innerHTML = noteList[topicIndex][3][notebookIndex][0];
  document.getElementById(modalName + "-HierachyLevel-Back").setAttribute("href", "javascript:ParseInNotebooks('" + modalName + "', " + topicIndex + ");");

  globalTopicIndex = topicIndex; globalNotebookIndex = notebookIndex;

  for (i = 0; i < noteList[topicIndex][3][notebookIndex][3].length; i++) {
    var topic = document.createElement("div");
    topic.setAttribute("class", "FilePicker-Item");
    topic.innerHTML = noteList[topicIndex][3][notebookIndex][3][i];
    topic.setAttribute("onclick", "ChangeNoteNameTo('" + modalName + "', this);");

    document.getElementById(modalName + "-List").innerHTML = document.getElementById(modalName + "-List").innerHTML + topic.outerHTML;
  }
}

//Switch to private note
function PrivateNote() {
  if (CheckSignIn() == true) {
    privateNote = true;
    document.getElementById("Modal-SaveAdvanced-WillBeSuggestion").style.display = "none";
    var username = atob(localStorage.getItem("loggedIn")).split(",")[0], password = atob(localStorage.getItem("loggedIn")).split(",")[1];

    var getPHPFile = new XMLHttpRequest();
    getPHPFile.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        document.getElementById("Modal-SaveAdvanced-List").innerHTML = "";
        console.log(getPHPFile.responseText);

        var privateNotes = JSON.parse(getPHPFile.responseText);

        for (i = 0; i < privateNotes.length; i++){
          var topic = document.createElement("div");
          topic.setAttribute("class", "FilePicker-Item");
          topic.innerHTML = privateNotes[i];
          topic.setAttribute("onclick", "ChangeNoteNameTo('Modal-SaveAdvanced', this);");

          document.getElementById("Modal-SaveAdvanced-List").innerHTML = document.getElementById("Modal-SaveAdvanced-List").innerHTML + topic.outerHTML;
        }

        ShowModal("SaveAdvanced");
      }
    }
    getPHPFile.open("POST", "https://notehub-serverside.000webhostapp.com/handlers/filing.php", true);
    getPHPFile.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    getPHPFile.send("username=" + username + "&password=" + password + "&requestedFunction=GetPrivateNotes");
  }
  else {
    ShowModal("AuthRequired");
  }
}