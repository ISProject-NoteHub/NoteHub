<?php
  setcookie("signedIn", "", time() - (86400 * 20), "../");
?>
<!--HTML document begins here-->
<!DOCTYPE html>
<html>

<head>
  <title>Sign Up | NoteHub</title>

  <link href="../logo-small.png" rel="icon" />
  <link href="../resources/stylesheets/float-labels.css" rel="stylesheet" />
  <link href="../resources/stylesheets/test-styling.css" rel="stylesheet" />
  <link href="../resources/stylesheets/w3.css" rel="stylesheet" />

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
    <a href="../" style="color: white; text-decoration: none;">
      <span style="float: left; margin: 10px"><img src="../logo-small.png" id="Page-Logo" /></span>
      <span style="font-weight: lighter;">Note</span><b>Hub</b>
    </a>
    <span id="Page-Name"> | Sign Out</span>
  </div>

  <a id="Page-SignIn" href="../accounts/sign-in.php">Sign In</a>

  <div id="Page-Contents">
    <div class="w3-card w3-panel" id="Page-SignUpBox">
      <h2>Sign Out</h2>
      <p>You have been signed out of NoteHub successfully.</p>
    </div>
  </div>
</body>

</html>