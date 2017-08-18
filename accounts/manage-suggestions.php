<?php
  $suggestions = [];

  if (!isset($_COOKIE["signedIn"])) { header("Location: sign-in.php"); }
?>
<!--HTML document begins here-->
<!DOCTYPE html>
<html>
<head>
  <title>Suggestions | NoteHub</title>
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
      <span id="Page-Name"> | Suggestions</span>
    </div>

    <div class="w3-container w3-padding w3-border-blue">
      <!--Equivalent of the old #Editor-->
      <div style="margin-top: 52px;"></div>
      
      <?php
        include("../databases/microdb/Database.php");
        include("../databases/microdb/Cache.php");
        include("../databases/microdb/Event.php");
        include("../databases/microdb/Index.php");

        if (empty($_GET["suggestion"])) {
          //Get list of suggestions
          $db = new \MicroDB\Database("../databases/accounts");

          $accountData = $db -> load(1);
          $accounts = count($accountData);

          for ($i = 0; $i < $accounts; $i++) {
            if ($accountData[$i][0] == explode(",", base64_decode($_COOKIE["signedIn"]))[0]) {
              if (count($accountData[$i][4]) == 0) {
                echo "<div class='w3-card w3-padding'>No one's suggested on your public notes yet.</div>";
              }
              
              for ($a = 0; $a < count($accountData[$i][4]); $a++) {
                echo "<div class='w3-card w3-padding'><h4>" . $accountData[$i][4][$a][0] . " suggested changes to " . $accountData[$i][4][$a][1] . "</h4><a href='manage-suggestions.php?suggestion=" . $a . "'>View Suggestion</a></div>";
              }
            }
          }
        }
        else {
          //Show suggestion and mechanism to accept
        }
      ?>
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
