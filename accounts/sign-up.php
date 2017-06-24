<?php
  $notVisited = false; $tooShort = false; $illigalChars = false; $particularsMissing = false; $usernameTaken = false;

  if (isset($_COOKIE["signedIn"])) { header("Location: manager-manage.php"); }

  if ((isset($_POST["submitted"])) && ($_POST["username"] !== "") && ($_POST["password"] !== "") && ($_POST["email"] !== "")) {
    if (preg_match('/[^a-zA-Z]+/', $_POST["username"])) { $illigalChars = true; }
    else if (strlen($_POST["username"]) < 8) { $tooShort = true; }
    else {
      include("../databases/microdb/Database.php");
      include("../databases/microdb/Cache.php");
      include("../databases/microdb/Event.php");
      include("../databases/microdb/Index.php");

      //Update database
      $db = new \MicroDB\Database("../databases/accounts");

      $accountData = $db -> load(1);
      $accounts = count($accountData);
      
      //Check username
      for ($i = 0; $i < $accounts; $i++) {
        if (($accountData[$i][0] == $_POST["username"]) && ($accountData[$i][5] == "active"))  { $usernameTaken = true; }

        if (($i == ($accounts - 1)) && ($usernameTaken == false)) {
          $accountData[$accounts] = array($_POST["username"], password_hash($_POST["password"], PASSWORD_DEFAULT), $_POST["email"], [], [], "active");
          $db -> save(1, $accountData);

          //Cookies
          setcookie("signedIn", base64_encode($_POST["username"] . "," . $_POST["password"]), time() + (86400 * 20), "/");

          //Account manager
          mkdir("../databases/notes/private-notes/" . $_POST["username"]);
          header("Location: manager-manage.php");
        }
      }
    }
  }
  else if (isset($_POST["submitted"])) {
    $particularsMissing = true;
  }
  else {
    //Display page as sign-up page
    $notVisited = true;
  }
?>
<!--HTML document begins here-->
<!DOCTYPE html>
<html>

<head>
  <title>Sign Up | NoteHub</title>

  <link href="/logo-small.png" rel="icon" />
  <link href="/resources/stylesheets/float-labels.css" rel="stylesheet" />
  <link href="/resources/stylesheets/test-styling.css" rel="stylesheet" />
  <link href="/resources/stylesheets/w3.css" rel="stylesheet" />

  <link href="https://fonts.googleapis.com/css?family=Questrial" rel="stylesheet">

  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="Description" content="Sign up for NoteHub to access a wealth of features!">

  <style>
    @media screen and (max-width: 540px) {
      #Page-SignUpBox {
        padding: 20px;
        margin-left: 5%; margin-right: 5%;
      }
    }
    
    @media screen and (min-width: 541px) {
      #Page-SignUpBox {
        width: calc(50% - 40px);
        padding: 20px;
        margin-left: 25%; margin-right: 25%;
      }
    }

    #Page-SubmitButton {
      text-align: center;
      width: 100%;
      font-size: 1em;
      padding: 10px;
      border: 0;
      background-color: mediumseagreen; color: white;
      margin-top: 20px;
      cursor: pointer;
    }
  </style>
</head>

<body>
  <div id="Page-TitleBar">
    <a href="/" style="color: white; text-decoration: none;">
      <span style="float: left; margin: 10px"><img src="/logo-small.png" id="Page-Logo" /></span>
      <span style="font-weight: lighter;">Note</span><b>Hub</b>
    </a>
    <span id="Page-Name"> | Sign Up</span>
  </div>

  <a id="Page-SignIn" href="/accounts/sign-in.php">Sign In</a>

  <div id="Page-Contents">
    <div class="w3-card w3-panel" id="Page-SignUpBox">
      <h2>Sign Up</h2>

      <form method="post">
        <div class="has-float-label">
          <input class="text" name="username" placeholder="Username">
          <label for="username">Username</label>
        </div>

        <div class="has-float-label">
          <input class="text" name="email" placeholder="Email">
          <label for="username">Email</label>
        </div>

        <div class="has-float-label">
          <input type="password" class="text" name="password" placeholder="Password">
          <label for="username">Password</label>
        </div>

        <input type="hidden" name="submitted" value="submitted" />

        <?php
          if ($notVisited !== true) {
            if ($particularsMissing === true) {
              echo "<br><span class='ErrorText'>We can't create your account as you're missing some information. Fill it in and try again.</span>";
            }

            if ($usernameTaken === true) {
              echo "<br><span class='ErrorText'>We can't create your account as your username has already been taken. Please use a different username.</span>";
            }

            if ($illigalChars === true) {
              echo "<br><span class='ErrorText'>We can't create your account as your username contains special characters. Please use a different username.</span>";
            }

            if ($tooShort === true) {
              echo "<br><span class='ErrorText'>We can't create your account as your username is too short. Please use a different username with at least 8 characters.</span>";
            }
          }
        ?>

        <input type="submit" id="Page-SubmitButton" value="Sign Up" />
      </form>
    </div>
  </div>
</body>

</html>