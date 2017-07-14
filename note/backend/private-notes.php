<?php
  include("../accounts/verify-account.php");

  function ListPrivateNotes($username, $password) {
    if (VerifyAccount($username, $password)) {
      $notes = scandir("../databases/notes/private-notes/" . $username);
      $notesOutput = array();
      
      for ($i = 2; $i < count($notes); $i++) {
        $notesOutput[$i - 2] = str_replace(".txt", "", $notes[$i]);
      }

      return $notesOutput;
    }
    else {
      return false;
    }
  }
?>