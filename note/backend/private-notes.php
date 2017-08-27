<?php
  $path = $_SERVER['DOCUMENT_ROOT'];
  $path .= "/accounts/verify-account.php";
  include($path);

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

  function TrashPrivateNote($username, $password, $noteName) {
    if (VerifyAccount($username, $password)) {
      $write = unlink($_SERVER['DOCUMENT_ROOT'] . "/databases/notes/private-notes/" . $username . "/" . $noteName . ".txt");
      if ($write !== false) return true;
      else return false;
    }
  }

  function WritePrivateNote($username, $password, $noteName, $noteContent) {
    include("../databases/microdb/Database.php");
    include("../databases/microdb/Cache.php");
    include("../databases/microdb/Event.php");
    include("../databases/microdb/Index.php");

    if (VerifyAccount($username, $password)) {
      $write = file_put_contents($_SERVER['DOCUMENT_ROOT'] . "/databases/notes/private-notes/" . $username . "/" . $noteName . ".txt", $noteContent);
      if ($write !== false) { echo "Write successful."; }
      else { echo "Write failed."; }
    }
    else {
      echo "Invalid account.";
    }
  }
?>