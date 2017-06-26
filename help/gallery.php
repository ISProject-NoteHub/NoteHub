<!DOCTYPE html>
<html>
<head>
  <title>Help | NoteHub</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <link href="/logo-small.png" rel="icon" />
  <link href="/resources/stylesheets/float-labels.css" rel="stylesheet" />
  <link href="/resources/stylesheets/w3.css" rel="stylesheet" />
  <link href="/resources/stylesheets/editor-styling.css" rel="stylesheet" />

  <link href="https://fonts.googleapis.com/css?family=Questrial" rel="stylesheet">

  <script src="https://use.fontawesome.com/3e1c5661b6.js"></script>
  
  <style>
    a{
        color: dodgerblue;
    }
    h2{
        font-size: 17px;
    }
  </style>
</head>
  
<body>
  <div class="w3-sidebar w3-bar-block w3-collapse w3-card-2 w3-animate-left" style="width:200px;" id="App-Menu">
    <button class="w3-bar-item w3-button w3-large w3-hide-large" onclick="CloseAppMenu();">Close &times;</button>

    <img src="/logo.png" width="200" height="200" />

    <div class="w3-container w3-blue">
      <h5>
        <i class="fa fa-user-circle-o" aria-hidden="true"></i>&nbsp;&nbsp;
        Welcome, <?php
          if (isset($_COOKIE["signedIn"])) { echo explode(",", base64_decode($_COOKIE["signedIn"]))[0]; }
          else { echo "User"; }
        ?>!
      </h5>
    </div>
      <a href="/help/index.php">Help Main Page</a>
      <br><br><a href="/help/getting-started.php">Getting Started</a>
      <br><br><a href="/help/creating-note.php">Creating a Note</a>
      <br><br><a href="/help/gallery">Navigating the Gallery</a>
      <br><br><a href="/help/account-management.php">Account Management</a>
    <hr>
    <?php
      if (isset($_COOKIE["signedIn"])) { echo '<a href="../accounts/sign-out.php" class="w3-bar-item w3-button"><i class="fa fa-sign-out" aria-hidden="true"></i>&nbsp;&nbsp;Sign Out</a>'; }
      else { echo '<a href="../accounts/sign-in.php" class="w3-bar-item w3-button"><i class="fa fa-sign-out" aria-hidden="true"></i>&nbsp;&nbsp;Sign In</a>'; }
    ?>
  </div>

  <div class="w3-main" style="margin-left: 200px">
    <div class="w3-container" id="App-TitleBar">
      <button class="w3-button w3-xlarge w3-hide-large" onclick="OpenAppMenu();">&#9776;</button>

      <a href="/" style="color: white; text-decoration: none; font-size: 24px;">
        <span style="font-weight: lighter;">Note</span><b>Hub</b>
      </a>
      <span id="Page-Name"> | Help</span>
    </div>

    <div class="w3-container">
      <b style="font-size: 20px">Navigating the Gallery</b>
    <hr>
      
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
