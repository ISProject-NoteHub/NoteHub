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
      <br><br> <a class="active" href="/help/getting-started.php">Getting Started</a>
      <br><br><a href="/help/creating-note.php">Creating a Note</a>
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
      <b style="font-size: 20px">Getting Started (For New Users)</b>
    <hr>
      Getting confused about what does what? Worry not! In this simple tutorial, we'll give you a brief introduction to some of the functions and features of frequently used NoteHub pages.<br><br>
     <h2><a href="/accounts/manager-manage.php" target="_blank">Account Home</a></h2>
       This is the first page that you will see once you login to NoteHub. 
       <br><span style="font-size: 14px">Don't have an account yet? Sign up <a href="/accounts/sign-up.php" target="_blank">here</a>!</span>
       <br><br>This page will show the number of private notes you have and the number of new suggestions on your public notes.
      
      <h2><a href="/accounts/manager-security.php" target="_blank">Account Security</a></h2>
       View your security details here. 
       <br><br>Currently, you can change your account password here.

      <h2><a href="/accounts/manager-details.php" target="_blank">Account Details</a></h2>
       Backend not complete. Come back in early August to check it out!

      <h2><a href="/gallery/" target="_blank">NoteHub Gallery</a></h2>
       The gallery is one of the main features of NoteHub.
       <br><br>The gallery enables users who are <a href="/accounts/sign-in.php" target="_blank">signed in</a> to browse through other users' public notes. 
       <br><br>The gallery is able to sort notes into specific topics and suggest recommended notes for the user.
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
