<?php
  if (!isset($_COOKIE["signedIn"])) { header("Location: /accounts/sign-in.php"); }
  else {
    include("../databases/microdb/Database.php");
    include("../databases/microdb/Cache.php");
    include("../databases/microdb/Event.php");
    include("../databases/microdb/Index.php");
  }
?>
<!--HTML document begins here-->
<!DOCTYPE html>
<html>

<head>
  <title>
    <?php echo "New Notebook "; ?>
    | NoteHub
  </title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <link href="/logo-small.png" rel="icon" />
  <link href="/resources/stylesheets/w3.css" rel="stylesheet" />
  <link href="/resources/stylesheets/editor-styling.css" rel="stylesheet" />

  <link href="https://fonts.googleapis.com/css?family=Questrial" rel="stylesheet">

  <script src="https://use.fontawesome.com/3e1c5661b6.js"></script>

  <!--Tagging Functionality-->
  <script src="/resources/tags/tags.js"></script>
  <link href="/resources/tags/tags.css" rel="stylesheet" />

  <!--Global Variables-->
  <script>
    var noteProperties = {
      name: "",
      private: false,
      tags: null, author: "..."
    };

    var notebook = [];
    var currentNotebook = 0;

    var user = {
      username: "<?php echo explode(',', base64_decode($_COOKIE['signedIn']))[0]; ?>", password: "<?php echo base64_encode(explode(',', base64_decode($_COOKIE['signedIn']))[1]); ?>"
    }

    var otherTags = null;
  </script>

  <!--NoteHub Note Editor-->
  <script src="algorithm.js"></script>
  <script src="filing.js"></script>
  <script src="ui.js"></script>
  <script src="miscellaneous.js"></script>

  <!--CKEditor-->
  <script src="ckeditor/ckeditor.js"></script>

  <!--Notebook UI-->
  <style>
    .TabStrip { overflow-x: scroll; }

    .TabStrip::-webkit-scrollbar { display: none; }
    .TabStrip::-webkit-scrollbar-button { display: none; }
    .TabStrip::-webkit-scrollbar-track-piece { display: none; }
    .TabStrip::-webkit-scrollbar-thumb { display: none; }

    #App-Mode {
      position: fixed;
      top: 10px; right: 10px;
      z-index: 3;
      padding: 5px;
    }

/*Dialogs*/
    #References-AddBar {
      display: flex;  
      flex-flow: row wrap;
    }
    
    #References-AddBar > * {
      padding: 5px;
      flex: 1 100%;
    }

    @media all and (min-width: 500px) {
      #References-AddBar-Bottom { flex: 1 auto; }
    }

    #Reference-Table {
      position: relative;
      left: -16px;
      width: calc(100% + 32px);
      border-collapse: collapsed; border-spacing: 0; border: 0;
    }
    #Reference-Table th, #Reference-Table td { padding: 7.5px; text-align: left; }
    #Reference-Table th { background-color: lightgrey; }

  /*Unique CKEditor styling*/
    #cke_Editor {
      position: absolute;
    }

    @media screen and (min-width: 993px) {
      #cke_Editor {
        left: 200px;
        width: calc(100% - 200px); height: calc(100% - 135px);
      }

      .TabStrip table {
        table-layout: fixed;
        white-space: nowrap;
        border-collapse: collapse;
      }
    }

    @media screen and (max-width: 992px) {
      #cke_Editor {
        left: 0;
        width: 100%; height: calc(100% - 150px);
      }

      .TabStrip table {
        white-space: nowrap;
        border-collapse: collapse;
      }
    }

    #cke_1_contents { height: 100% !important; }

    .cke_inner[role=presentation] { height: calc(100% - 75px) !important; }
  </style>
</head>

<body style="overflow: hidden;" onbeforeunload="return ConfirmLeave();">
  <div class="w3-sidebar w3-bar-block w3-collapse w3-card-2 w3-animate-left" style="width:200px;" id="App-Menu">
    <button class="w3-bar-item w3-button w3-large w3-hide-large" onclick="CloseAppMenu();">Close &times;</button>

    <img src="/logo.png" width="200" height="200" />

    <div class="w3-container w3-blue">
      <h5>
        <i class="fa fa-fw fa-user-circle-o" aria-hidden="true"></i>&nbsp;&nbsp;
        Welcome, <?php echo explode(",", base64_decode($_COOKIE["signedIn"]))[0]; ?>!
      </h5>
    </div>

    <a href="javascript:AddNote();" class="w3-bar-item w3-button"><i class="fa fa-fw fa-plus" aria-hidden="true"></i>&nbsp;&nbsp;Add Note</a>

    <div class="w3-dropdown-hover">
      <button class="w3-button">
        <i class="fa fa-fw fa-floppy-o" aria-hidden="true"></i>&nbsp;&nbsp;Save Notebook...&nbsp;&nbsp;
        <i class="fa fa-fw fa-caret-down"></i>
      </button>
      <div class="w3-dropdown-content w3-bar-block w3-black" style="margin-left: 10px;">
        <a href="javascript:PrepareSaveAs();" class="w3-bar-item w3-button">Save as New Notebook</a>
        <a href="javascript:ViewLink();" class="w3-bar-item w3-button">Save Changes</a>
      </div>
    </div>

    <div class="w3-dropdown-hover">
      <button class="w3-button">
        <i class="fa fa-fw fa-link" aria-hidden="true"></i>&nbsp;&nbsp;Share Link...&nbsp;&nbsp;
        <i class="fa fa-fw fa-caret-down"></i>
      </button>
      <div class="w3-dropdown-content w3-bar-block w3-black" style="margin-left: 10px;">
        <a href="javascript:EditLink();" class="w3-bar-item w3-button">Editing Link</a>
        <a href="javascript:ViewLink();" class="w3-bar-item w3-button">Viewing Link</a>
      </div>
    </div>

    <a href="javascript:ListSuggestions();ShowModal('NoteDetails');" class="w3-bar-item w3-button"><i class="fa fa-fw fa-info-circle" aria-hidden="true"></i>&nbsp;&nbsp;Note Details</a>
    <hr>

    <a href="/accounts/manager-manage.php" class="w3-bar-item w3-button"><i class="fa fa-fw fa-user" aria-hidden="true"></i>&nbsp;&nbsp;Account Manager</a>
    <a href="/accounts/manager-privatenotes.php" class="w3-bar-item w3-button"><i class="fa fa-fw fa-folder" aria-hidden="true"></i>&nbsp;&nbsp;Note Manager</a>
    <hr>

    <a href="/gallery" class="w3-bar-item w3-button"><i class="fa fa-fw fa-picture-o" aria-hidden="true"></i>&nbsp;&nbsp;NoteHub Gallery</a>
    <a href="/note" class="w3-bar-item w3-button w3-grey"><i class="fa fa-fw fa-file" aria-hidden="true"></i>&nbsp;&nbsp;New Notebook</a>
    <hr>

    <a href="../accounts/sign-out.php" class="w3-bar-item w3-button"><i class="fa fa-fw fa-sign-out" aria-hidden="true"></i>&nbsp;&nbsp;Sign Out</a>
  </div>

  <div class="w3-main" style="margin-left: 200px">
    <div class="w3-container" id="App-TitleBar">
      <button class="w3-button w3-xlarge w3-hide-large" onclick="OpenAppMenu();">&#9776;</button>

      <a href="/" style="color: white; text-decoration: none; font-size: 24px;">
        <span style="font-weight: lighter;">Note</span><b>Hub</b>
      </a>
      <span id="Page-Name"> | <?php
        echo "New Notebook"
      ?>
      </span>
    </div>

    <div class="w3-card w3-green w3-round-large" id="App-Mode">
    <?php
      if (!isset($_GET["note"])) { echo "Editing - Is Owner"; }
    ?></div>

    <div>
      <div id="Fluffy" style="margin-top: 52px;"></div>
      <style> @media screen and (max-width: 992px) { #Fluffy { margin-top: 72px !important; } } </style>

      <div class="TabStrip">
        <table cellspacing="0" cellpadding="0" class="w3-bar w3-gray w3-container"><tr id="TabStrip"></tr></table>
      </div>
      
      <div id="TabContent"></div>

      <!--References UI-->
      <div id="Notes-References" style="display: none;" class="city">
        <div class="w3-padding"><b>References</b></div>
        <div class="w3-padding">
          Public notes are always better with references! Our algorithm will award more credibility points to notes with credible sources.
          <br><br>

          <!--Box for adding References-->
          <div id="References-AddBar">
            <header class="header">
              <select onchange="UpdateReferencesBar();" id="References-AddBar-Types" style="width: 100%; padding: 6px;">
                <option>Written Work (book, essay, etc.)</option>
                <option>Website</option>
                <option>Multimedia</option>
                <option>Other</option>
              </select>
            </header>

            <article class="main">
              <input id="References-AddBar-Reference" style="width: 100%; padding: 6px;" placeholder="Title of Written Work" />
            </article>

            <aside id="References-AddBar-Bottom">
              <input id="References-AddBar-Author" style="width: 100%; padding: 6px;" placeholder="Author / Publisher of Written Work" />
            </aside>

            <aside id="References-AddBar-Bottom" style="max-width: 200px !important;">
              <button class="w3-button w3-green" style="width: 100%;" onclick="AddReference();">Add Reference</button>
            </aside>
          </div>

          <!--References-->
          <table id="Reference-Table">
            <tr>
              <th style="min-width: 200px;">Reference Type</th>
              <th style="width: 50%;">Reference Title / URL</th>
              <th style="width: 50%;">Reference Author / Publisher</th>
            </tr>

            <tr style="border-bottom: 1px solid grey;">
              <td style="text-align: center;" colspan="3">No references found...</td>
            </tr>
          </table>
        </div>
      </div>

      <!--Equivalent of the old #Editor-->
      <div id="Editor"></div>
    </div>
  </div>

  <!--Snackbars-->
  <div id="Snackbar-NoContent" class="w3-snackbar">
    <span class="ErrorText">We can't save your note as it doesn't have any content.</span>
  </div>

  <div id="Snackbar-Tags" class="w3-snackbar">
    <span class="ErrorText">Please set some tags for your note.</span>
  </div>

  <div id="Snackbar-Name" class="w3-snackbar">
    <span class="ErrorText">Please set a name for your note.</span>
  </div>

  <div id="Snackbar-DuplicateReference" class="w3-snackbar">
    <span class="ErrorText">You're trying to add a duplicate reference.</span>
  </div>

  <div id="Snackbar-WarnOverwrite" class="w3-snackbar">
    <span class="ErrorText">You'll overwrite an existing note with the same name.</span>
  </div>

  <!--Modal Dialogs-->
  <div id="Modal-Rename" class="w3-modal w3-card">
    <div class="w3-modal-content w3-animate-top w3-card-4">
      <header class="w3-container w3-blue"> 
        <span onclick="CloseModal();" class="w3-button w3-display-topright">&times;</span>
        <h2>Rename Note</h2>
      </header>

      <div class="w3-container w3-padding">
        Rename "<span id="Rename-OldName"></span>" to:
        <br>
        <input style="width: 100%; padding: 6px; margin-top: 7.5px;" id="Rename-NewName" placeholder="New Name" />
      </div>

      <footer class="w3-container w3-blue w3-padding">
        <button class="w3-button w3-green" onclick="PerformRename();">RENAME</button>
        <button class="w3-button w3-red" onclick="CloseModal();">CANCEL</button>
      </footer>
    </div>
  </div>

  <div id="Modal-NoteDetails" class="w3-modal w3-card">
    <div class="w3-modal-content w3-animate-top w3-card-4">
      <header class="w3-container w3-blue"> 
        <span onclick="CloseModal();" class="w3-button w3-display-topright">&times;</span>
        <h2>Note Details</h2>
      </header>

      <div class="w3-container w3-padding">
        <h4 title="This is only updated when you save your note."><b>Note Name: </b></h4>
        <span id="NoteInfo-NoteName" title="This is only updated when you save your note.">New Notebook</span><br><br>

        <h4><b>Note Privacy</b></h4>
        <form action="" id="NoteInfo-NotePrivacy" style="width: 100%; padding: 10px;">
          <input type="radio" checked>&nbsp;&nbsp;Public
            <ul>
              <li>Anyone can suggest</li>
              <li>You have full control over note content</li>
              <li>Subject to intelligent algorithms.</li>
            </ul>
          <input type="radio">&nbsp;&nbsp;Private, Viewable
            <ul>
              <li>Viewable by anyone</li>
              <li>Only specific people may edit this note</li>
              <li>Not subject to inteligent algorithms.</li>
            </ul>
          <input type="radio">&nbsp;&nbsp;Private, Restricted
            <ul>
              <li>Only specific people may view this note</li>
              <li>Only specific people may edit this note</li>
              <li>Not subject to inteligent algorithms.</li>
            </ul>
        </form>
        <a href="https://notehub.ga/view-note" target="_blank">Learn more about note privacy</a><br><br>

        <h4><b>Last Modified: </b>
        <span id="NoteInfo-LastModified">Today</span></h4>

        <h4><b>Notebook Tags:</b></h4>
        <input id="NoteInfo-Tags" placeholder="Note Tags" />
        <label><b>Suggested: </b><span id="NoteInfo-SuggestedTags">
          <div class="FilePicker-Item-Tag" style="top: 0;">- No Suggestions -</div>
        </span><br>
        <label>Notebooks are classified by tags. Tags are a factor when other users search for notes. Popular tags tend to be recommended to more people, and more often.</label><br>
        <a href="https://notehub.ga/note?edit=<note id in generated link...>" target="_blank">Learn more about tags</a><br><br>
      </div>

      <footer class="w3-container w3-blue w3-padding">
        <button class="w3-button w3-green" onclick="CloseModal();">CLOSE</button>
      </footer>
    </div>
  </div>

  <div id="Modal-SaveAs" class="w3-modal w3-card">
    <div class="w3-modal-content w3-animate-top w3-card-4">
      <header class="w3-container w3-blue"> 
        <span onclick="CloseModal();" class="w3-button w3-display-topright">&times;</span>
        <h2>Save Note As...</h2>
      </header>

      <div class="w3-container w3-padding">
        <details onclick="DetailsAsAccordion(event, this);" open>
          <summary>Choose Note Location</summary>
            <p>
              Please select a location where your note will be stored.
            </p>

          <div class="Details-Content">
            <div class="w3-row">
              <div id="SaveAs-Header1" style="cursor: pointer;" class="w3-container w3-cell w3-blue" onclick="noteProperties.private = false; SwitchToFiles(1);"><h5>Public Notebooks</h5></div>
              <div id="SaveAs-Header2" style="cursor: pointer;" class="w3-container w3-cell w3-light-grey" onclick="noteProperties.private = true; SwitchToFiles(2);"><h5>Your Private Notebooks</h5></div>
            </div>

            <div class="w3-light-grey">
              <div id="SaveAs-Content1">
                <div id="SaveAs-Content1-Objects" class="w3-padding w3-blue">Notebooks</div>
                <div id="SaveAs-Content1-Content"><?php
                  //Get public notebooks
                ?></div>
              </div>
              <div id="SaveAs-Content2" style="display: none;">
                <div id="SaveAs-Content2-Objects" class="w3-padding w3-blue"><i class="fa fa-book" aria-hidden="true"></i>&nbsp;&nbsp;Private Notebooks</div>
                <div id="SaveAs-Content2-Content"><?php
                  //Get private notebooks
                  include("backend/private-notes.php");
                  $privateNotes = ListPrivateNotes(explode(",", base64_decode($_COOKIE["signedIn"]))[0], explode(",", base64_decode($_COOKIE["signedIn"]))[1]);

                  if (empty($privateNotes)) { echo "<div class='w3-button' style='width: calc(100% - 32px); background-color: transparent;'>You don't seem to have any private notes yet.<br>&#xAF;\\_(&#x30C4;)_/&#xAF;</div>"; }
                  else {
                    for ($i = 0; $i < count($privateNotes); $i++) {
                      echo "<div class='w3-button' style='width: calc(100% - 32px); text-align: left;' onclick='noteProperties.name = \"{$privateNotes[$i]}\"; ShowSnackBar(\"WarnOverwrite\"); document.getElementById(\"SaveAs-NoteName\").value = \"{$privateNotes[$i]}\";'>{$privateNotes[$i]}</div>";
                    }
                  }
                ?></div>
              </div>
            </div>

            <br><input id="SaveAs-NoteName" style="width: calc(100% - 18px); padding: 6px;" placeholder="Note Name" />
          </div>
        </details>

        <details onclick="DetailsAsAccordion(event, this);">
          <summary>Choose Note Tags</summary>

          <div class="Details-Content">
            <p>
              Note tags are displayed on your note as tags, for users to see. They are also a factor when other users search for notes using tags. Popular tags tend to be displayed at the top of the gallery feed.<br>NOTE: Tags don't matter for private notes.
            </p>

            <input id="SaveAs-Tags" /><label><b>Suggested / Warnings: </b><span id="SaveAs-SuggestedTags">
              <div class="FilePicker-Item-Tag" style="top: 0;">- No Suggestions -</div>
            </span><br>
          </div>
        </details>
      </div>

      <footer class="w3-container w3-blue w3-padding">
        <button class="w3-button w3-green" onclick="SaveNote();">SAVE AS</button>
        <button class="w3-button w3-red" onclick="CloseModal();">CLOSE</button>
      </footer>
    </div>
  </div>

  <div id="Modal-Saving" class="w3-modal w3-card">
    <div class="w3-modal-content w3-animate-top w3-card-4">
      <header class="w3-container w3-blue"> 
        <span onclick="CloseModal();" class="w3-button w3-display-topright">&times;</span>
        <h2>Saving Note...</h2>
      </header>

      <div id="Saving-Status" style="text-align: -webkit-center;" class="w3-container w3-padding">
        <i class="fa fa-fw fa-times fa-5x" aria-hidden="true"></i>
        <i class="fa fa-fw fa-check fa-5x" aria-hidden="true"></i>
        <i class="fa fa-fw fa-spinner fa-pulse fa-5x fa-fw "></i>
      </div>

      <footer class="w3-container w3-blue w3-padding">
        <button class="w3-button w3-green" onclick="CloseModal();">CLOSE</button>
      </footer>
    </div>
  </div>

  <div id="Modal-SharingLink" class="w3-modal w3-card">
    <div class="w3-modal-content w3-animate-top w3-card-4">
      <header class="w3-container w3-blue"> 
        <span onclick="CloseModal();" class="w3-button w3-display-topright">&times;</span>
        <h2>Sharing Link</h2>
      </header>

      <div class="w3-container w3-padding">
        <div id="Modal-SharingLink-Text"></div>
        <input readonly="readonly" style="width: 100%; margin-top: 5px; padding: 5px;" id="Modal-SharingLink-Link" value="- No link! -" />
      </div>

      <footer class="w3-container w3-blue w3-padding">
        <button class="w3-button w3-green" onclick="CloseModal();">CLOSE</button>
      </footer>
    </div>
  </div>

  <script>
    notebook = <?php
      if ((isset($_GET["note"])) && ($_GET["private"] == "true")) {
        error_reporting(0);

        $path = $_SERVER['DOCUMENT_ROOT'];
        $path .= "/databases/notes/private-notes/" . explode(',', base64_decode($_COOKIE['signedIn']))[0] . "/" . $_GET["note"] . ".txt";
        
        $getNote = file_get_contents($path);
        if ($getNote !== false) { echo $getNote; }
        else {
          $note[0] = array(
            "name" => "New Note", "type" => "Note",
            "author" => explode(',', base64_decode($_COOKIE['signedIn']))[0],
            "content" => "<p><h1><b>An Error Occurred :(</b></h1></p><hr><p>NoteHub was unable to retrive this private note, either because you don't have permissions to access it or due to <a href='https://en.wikipedia.org/wiki/Cosmic_ray'>cosmic rays</a>. We're sorry for any incovenience caused.</p>"
          );
          $note[1] = array(
            "name" => "References", "type" => "References",
            "author" => "all",
            "content" => []
          );

          echo json_encode($note);
        }
      }
      else {
        $note = [];
        $note[0] = array(
          "name" => "New Note", "type" => "Note",
          "author" => explode(',', base64_decode($_COOKIE['signedIn']))[0],
          "content" => "<p><h1><b>New Note</b></h1><small>by " . explode(',', base64_decode($_COOKIE['signedIn']))[0] . "</small></p><hr><p>Content</p>"
        );
        $note[1] = array(
          "name" => "References", "type" => "References",
          "author" => "all",
          "content" => []
        );

        echo json_encode($note);
      }
    ?>;
  </script>
</body>

</html>
