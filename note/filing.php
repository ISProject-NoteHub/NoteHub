<?php
  include("backend/public-notes.php");
  include("backend/private-notes.php");
  //include("../accounts/verify-account.php");

  if (!empty($_POST["owner"])) {
    include("../databases/microdb/Database.php");
    include("../databases/microdb/Cache.php");
    include("../databases/microdb/Event.php");
    include("../databases/microdb/Index.php");

    //Update database
    $db = new \MicroDB\Database("../databases/accounts");

    $accountData = $db -> load(1);
    $accounts = count($accountData);

    if (VerifyAccount($_POST["username"], $_POST["password"])) {
      for ($i = 0; $i < $accounts; $i++) {
        if ($accountData[$i][0] == $_POST["owner"]) {
          $accountData[$i][4][count($accountData[$i][4])] = array($_POST["username"], $_POST["noteName"], $_POST["noteContent"]);
          $db -> save(1, $accountData);
          echo "Write successful.";
        }
      }
    }
  }
  else if (!empty($_POST["noteName"])) {
    if ($_POST["private"] == "true") {
      $writeResult = WritePrivateNote($_POST["username"], $_POST["password"], $_POST["noteName"], $_POST["noteContent"]);
      return $writeResult;
    }
    else {
      $writeResult = WritePublicNote($_POST["username"], $_POST["password"], $_POST["noteName"], $_POST["noteContent"]);
      return $writeResult;
    }
  }
  else {
    include("../databases/microdb/Database.php");
    include("../databases/microdb/Cache.php");
    include("../databases/microdb/Event.php");
    include("../databases/microdb/Index.php");

    //Update database
    $db = new \MicroDB\Database("../databases/accounts");

    $accountData = $db -> load(1);
    $accounts = count($accountData);

    if (VerifyAccount($_POST["username"], $_POST["password"])) {
      for ($i = 0; $i < $accounts; $i++) {
        if ($accountData[$i][0] == $_POST["username"]) {
          $accountData[$i][3] = (int)$accountData[$i][3] + 1;
          $db -> save(1, $accountData);
        }
      }
    }
  }
?>