<?php
  $suggestions = []; $incorrect = false;

  if (!isset($_COOKIE["signedIn"])) { header("Location: sign-in.php"); }
  else { 
    include("../databases/microdb/Database.php");
    include("../databases/microdb/Cache.php");
    include("../databases/microdb/Event.php");
    include("../databases/microdb/Index.php");
  }
?>
<!--HTML document begins here-->
<!DOCTYPE html>
<html>
<head>
  <title>Account Security | NoteHub</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <link href="/logo-small.png" rel="icon" />
  <link href="/resources/stylesheets/float-labels.css" rel="stylesheet" />
  <link href="/resources/stylesheets/w3.css" rel="stylesheet" />
  <link href="/resources/stylesheets/editor-styling.css" rel="stylesheet" />
  <link href="/resources/stylesheets/test-styling.css" rel="stylesheet"/>
  <link href="/gallery/gallery-styling.css" rel="stylesheet"/>

  <link href="https://fonts.googleapis.com/css?family=Questrial" rel="stylesheet">

  <style>
    .submit-button { margin-top: 20px; }
    .account-option { padding: 15px; margin-top: 15px; }
    .secure-account { margin-left: 10px; }

    #Page-Name { display: inline !important; }
  </style>

  <script src="https://use.fontawesome.com/3e1c5661b6.js"></script>
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
    <a href="manager-security.php" class="w3-bar-item w3-button w3-grey"><i class="fa fa-fw fa-shield" aria-hidden="true"></i>&nbsp;&nbsp;Account Security</a>
    <a href="manager-details.php" class="w3-bar-item w3-button"><i class="fa fa-fw fa-address-card" aria-hidden="true"></i>&nbsp;&nbsp;Account Details</a>
    <hr>
    <a href="/gallery" class="w3-bar-item w3-button"><i class="fa fa-fw fa-picture-o" aria-hidden="true"></i>&nbsp;&nbsp;NoteHub Gallery</a>
    <a href="manager-privatenotes.php" class="w3-bar-item w3-button"><i class="fa fa-fw fa-folder" aria-hidden="true"></i>&nbsp;&nbsp;Note Manager</a>
    <a href="/note" class="w3-bar-item w3-button"><i class="fa fa-fw fa-file" aria-hidden="true"></i>&nbsp;&nbsp;New Note</a>
    <hr>
    <a href="sign-out.php" class="w3-bar-item w3-button"><i class="fa fa-fw fa-sign-out" aria-hidden="true"></i>&nbsp;&nbsp;Sign Out</a>
  </div>

  <div class="w3-main" style="margin-left: 200px">
    <div class="w3-container" id="App-TitleBar">
      <button class="w3-button w3-xlarge w3-hide-large" onclick="OpenAppMenu();">&#9776;</button>

      <a href="/" style="color: white; text-decoration: none; font-size: 24px;">
        <span style="font-weight: lighter;">Note</span><b>Hub</b>
      </a>
      <span id="Page-Name"> | Account Security</span>
    </div>

    <div class="w3-container w3-padding">
      <!--Equivalent of the old #Editor-->
      <div style="margin-top: 52px;"></div>
      
      <div class="account-option w3-card">
        <h5>Recent Logins</h5>

        <input type="button" value="View Older Logins" class="w3-button w3-card w3-teal w3-round-large"/>
        <input type="button" value="Secure Account" class="w3-button w3-card w3-red w3-round-large secure-account"/>
      </div>

      <form method="post" class="account-option w3-card">
        <h5>Change Password</h5>

        <div class="has-float-label">
          <input type="password" class="text" name="oldpassword" placeholder="Old Password">
          <label for="username">Old Password</label>
        </div>

        <div class="has-float-label">
          <input type="password" class="text" name="newpassword" placeholder="New Password">
          <label for="username">New Password</label>
        </div>

        <div class="has-float-label">
          <input type="password" class="text" name="password" placeholder="New Password (again)">
          <label for="username">New Password (again)</label>
        </div>
        <input type="hidden" name="action" value="password" />

        <?php
          if (isset($_POST["action"])) {
            if ($_POST["action"] == "password") {
              include("verify-account.php");

              if (VerifyAccount(explode(",", base64_decode($_COOKIE["signedIn"]))[0], $_POST["oldpassword"]) === false) { echo "<div class=\"ErrorText\">Your old password is incorrect. Please try again.</div>"; $incorrect = true; }
              else if ($_POST["newpassword"] !== $_POST["password"]) { echo "<div class=\"ErrorText\">Your new passwords don't match. Please try again.</div>"; $incorrect = true; }
              else if ($_POST["password"] == "") { echo "<div class=\"ErrorText\">You didn't input your new password. Please try again.</div>"; $incorrect = true; }
              else {
                //Set le new password
                $db = new \MicroDB\Database("../databases/accounts");

                $accountData = $db -> load(1);
                $accounts = count($accountData);

                for ($i = 0; $i < $accounts; $i++) {
                  if (($accountData[$i][0] == explode(",", base64_decode($_COOKIE["signedIn"]))[0]) && password_verify(explode(",", base64_decode($_COOKIE["signedIn"]))[1], $accountData[$i][1])) {
                    setcookie("signedIn", base64_encode(explode(",", base64_decode($_COOKIE["signedIn"]))[0] . "," . $_POST["password"]), time() + (86400 * 20), "/", "notehub.ga");
                    $accountData[$i][1] = password_hash($_POST["password"], PASSWORD_DEFAULT);
                    $db -> save(1, $accountData);
                  }
                }
              }
            }
          }
        ?>

        <input type="submit" class="w3-button w3-card w3-blue w3-round-large submit-button" />
      </form>
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