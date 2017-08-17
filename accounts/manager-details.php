<?php
  $suggestions = [];

if (!isset($_COOKIE["signedIn"])) {
    header("Location: sign-in.php");
} else {
}
?>
<!--HTML document begins here-->
<!DOCTYPE html>
<html>
<head>
  <title>Account Details | NoteHub</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <link href="/logo-small.png" rel="icon" />
  <link href="/resources/stylesheets/float-labels.css" rel="stylesheet" />
  <link href="/resources/stylesheets/w3.css" rel="stylesheet" />
  <link href="/resources/stylesheets/editor-styling.css" rel="stylesheet" />
  <link href="/resources/stylesheets/test-styling.css" rel="stylesheet"/>
  <link href="/gallery/gallery-styling.css" rel="stylesheet"/>

  <link href="https://fonts.googleapis.com/css?family=Questrial" rel="stylesheet">

  <script src="https://use.fontawesome.com/3e1c5661b6.js"></script>

  <style>
    .profile-picture { margin-top: 15px; margin-bottom: 15px; }
  </style>
</head>
  
<body>
  <div class="w3-sidebar w3-bar-block w3-collapse w3-card-2 w3-animate-left" style="width:200px;" id="App-Menu">
    <button class="w3-bar-item w3-button w3-large w3-hide-large" onclick="CloseAppMenu();">Close &times;</button>

    <img src="/logo.png" width="200" height="200" />

    <div class="w3-container w3-blue">
      <h5>
        <i class="fa fa-fw fa-user-circle-o" aria-hidden="true"></i>&nbsp;&nbsp;
        Welcome, <?php echo explode(",", base64_decode($_COOKIE["signedIn"]))[0]; ?>!
      </h5>
    </div>

    <a href="manager-manage.php" class="w3-bar-item w3-button"><i class="fa fa-fw fa-user" aria-hidden="true"></i>&nbsp;&nbsp;Account Home</a>
    <a href="manager-security.php" class="w3-bar-item w3-button"><i class="fa fa-fw fa-shield" aria-hidden="true"></i>&nbsp;&nbsp;Account Security</a>
    <a href="manager-details.php" class="w3-bar-item w3-button w3-grey"><i class="fa fa-fw fa-address-card" aria-hidden="true"></i>&nbsp;&nbsp;Account Details</a>
    <hr>
    <a href="/gallery" class="w3-bar-item w3-button"><i class="fa fa-fw fa-picture-o" aria-hidden="true"></i>&nbsp;&nbsp;NoteHub Gallery</a>
    <a href="manager-privatenotes.php" class="w3-bar-item w3-button"><i class="fa fa-fw fa-folder" aria-hidden="true"></i>&nbsp;&nbsp;Private Notes</a>
    <a href="/note" class="w3-bar-item w3-button"><i class="fa fa-fw fa-file" aria-hidden="true"></i>&nbsp;&nbsp;New Notebook</a>
    <hr>
    <a href="sign-out.php" class="w3-bar-item w3-button"><i class="fa fa-fw fa-sign-out" aria-hidden="true"></i>&nbsp;&nbsp;Sign Out</a>
  </div>

  <div class="w3-main" style="margin-left: 200px">
    <div class="w3-container" id="App-TitleBar">
      <button class="w3-button w3-xlarge w3-hide-large" onclick="OpenAppMenu();">&#9776;</button>

      <a href="/" style="color: white; text-decoration: none; font-size: 24px;">
        <span style="font-weight: lighter;">Note</span><b>Hub</b>
      </a>
      <span id="Page-Name"> | Account Details</span>
    </div>

    <div class="w3-container w3-padding w3-border-blue">
      <!--Equivalent of the old #Editor-->
      <div style="margin-top: 52px;"></div>
      
        <div class="w3-container w3-card w3-border-blue w3-padding account-option-first">
          <img src="/resources/user-large.png" width="200" class="w3-container profile-picture"/>
          <div class="important-details">
            <h1 class="w3-container"><?php echo explode(",", base64_decode($_COOKIE["signedIn"]))[0]; ?></h1>
            <h5 class="w3-container">Account Created on 13 June 2017</h5>
            <h5 class="w3-container">Over 9000 Credibility Points</h5>
          </div>
        </div>
      
      <div class="w3-container w3-card w3-border-blue w3-padding account-option" style="padding-bottom: 16px !important;">
        <h3>Topics You Are Following</h3>
        <div class="w3-container w3-padding w3-margin-top w3-margin-right w3-card w3-half w3-green">History</div>
        <div class="w3-container w3-padding w3-margin-top w3-margin-right w3-card w3-half w3-green">Geography</div>
        <div class="w3-container w3-padding w3-margin-top w3-margin-right w3-card w3-half w3-green">History</div>
        <div class="w3-container w3-padding w3-margin-top w3-margin-right w3-card w3-half w3-green">Geography</div>
        <!--Argh!-->
      </div>

      <div class="w3-container w3-card w3-border-blue w3-padding account-option" style="padding-bottom: 16px !important;">
        <h3>Top Rated Notes</h3>
        <!--Gallery-like thing here-->
      </div>
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
