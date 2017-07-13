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
        <i class="fa fa-fw fa-user-circle-o" aria-hidden="true"></i>&nbsp;&nbsp;
        Welcome, <?php
          if (isset($_COOKIE["signedIn"])) { echo explode(",", base64_decode($_COOKIE["signedIn"]))[0]; }
          else { echo "User"; }
        ?>!
      </h5>
    </div>
      <a href="/help/index.php">Help Main Page</a>
      <br><br><a href="/help/what's-what.php">What's What</a>
      <br><br><a href="/help/creating-note.php">Creating and Sharing a Note</a>
      <br><br><a href="/help/gallery.php">Navigating the Gallery</a>
      <br><br><a href="/help/account-management.php">Account Management</a>
    <hr>
    <?php
      if (isset($_COOKIE["signedIn"])) { echo '<a href="../accounts/sign-out.php" class="w3-bar-item w3-button"><i class="fa fa-fw fa-sign-out" aria-hidden="true"></i>&nbsp;&nbsp;Sign Out</a>'; }
      else { echo '<a href="../accounts/sign-in.php" class="w3-bar-item w3-button"><i class="fa fa-fw fa-sign-out" aria-hidden="true"></i>&nbsp;&nbsp;Sign In</a>'; }
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
      <b style="font-size: 20px">Creating and Sharing a Note</b>
    <hr>
      In this short tutorial, you can learn how to create a note.
      <br>
      <h2>Creating a Note</h2>
      To create a note, you must login to your account.<br><span style="font-size:15px;">Don't have an account? Sign up <a href="/accounts/sign-up.php">here</a>!</span>
      <br><br>
      Once you have logged in, click on the 'New Notebook' button at the bottom of the menu bar, under your Private Notes. You will find yourself on the 'New Notebook' page.
      <ul><p>Features</p>
        <li>Spelling checker: you can enable a spelling checker by clicking on the icon and enabling SCAYT</li>
        <li>Formatting can be arranged in the bottom row (e.g. bold, italics, font size and family)</li>
      </ul>
      <br>On this page, you can type in your content, using the functions in the top menu bar to manipulate your font into different colours, shapes and sizes.
      <br>
      Congratulations! You have finished creating a note!...
      <br><br>
      <h2>Saving a Note</h2>
      ...But you haven't saved it yet. If you don't save, all of your progress will be lost...
      <br>...so remember to save your work at regular intervals to keep your precious work safe and sound.
      <br><br>Saving also allows you to give your note a name.
      <br><br>Under the save button on the left menu bar, there are two options: saving your note as a New Notebook and saving the changes that you made to an existing note.
      <ul>
        <li>Saving as a new note makes a new note under your account</li>
        <li>Saving changes only saves the changes you have made to the note but not to your account</li>
      </ul>
      <br><br>
      <h2>Sharing as Links</h2>
      <br>If you want to share your work with collaborators via a simple and handy link, click on the "Share Link..." button on the side of the page and choose one of the two options available. (Note that this requires you to name the note.)
      <ul>
        <li>Share the editing link to allow the reciepients to edit your note</li>
        <li>If the note is only for viewing, click on the viewing link to share it with them</li>
      </ul>
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
