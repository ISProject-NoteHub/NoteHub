<?php
  $suggestions = [];

  if (!isset($_COOKIE["signedIn"])) { header("Location: sign-in.php"); }
  else {
    include("../databases/microdb/Database.php");
    include("../databases/microdb/Cache.php");
    include("../databases/microdb/Event.php");
    include("../databases/microdb/Index.php");

    include("../note/backend/private-notes.php");

    $db = new \MicroDB\Database("../databases/accounts");

    $accountData = $db -> load(1);
    $accounts = count($accountData);

    for ($i = 0; $i < $accounts; $i++) {
      if (($accountData[$i][0] == base64_decode($_COOKIE["signedIn"])[0]) && password_verify(base64_decode($_COOKIE["signedIn"])[1], $accountData[$i][1])) {
        $suggestions = $accountData[$i][3];
      }
    }
  }
?>
<!--HTML document begins here-->
<!DOCTYPE html>
<html>
<head>
  <title>Account Home | NoteHub</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <link href="/logo-small.png" rel="icon" />
  <link href="/resources/stylesheets/w3.css" rel="stylesheet" />
  <link href="/resources/stylesheets/editor-styling.css" rel="stylesheet" />

  <link href="https://fonts.googleapis.com/css?family=Questrial" rel="stylesheet">

  <script src="https://use.fontawesome.com/3e1c5661b6.js"></script>

  <!--
    README PLS

    Wing Yip, please read through https://www.w3schools.com/w3css/ and see how you can incoporate such design into the content of the account manager.
    W3.css is already loaded into this page. PHP snippets spitting out the information are below - drag and drop them to your will.

    While the account manager isn't exactly the main part of NoteHub, it is important so please please please please please do it up properly.
    If there are many well-designed projects, this could be the deal-breaker :).

    For icons, http://fontawesome.io/icons/. Preloaded.
  -->
</head>
  
<body>
  <div class="w3-sidebar w3-bar-block w3-collapse w3-card-2 w3-animate-left" style="width:200px;" id="App-Menu">
    <button class="w3-bar-item w3-button w3-large w3-hide-large" onclick="CloseAppMenu();">Close &times;</button>

    <img src="/logo.png" width="200" height="200" />

    <div class="w3-container w3-blue">
      <h5>
        <i class="fa fa-user-circle-o" aria-hidden="true"></i>&nbsp;&nbsp;
        Welcome, <?php echo explode(",", base64_decode($_COOKIE["signedIn"]))[0]; ?>!
      </h5>
    </div>

    <a href="manager-manage.php" class="w3-bar-item w3-button w3-grey"><i class="fa fa-user" aria-hidden="true"></i>&nbsp;&nbsp;Account Home</a>
    <a href="manager-security.php" class="w3-bar-item w3-button"><i class="fa fa-shield" aria-hidden="true"></i>&nbsp;&nbsp;Account Security</a>
    <a href="manager-details.php" class="w3-bar-item w3-button"><i class="fa fa-address-card" aria-hidden="true"></i>&nbsp;&nbsp;Account Details</a>
    <hr>
    <a href="/gallery" class="w3-bar-item w3-button"><i class="fa fa-picture-o" aria-hidden="true"></i>&nbsp;&nbsp;NoteHub Gallery</a>
    <a href="manager-privatenotes.php" class="w3-bar-item w3-button"><i class="fa fa-folder" aria-hidden="true"></i>&nbsp;&nbsp;Your Private Notes</a>
    <a href="/note" class="w3-bar-item w3-button"><i class="fa fa-file" aria-hidden="true"></i>&nbsp;&nbsp;New Note</a>
    <hr>
    <a href="sign-out.php" class="w3-bar-item w3-button"><i class="fa fa-sign-out" aria-hidden="true"></i>&nbsp;&nbsp;Sign Out</a>
  </div>

  <div class="w3-main" style="margin-left: 200px">
    <div class="w3-container" id="App-TitleBar">
      <button class="w3-button w3-xlarge w3-hide-large" onclick="OpenAppMenu();">&#9776;</button>

      <a href="/" style="color: white; text-decoration: none; font-size: 24px;">
        <span style="font-weight: lighter;">Note</span><b>Hub</b>
      </a>
      <span id="Page-Name"> | Account Home</span>
    </div>

    <div class="w3-container">
      <!--Equivalent of the old #Editor-->
      
      <!--Spruce this up with some w3-cards and large text-->

      You have...<br>

      <!--PHP prints the number of private notes-->
      <div class="w3-row-padding" style="margin:0 -16px">
<div class="w3-third">
<div style="height:100px" class="w3-card w3-container w3-yellow w3-margin-bottom">
   <p>
      <?php
        echo count(ListPrivateNotes(explode(",", base64_decode($_COOKIE["signedIn"]))[0], explode(",", base64_decode($_COOKIE["signedIn"]))[1]));
      ?> Private Notes<br>
   </p>
  </div>
      </div>
        <div class="w3-third">
          <div style="height:100px" class="w3-card-2 w3-container w3-margin-bottom">
              <p>
              <!--PHP prints number of new suggestions-->
              <?php
              echo count($suggestions);
              ?> New Suggestions on your Public Notes
            </p>
          </div>
        </div>
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
