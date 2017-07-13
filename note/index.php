<?php
  if (!isset($_COOKIE["signedIn"])) { header("Location: /accounts/sign-in.php"); }
?>
<!--HTML document begins here-->
<!DOCTYPE html>
<html>

<head>
  <title>
    <?php echo "New Note "; ?>
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
      noteOpened: false, noteAsObject: null,
      private: false,
      tags: null, author: "...",
      references: null,
      topic: null
    };

    var user = {
      username: "<?php echo explode(',', base64_decode($_COOKIE['signedIn']))[0]; ?>", password: "<?php echo base64_encode(explode(',', base64_decode($_COOKIE['signedIn']))[1]); ?>"
    }

    var notebooks = [];

    var otherTags = null;
  </script>

  <!--NoteHub Note Editor-->
  <script src="algorithm.js"></script>
  <script src="filing.js"></script>
  <script src="ui.js"></script>
  <script src="miscellaneous.js"></script>

  <!--Dialogs-->
  <style>
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
  </style>

  <!--Unique CKEditor styling-->
  <style>
    #cke_Editor {
      position: absolute;
    }

    @media screen and (min-width: 993px) {
      #cke_Editor {
        left: 200px;
        width: calc(100% - 200px); height: calc(100% - 58px);
      }
    }

    @media screen and (max-width: 992px) {
      #cke_Editor {
        left: 0;
        width: 100%; height: calc(100% - 72px);
      }
    }

    #cke_1_contents { height: 100% !important; }

    .cke_inner[role=presentation] { height: calc(100% - 75px) !important; }
  </style>

  <!--CKEditor-->
  <script src="ckeditor/ckeditor.js"></script>
</head>

<body style="overflow: hidden;" onbeforeunload="return ConfirmLeave();">
  <div class="w3-sidebar w3-bar-block w3-collapse w3-card-2 w3-animate-left" style="width:200px;" id="App-Menu">
    <button class="w3-bar-item w3-button w3-large w3-hide-large" onclick="CloseAppMenu();">Close &times;</button>

    <img src="/logo.png" width="200" height="200" />

    <div class="w3-container w3-blue">
      <h5>
        <i class="fa fa-user-circle-o" aria-hidden="true"></i>&nbsp;&nbsp;
        Welcome, <?php echo explode(",", base64_decode($_COOKIE["signedIn"]))[0]; ?>!
      </h5>
    </div>

    <div class="w3-dropdown-hover">
      <button class="w3-button">
        <i class="fa fa-floppy-o" aria-hidden="true"></i>&nbsp;&nbsp;Save Note...&nbsp;&nbsp;
        <i class="fa fa-caret-down"></i>
      </button>
      <div class="w3-dropdown-content w3-bar-block w3-black" style="margin-left: 10px;">
        <a href="javascript:PrepareSaveAs();" class="w3-bar-item w3-button">Save as New Note</a>
        <a href="javascript:ViewLink();" class="w3-bar-item w3-button">Save Changes</a>
      </div>
    </div>

    <div class="w3-dropdown-hover">
      <button class="w3-button">
        <i class="fa fa-link" aria-hidden="true"></i>&nbsp;&nbsp;Share Link...&nbsp;&nbsp;
        <i class="fa fa-caret-down"></i>
      </button>
      <div class="w3-dropdown-content w3-bar-block w3-black" style="margin-left: 10px;">
        <a href="javascript:EditLink();" class="w3-bar-item w3-button">Editing Link</a>
        <a href="javascript:ViewLink();" class="w3-bar-item w3-button">Viewing Link</a>
      </div>
    </div>

    <a href="javascript:ShowModal('References');" class="w3-bar-item w3-button"><i class="fa fa-external-link" aria-hidden="true"></i>&nbsp;&nbsp;References</a>
    <a href="javascript:ListSuggestions();ShowModal('NoteDetails');" class="w3-bar-item w3-button"><i class="fa fa-info-circle" aria-hidden="true"></i>&nbsp;&nbsp;Note Details</a>
    <hr>

    <a href="/accounts/manager-manage.php" class="w3-bar-item w3-button"><i class="fa fa-user" aria-hidden="true"></i>&nbsp;&nbsp;Account Manager</a>
    <a href="/accounts/manager-privatenotes.php" class="w3-bar-item w3-button"><i class="fa fa-folder" aria-hidden="true"></i>&nbsp;&nbsp;Your Private Notes</a>
    <hr>

    <a href="/gallery" class="w3-bar-item w3-button"><i class="fa fa-picture-o" aria-hidden="true"></i>&nbsp;&nbsp;NoteHub Gallery</a>
    <a href="/note" class="w3-bar-item w3-button w3-grey"><i class="fa fa-file" aria-hidden="true"></i>&nbsp;&nbsp;New Note</a>
    <hr>

    <a href="../accounts/sign-out.php" class="w3-bar-item w3-button"><i class="fa fa-sign-out" aria-hidden="true"></i>&nbsp;&nbsp;Sign Out</a>
  </div>

  <div class="w3-main" style="margin-left: 200px">
    <div class="w3-container" id="App-TitleBar">
      <button class="w3-button w3-xlarge w3-hide-large" onclick="OpenAppMenu();">&#9776;</button>

      <a href="/" style="color: white; text-decoration: none; font-size: 24px;">
        <span style="font-weight: lighter;">Note</span><b>Hub</b>
      </a>
      <span id="Page-Name"> | <?php
        echo "New Note"
      ?>
      </span>
    </div>

    <div class="w3-container">
      <!--Equivalent of the old #Editor-->
      <div id="Editor"><?php
        if (isset($_GET["note"])) {
          echo file_get_contents("../databases/notes/" . explode("/", $_GET["note"])[0] . "/" . explode("/", $_GET["note"])[1] . ".txt");
        }
      ?></div>
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

  <!--Modal Dialogs-->
  <div id="Modal-References" class="w3-modal">
    <div class="w3-modal-content w3-animate-top w3-card-4">
      <header class="w3-container w3-blue"> 
        <span onclick="CloseModal();" class="w3-button w3-display-topright">&times;</span>
        <h2>References</h2>
      </header>

      <div class="w3-container w3-padding">
        <!--When possible, push the styles to the editor-styling.css stylesheet-->
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

          <asid id="References-AddBar-Bottom" style="max-width: 200px !important;">
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

      <footer class="w3-container w3-blue w3-padding">
        <button class="w3-button w3-green" onclick="CloseModal();">CLOSE</button>
      </footer>
    </div>
  </div>

  <div id="Modal-NoteDetails" class="w3-modal">
    <div class="w3-modal-content w3-animate-top w3-card-4">
      <header class="w3-container w3-blue"> 
        <span onclick="CloseModal();" class="w3-button w3-display-topright">&times;</span>
        <h2>Note Details</h2>
      </header>

      <div class="w3-container w3-padding">
        Here's the meta-data of your note. This data assists our intelligent algorithm in suggesting notes to users.
        <br><br>

        <b>Note Name: </b><span id="NoteInfo-NoteName">New Note</span> - this is only updated when you save your note.<br>
        <b>Note Privacy: </b><select id="NoteInfo-NotePrivacy" style="width: 100%; padding: 10px;">
          <option selected>Public, for all to see. Anyone can suggest, but you retain full control of what gets incoporated. Note content is subject to intelligent algorithms.</option>
          <option>Private, but viewable by anyone. Only collaborators you add may make any changes to the note. Note content is not subject to inteligent algorithms.</option>
          <option>Private and viewable only by those you let view it. Only collaborators you add may make any changes to the note. Note content is not subject to inteligent algorithms.</option>
        </select><br>
        <a href="https://notehub.ga/view-note" target="_blank">Learn More about note privacy</a><br>
        <b>Last Modified: </b><span id="NoteInfo-LastModified">Today</span><br><br>

        <b>Note Tags:</b>
        <input id="NoteInfo-Tags" placeholder="Note Tags" />
        <label><b>Suggested / Warnings: </b><span id="NoteInfo-SuggestedTags">
          <div class="FilePicker-Item-Tag" style="top: 0;">- No Suggestions -</div>
        </span><br>
        <label>Note tags are displayed on your note as tags, for users to see. They are also a factor when other users search for notes using tags. Popular tags tend to be displayed at the top of the gallery feed.</label><br>
        <a href="https://notehub.ga/note?edit=<note id in generated link...>" target="_blank">Learn More about tags</a><br><br>
      </div>

      <footer class="w3-container w3-blue w3-padding">
        <button class="w3-button w3-green" onclick="CloseModal();">CLOSE</button>
      </footer>
    </div>
  </div>

  <div id="Modal-SaveAs" class="w3-modal">
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
              <div id="SaveAs-Header1" style="cursor: pointer;" class="w3-container w3-cell w3-blue" onclick="SwitchToFiles(1);"><h5>Public Notes</h5></div>
              <div id="SaveAs-Header2" style="cursor: pointer;" class="w3-container w3-cell w3-light-grey" onclick="SwitchToFiles(2);"><h5>Your Private Notes</h5></div>
            </div>

            <div class="w3-light-grey">
              <div id="SaveAs-Content1">
                <div id="SaveAs-Content1-Objects" class="w3-padding w3-blue">Notebooks</div>
                <div id="SaveAs-Content1-Content"></div>
              </div>
              <div id="SaveAs-Content2" style="display: none;">
                <div id="SaveAs-Content2-Objects" class="w3-padding w3-blue">Private Notes</div>
                <div id="SaveAs-Content2-Content"></div>
              </div>
            </div>

            <br><input id="SaveAs-NoteName" style="width: calc(100% - 18px); padding: 6px;" placeholder="Note Name" />
          </div>
        </details>

        <details onclick="DetailsAsAccordion(event, this);">
          <summary>Choose Note Tags</summary>

          <div class="Details-Content">
            <p>
              Note tags are displayed on your note as tags, for users to see. They are also a factor when other users search for notes using tags. Popular tags tend to be displayed at the top of the gallery feed.
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

  <div id="Modal-Saving" class="w3-modal">
    <div class="w3-modal-content w3-animate-top w3-card-4">
      <header class="w3-container w3-blue"> 
        <span onclick="CloseModal();" class="w3-button w3-display-topright">&times;</span>
        <h2>Saving Note...</h2>
      </header>

      <div id="Saving-Status" style="text-align: -webkit-center;" class="w3-container w3-padding">
        <i class="fa fa-check fa-5x" aria-hidden="true"></i>
        <i class="fa fa-spinner fa-pulse fa-5x fa-fw"></i>
      </div>

      <footer class="w3-container w3-blue w3-padding">
        <button class="w3-button w3-green" onclick="CloseModal();">CLOSE</button>
      </footer>
    </div>
  </div>

  <div id="Modal-SharingLink" class="w3-modal">
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
</body>

</html>
