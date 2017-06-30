<?php
  $notVisited = false; $incorrect = true;

  if (isset($_COOKIE["signedIn"])) { header("Location: manager-manage.php"); }

  if ((isset($_POST["submitted"])) && ($_POST["username"] !== "") && ($_POST["password"] !== "")) {
    include("../databases/microdb/Database.php");
    include("../databases/microdb/Cache.php");
    include("../databases/microdb/Event.php");
    include("../databases/microdb/Index.php");
    
    include("verify-account.php");

    if (VerifyAccount($_POST["username"], $_POST["password"])) {
      //Cookies
      setcookie("signedIn", base64_encode($_POST["username"] . "," . $_POST["password"]), time() + (86400 * 20), "/");

      //Account manager
      header("Location: manager-manage.php");
    }
    else {
      $incorrect = true;
    }
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
  <title>Sign In | NoteHub</title>

  <link href="/logo-small.png" rel="icon" />
  <link href="/resources/stylesheets/float-labels.css" rel="stylesheet" />
  <link href="/resources/stylesheets/test-styling.css" rel="stylesheet" />
  <link href="/resources/stylesheets/w3.css" rel="stylesheet" />

  <link href="https://fonts.googleapis.com/css?family=Questrial" rel="stylesheet">

  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="Description" content="Sign in to NoteHub from here!">

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
      <span style="float: left; margin: 10px"><img src="/logo.png" id="Page-Logo" /></span>
      <span style="font-weight: lighter;">Note</span><b>Hub</b>
    </a>
    <span id="Page-Name"> | Sign In</span>
  </div>

  <a id="Page-SignIn" href="/accounts/sign-up.php">Sign Up</a>

  <div id="Page-Contents">
    <div class="w3-card w3-panel" id="Page-SignUpBox">
      <h2>Sign In</h2>

      <form method="post">
        <div class="has-float-label">
          <input class="text" name="username" placeholder="Username">
          <label for="username">Username</label>
        </div>

        <div class="has-float-label">
          <input type="password" class="text" name="password" placeholder="Password">
          <label for="username">Password</label>
        </div>

        <input type="hidden" name="submitted" value="submitted" />

        <?php
          if ($notVisited !== true) {
            if ($incorrect === true) {
              echo "<br><span class='ErrorText'>Your username or password is incorrect. Try again.</span>";
            }
          }
        ?>

        <input type="submit" id="Page-SubmitButton" value="Sign In" />
      </form>
    </div>
  </div>
</body>

</html>