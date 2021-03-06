<?php
  $suggestions = []; $contributions = 0;

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
      if (($accountData[$i][0] == explode(",", base64_decode($_COOKIE["signedIn"]))[0]) && password_verify(explode(",", base64_decode($_COOKIE["signedIn"]))[1], $accountData[$i][1])) {
        if ($accountData[$i][6] == "active") { header("Location: manager-welcome.php"); }
        
        $suggestions = $accountData[$i][4];
        $following = $accountData[$i][5];
        $contributions = $accountData[$i][3];
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
  <link href="/resources/stylesheets/test-styling.css" rel="stylesheet"/>
  <link href="/gallery/gallery-styling.css" rel="stylesheet"/>

  <link href="https://fonts.googleapis.com/css?family=Questrial" rel="stylesheet">

  <script src="https://use.fontawesome.com/3e1c5661b6.js"></script>

  <style>
    .stat { height: 120px;}
  </style>

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
        <i class="fa fa-fw fa-user-circle-o" aria-hidden="true"></i>&nbsp;&nbsp;
        Welcome, <?php echo explode(",", base64_decode($_COOKIE["signedIn"]))[0]; ?>!
      </h5>
    </div>

    <a href="manager-manage.php" class="w3-bar-item w3-button w3-grey"><i class="fa fa-fw fa-user" aria-hidden="true"></i>&nbsp;&nbsp;Account Home</a>
    <a href="manager-security.php" class="w3-bar-item w3-button"><i class="fa fa-fw fa-shield" aria-hidden="true"></i>&nbsp;&nbsp;Account Security</a>
    <a href="manager-details.php" class="w3-bar-item w3-button"><i class="fa fa-fw fa-address-card" aria-hidden="true"></i>&nbsp;&nbsp;Account Details</a>
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
      <span id="Page-Name"> | Account Home</span>
    </div>

    <div class="w3-container w3-padding">
      <!--Equivalent of the old #Editor-->
      <div style="margin-top: 52px;"></div>

      <div class="w3-container w3-card account-option account-option-first">
        <h2>Quick Stats</h2>
        <!--PHP prints the number of private notes and suggestions-->
        <div class="w3-row-padding" style="margin-left: -16px; margin-top: 7.5px;">
          <div class="w3-quarter">
            <div class="w3-card w3-container w3-green w3-margin-bottom stat">
              <p>
                <span style="font-size:26px;"><?php
                  echo $contributions;
                ?></span><br><?php
                  if ($contributions == 1) {
                    print("Contribution");
                  } else {
                    print("Contrbutions");
                  }
                ?><br>
              </p>
            </div>
          </div>
          <div class="w3-quarter">
            <div class="w3-card w3-container w3-teal w3-margin-bottom stat">
              <p>
                <span style="font-size:26px;"><?php
                  echo count(ListPrivateNotes(explode(",", base64_decode($_COOKIE["signedIn"]))[0], explode(",", base64_decode($_COOKIE["signedIn"]))[1]));
                ?></span><br><?php
                  if (count(ListPrivateNotes(explode(",", base64_decode($_COOKIE["signedIn"]))[0], explode(",", base64_decode($_COOKIE["signedIn"]))[1])) == 1) {
                    print("Private Note");
                  } else {
                    print("Private Notes");
                  }
                ?><br>
              </p>
            </div>
          </div>
          <div class="w3-quarter">
            <a style="display: block; text-decoration: none;" class="w3-card-2 w3-container w3-blue w3-margin-bottom stat" href="manage-suggestions.php">
              <p>
                <span style="font-size:26px;"><?php
                  echo count($suggestions);
                ?></span><br>New Suggestions on your Public Notes
              </p>
            </a>
          </div>
          <div class="w3-quarter">
            <div class="w3-card-2 w3-container w3-purple w3-margin-bottom stat">
              <p>
                You are following<br><span style="font-size:26px;"><?php
                  echo count($following);
                ?></span><br>topics
              </p>
            </div>
          </div>
        </div>
      </div>

      <!--Help Menu-->
      <div class="w3-container w3-card account-option">
        <h2>Help Menu</h2>
        
        <div class="w3-row-padding" style="margin-left: -16px; margin-top: 7.5px;">
          <div class="w3-third">
            <div class="w3-card w3-container w3-green w3-margin-bottom">
              <a href="../help" style="text-decoration: none; color: white !important;"><span style="font-size: 18px; margin: 0px;" class="w3-container">Getting Started with NoteHub</span><br></a>
            </div>
          </div>
          <div class="w3-third">
            <div class="w3-card-2 w3-container w3-light-grey w3-margin-bottom">
              <!--PHP prints number of new suggestions-->
              <a href="../help/gallery.php" style="text-decoration: none; color: black !important;"><span style="font-size: 18px; margin: 0px;" class="w3-container">Navigating the NoteHub Gallery</span><br></a>
            </div>
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
