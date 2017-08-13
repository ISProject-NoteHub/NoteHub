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
      <a href="/help/index.php" class="w3-bar-item w3-button">Help Main Page</a>
      <a href="/help/whatswhat.php" class="w3-bar-item w3-button">What's What</a>
      <a href="/help/creating-note.php" class="w3-bar-item w3-button">Creating and Sharing a Note</a>
      <a href="/help/gallery.php" class="w3-bar-item w3-button w3-grey">Navigating the Gallery</a>
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
      <b style="font-size: 20px">Navigating the Gallery</b>
    <hr>
    Here, you will learn how to navigate the <a href="/gallery/">Gallery</a>.<br><br>
    In the Gallery, there is one section for random topics on the left. This shows a note from a random topic. Try reading it. Who knows? You might learn something new!
    On the right is a set of top rated notes. These are picked based on your interests.<br><br>
    Every user starts off in the Gallery. It is the Hub in NoteHub. From there, you can start reading others' notes, and create your own notes, public or private. Have fun using NoteHub's Gallery!
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
