<?php
  function VerifyAccount($username, $password) {
    $incorrect = true;

    //Update database
    $db = new \MicroDB\Database("gs://yournotehub.appspot.com/databases/accounts");

    $accountData = $db -> load(1);
    $accounts = count($accountData);

    for ($i = 0; $i < $accounts; $i++) {
      if (($accountData[$i][0] == $username) && password_verify($password, $accountData[$i][1])) {
        $incorrect = false;
        return true;
      }

      if (($i == ($accounts - 1)) && ($incorrect == true)) { return false; }
    }
  }
?>