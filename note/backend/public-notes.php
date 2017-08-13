<?php
  if (isset($_POST["decimal"])) { ListPublicNotes($_POST["decimal"]); }

  function ListPublicNotes($decimal, $direct = false) {
    $notes = scandir($_SERVER["DOCUMENT_ROOT"] . "/databases/notes/" . $decimal);
    $notesOut = [];

    for ($i = 2; $i < count($notes); $i++) { $notesOut[$i - 2] = $notes[$i]; }
    
    if ($direct === false) echo json_encode($notesOut);
    else return $notesOut;
  }

  function WritePublicNote($username, $password, $noteName, $noteContent) {
    include("../databases/microdb/Database.php");
    include("../databases/microdb/Cache.php");
    include("../databases/microdb/Event.php");
    include("../databases/microdb/Index.php");

    if (VerifyAccount($username, $password)) {
      $path = $_SERVER['DOCUMENT_ROOT'];
      $path .= "/databases/notes/" . $noteName . " by " . $username . " by .-.0.-.0.txt";
      $write = file_put_contents($path, $noteContent);
      if ($write !== false) { echo "Write successful."; }
      else { echo "Write failed."; }
    }
    else {
      echo "Invalid account.";
    }
  }
?>