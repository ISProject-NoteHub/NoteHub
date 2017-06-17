function RevealIconDescriptors() {
  var description = document.getElementById("Menu-IconBar");
  
  if (description.getAttribute("data-open") == "closed") { description.setAttribute("data-open", "open"); }
  else { description.setAttribute("data-open", "closed");  }
}

function ResizeEditor() {
  var height = window.innerHeight;
  document.getElementById("cke_1_contents").style.height = (height - 207) + "px";
}

function Autorun() {
  //Load vulgarities, informalities, etc.
  LoadLanguageData(function() {
    //Load edit and token
    if (getParameterByName("edit") !== null) {
      if (getParameterByName("private") == "true") {
        if (atob(localStorage.getItem("loggedIn")).split(",")[0] !== getParameterByName("edit").split("/")[1]) {
          document.getElementById("ViewOnly").style.display = "block";
        }

        //Init note title
        document.getElementById("Title-Title").value = getParameterByName("edit").split("/")[2];

        privateNote = true;
      }
      else {
        //Init note title
        document.getElementById("Title-Title").value = getParameterByName("edit").split("/")[1];
      }

      document.getElementById("Modal-Overlay").style.display = "block";

      var getPHPFile = new XMLHttpRequest();
      getPHPFile.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          if (getPHPFile.responseText == "File not found.") {
            ShowModal("NoteLoadFailed");
          }
          else {
            currentNoteAsObject = JSON.parse(getPHPFile.responseText);
            noteOpened = true;

            //Init note content
            setTimeout(function() {
              document.getElementsByClassName("cke_wysiwyg_frame cke_reset")[0].contentDocument.body.innerHTML = currentNoteAsObject.content;
              CloseModal();
            }, 2000);

            //Init tags
            tagsTags.addTags(currentNoteAsObject.tags);
          }
        }
      }
      getPHPFile.open("POST", "https://notehub-serverside.000webhostapp.com/handlers/filing.php", true);
      getPHPFile.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      getPHPFile.send("noteRequested=" + getParameterByName("edit") + "&requestedFunction=GetNote");
    }
  });
  
  //CKEditor
  CKEDITOR.replace("Editor-Inside");
  var height = window.innerHeight;
  CKEDITOR.config.height = (height - 207) + "px";
  CKEDITOR.config.resize_enabled = false;

  //Show alpha dialog
  if (localStorage.getItem("seenNotice") !== "seen") {
    ShowModal("WhatWorks");
  }
  else { /*Who cares*/ }

  //What should I label this
  if (CheckSignIn() === true) {
    //Set login/logout function
    document.getElementById("IconBar-LogInOut-Content").innerHTML = "&nbsp;&nbsp;Logout";
    document.getElementById("IconBar-LogInOut").setAttribute("onclick", "Logout(); window.location.href = '../accounts/sign-in.html';");
  }

  //Tagging
  tagsTags = new Tags("#NoteInfo-Tags");
}

function ShowModal(modalId) {
  var modalsClosed = 0;

  while (document.getElementsByClassName("Modal").length > modalsClosed) {
    document.getElementsByClassName("Modal")[modalsClosed].style.display = "none";
    modalsClosed++;
  }

  document.getElementById("Modal-" + modalId).style.display = "block";
  document.getElementById("Modal-Overlay").style.display = "block";
}

function CloseModal() {
  var modalsClosed = 0;

  while (document.getElementsByClassName("Modal").length > modalsClosed) {
    document.getElementsByClassName("Modal")[modalsClosed].style.display = "none";
    modalsClosed++;
  }

  document.getElementById("Modal-Overlay").style.display = "none";
}

function CloseNotice() {
  CloseModal();
  localStorage.setItem("seenNotice", "seen");
}