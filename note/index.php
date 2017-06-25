<?php
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

  <!--NoteHub Note Editor-->
  <script src="miscellaneous.js"></script>

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

    <a href="/accounts/manager-manage.php" class="w3-bar-item w3-button"><i class="fa fa-user" aria-hidden="true"></i>&nbsp;&nbsp;Account Manager</a>
    <a href="/accounts/manager-privatenotes.php" class="w3-bar-item w3-button"><i class="fa fa-folder" aria-hidden="true"></i>&nbsp;&nbsp;Your Private Notes</a>
    <hr>
    <a href="/note" class="w3-bar-item w3-button w3-grey"><i class="fa fa-file" aria-hidden="true"></i>&nbsp;&nbsp;New Note</a>
    <hr>
    <div class="w3-dropdown-hover">
      <button class="w3-button">
        <i class="fa fa-link" aria-hidden="true"></i>&nbsp;&nbsp;Share Link...&nbsp;&nbsp;
        <i class="fa fa-caret-down"></i>
      </button>
      <div class="w3-dropdown-content w3-bar-block w3-black" style="margin-left: 7.5px;">
        <a href="#" class="w3-bar-item w3-button">Editing Link</a>
        <a href="#" class="w3-bar-item w3-button">Viewing Link</a>
      </div>
    </div>
    <hr>
    <a href="sign-out.php" class="w3-bar-item w3-button"><i class="fa fa-sign-out" aria-hidden="true"></i>&nbsp;&nbsp;Sign Out</a>
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
      <div id="Editor"></div>
    </div>
  </div>

  <!--Modal Dialogs-->
  <div id="Modal-SharingLink" class="w3-modal">
    <div class="w3-modal-content w3-animate-top w3-card-4">
      <header class="w3-container w3-teal"> 
        <span onclick="document.getElementById('Modal-SharingLink').style.display='none';" class="w3-button w3-display-topright">&times;</span>
        <h2>Sharing Link</h2>
      </header>
      <div class="w3-container">
        <p>Some text..</p>
        <p>Some text..</p>
      </div>
      <footer class="w3-container w3-teal">
        <button class="w3-button">CLOSE</button>
      </footer>
    </div>
  </div>

  <script>
    function OpenAppMenu() {
      document.getElementById("App-Menu").style.display = "block";
    }
    function CloseAppMenu() {
      document.getElementById("App-Menu").style.display = "none";
    }
  </script>
</body>

</html>