//Initialise tags
function InitTags() {
  noteTagsInput = new Tags("#NoteInfo-Tags");
}

//Initialise file picker
function InitFilePicker() {
  if (privateNote == true) {
    noteOpened = false;
    privateNote = false;
  }

  //Set file name
  document.getElementById("Modal-SaveFilePicker-SaveName").value = document.getElementById("Title-Title").value;
  document.getElementById("Modal-SaveAdvanced-SaveName").value = document.getElementById("Title-Title").value;

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
  document.getElementById("Modal-SaveFilePicker-WillBeSuggestion").style.display = "none";
  document.getElementById(modalName + "-SaveAs").setAttribute("disabled", "disabled");

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
  document.getElementById(modalName + "-HierachyLevel-Name").innerHTML = "Notebooks";
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
  document.getElementById(modalName + "-HierachyLevel-Name").innerHTML = "Notes";
  document.getElementById(modalName + "-HierachyLevel-Back").setAttribute("href", "javascript:ParseInNotebooks('" + modalName + "', " + topicIndex + ");");

  globalTopicIndex = topicIndex; globalNotebookIndex = notebookIndex;

  for (i = 0; i < noteList[topicIndex][3][notebookIndex][3].length; i++) {
    //Display file
    var topic = document.createElement("div");
    topic.setAttribute("class", "FilePicker-Item");
    topic.innerHTML = noteList[topicIndex][3][notebookIndex][3][i][0];
    topic.setAttribute("data-filename", noteList[topicIndex][3][notebookIndex][3][i][0]);
    topic.setAttribute("onclick", "ChangeNoteNameTo('" + modalName + "', this);");

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
  if (CheckSignIn() == true) {
    document.getElementById("Modal-SaveAdvanced-SaveAs").removeAttribute("disabled");
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

//Switch to public note
function PublicNote() {
  privateNote = false;
  InitFilePicker();
}

//Set a note as a suggestion
function ChangeNoteNameTo(modalName, note) {
  document.getElementById(modalName + "-WillBeSuggestion").style.display = "block";
  document.getElementById(modalName + "-SaveName").value = note.getAttribute("data-filename");
  isSuggestion = true;
}

//Check note name
function CheckNoteName(modalName, noteName) {
  for (i = 0; i < noteList[globalTopicIndex][3][globalNotebookIndex][3].length; i++) {
    if (noteName == noteList[globalTopicIndex][3][globalNotebookIndex][3][i]) { document.getElementById(modalName + "-WillBeSuggestion").style.display = "block"; isSuggestion = true; }
    else { document.getElementById(modalName + "-WillBeSuggestion").style.display = "none"; isSuggestion = false; }
  }
}

//Save Note As
function SaveNoteAs(fromMenu) {
  if (fromMenu == true) {
    if (CheckSignIn() == true) { InitFilePicker(); }
    else { ShowModal("AuthRequired"); }
  }
  else {
    //Prepare note object
    var note = {
      author: atob(localStorage.getItem("loggedIn")).split(",")[0],
      tags: tagsTags.getTags(),
      suggestions: [],
      content: document.getElementsByClassName("cke_wysiwyg_frame cke_reset")[0].contentDocument.body.innerHTML.replace(/&nbsp;/g, " ").replace(/&amp;/g, " ").trim()
    };

    ShowModal("SavingNote");
    document.getElementById("Modal-SavingNote-Status").setAttribute("src", "../resources/loading.svg");

    var getPHPFile = new XMLHttpRequest();
    getPHPFile.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        console.log(getPHPFile.responseText);
        document.getElementById("Modal-SavingNote-Status").setAttribute("src", "../resources/success.png");
      }
    }

    getPHPFile.open("POST", "https://notehub-serverside.000webhostapp.com/handlers/filing.php", true);
    getPHPFile.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    if (isSuggestion == true) {
      var saveAs = false;
    }
    else {
      var saveAs = true;
    }
    
    if (privateNote == true) {
      getPHPFile.send("tags=" + JSON.stringify(tagsTags.getTags()) + "&saveAs=" + saveAs + "&noteName=" + document.getElementById("Modal-SaveAdvanced-SaveName").value + "&noteContent=" + JSON.stringify(note) + "&username=" + atob(localStorage.getItem("loggedIn")).split(",")[0] + "&password=" + atob(localStorage.getItem("loggedIn")).split(",")[1] + "&private=true&requestedFunction=MakeNote");
    }
    else {
      getPHPFile.send("tags=" + JSON.stringify(tagsTags.getTags()) + "&saveAs=" + saveAs + "&folder=" + noteList[globalTopicIndex][3][globalNotebookIndex][1] + "&noteName=" + document.getElementById("Modal-SaveFilePicker-SaveName").value + "&noteContent=" + JSON.stringify(note) + "&username=" + atob(localStorage.getItem("loggedIn")).split(",")[0] + "&password=" + atob(localStorage.getItem("loggedIn")).split(",")[1] + "&private=false&requestedFunction=MakeNote");
    }
  }
}

//Save Note
function SaveNote() {
  if (noteOpened == true) {
    //Prepare note object
    var note = {
      author: currentNoteAsObject.author,
      tags: tagsTags.getTags(),
      suggestions: currentNoteAsObject.suggestions,
      content: currentNoteAsObject.content
    };

    if (atob(localStorage.getItem("loggedIn")).split(",")[0] !== currentNoteAsObject.author) {
      note.suggestions.push({
        author: atob(localStorage.getItem("loggedIn")).split(",")[0],
        date: new Date().getDate() + "/" + (new Date().getMonth() + 1) + "/" + new Date().getFullYear(),
        content: document.getElementsByClassName("cke_wysiwyg_frame cke_reset")[0].contentDocument.body.innerHTML.replace(/&nbsp;/g, " ").replace(/&amp;/g, " ").trim()
      });
    }
    else {
      note.content = document.getElementsByClassName("cke_wysiwyg_frame cke_reset")[0].contentDocument.body.innerHTML.replace(/&nbsp;/g, " ").replace(/&amp;/g, " ").trim();
    }

    console.log(note);

    ShowModal("SavingNote");
    document.getElementById("Modal-SavingNote-Status").setAttribute("src", "../resources/loading.svg");

    var getPHPFile = new XMLHttpRequest();
    getPHPFile.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        if (JSON.parse(getPHPFile.responseText).error == "Note saved!") {
          document.getElementById("Modal-SavingNote-Status").setAttribute("src", "../resources/success.png");
        }
        else {
          document.getElementById("Modal-SavingNote-Status").setAttribute("src", "../resources/error.png");
        }

        console.log(getPHPFile.responseText);
      }
    }

    getPHPFile.open("POST", "https://notehub-serverside.000webhostapp.com/handlers/filing.php", true);
    getPHPFile.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    
    if (privateNote == true) {
      if (CheckSignIn() == true) {
        getPHPFile.send("tags=" + JSON.stringify(tagsTags.getTags()) + "&saveAs=false&noteName=" + document.getElementById("Title-Title").value + "&noteContent=" + JSON.stringify(note) + "&username=" + atob(localStorage.getItem("loggedIn")).split(",")[0] + "&password=" + atob(localStorage.getItem("loggedIn")).split(",")[1] + "&private=true&requestedFunction=MakeNote");
      }
      else {
        ShowModal("AuthRequired");
      }
    }
    else {
      getPHPFile.send("tags=" + JSON.stringify(tagsTags.getTags()) + "&saveAs=false&folder=" + noteFolder + "&noteName=" + document.getElementById("Title-Title").value + "&noteContent=" + JSON.stringify(note) + "&username=" + atob(localStorage.getItem("loggedIn")).split(",")[0] + "&password=" + atob(localStorage.getItem("loggedIn")).split(",")[1] + "&private=false&requestedFunction=MakeNote");
    }
  }
  else {
    SaveNoteAs(true);
  }
}

//Decode HTML entities
function decodeHTML(html) {
  var txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

//Retrieve note
function GetNote(folder, note) {
  var getPHPFile = new XMLHttpRequest();
  getPHPFile.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      console.log(getPHPFile.responseText);
      CloseModal();
    }
  }

  getPHPFile.open("POST", "https://notehub-serverside.000webhostapp.com/handlers/filing.php", true);
  getPHPFile.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  getPHPFile.send("requestedFunction=GetNote&noteRequested=");
}
