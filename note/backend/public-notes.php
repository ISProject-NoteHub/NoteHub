<?php
  if (isset($_POST["decimal"])) { ListPublicNotes($_POST["decimal"]); }
  else if (isset($_POST["vote"])) { Vote($_POST["vote"], $_COOKIE["note"]); }

  function ListPublicNotes($decimal, $direct = false) {
    $notes = scandir($_SERVER["DOCUMENT_ROOT"] . "/databases/notes/" . $decimal);
    $notesOut = [];

    for ($i = 2; $i < count($notes); $i++) { $notesOut[$i - 2] = $notes[$i]; }
    
    if ($direct === false) echo json_encode($notesOut);
    else return $notesOut;
  }

  function Vote($upOrDown, $note) {
    $upOrDown = (int)$upOrDown;
    $thing = trim(explode(".-.", str_replace(".txt", "", explode("by", $note)[2]))[0]) + 1;
    $newLikes = trim(explode(".-.", str_replace(".txt", "", explode("by", $note)[2]))[1]);
    $newDislikes = trim(explode(".-.", str_replace(".txt", "", explode("by", $note)[2]))[2]);

    if ($upOrDown == 2) { $newLikes = trim(explode(".-.", str_replace(".txt", "", explode("by", $note)[2]))[1]) + 1; }
    else if ($upOrDown == 3) { $newDislikes = trim(explode(".-.", str_replace(".txt", "", explode("by", $note)[2]))[2]) + 1; }
      
    rename(
      $_SERVER['DOCUMENT_ROOT'] . "/databases/notes/" . explode("/", $note)[0] .
      "/" . explode("by", explode("/", $note)[1])[0] .
      "by" . explode("by", explode("/", $note)[1])[1] .
      "by " . $thing .
      ".-." . trim(explode(".-.", str_replace(".txt", "", explode("by", $note)[2]))[1]) .
      ".-." . trim(explode(".-.", str_replace(".txt", "", explode("by", $note)[2]))[2]) . ".txt",
      $_SERVER['DOCUMENT_ROOT'] . "/databases/notes/" . explode("/", $note)[0] .
      "/" . explode("by", explode("/", $note)[1])[0] .
      "by" . explode("by", explode("/", $note)[1])[1] .
      "by " . $thing .
      ".-." . $newLikes .
      ".-." . $newDislikes . ".txt"
    );
  }

  function WritePublicNote($username, $password, $noteName, $noteContent) {
    include("../databases/microdb/Database.php");
    include("../databases/microdb/Cache.php");
    include("../databases/microdb/Event.php");
    include("../databases/microdb/Index.php");

    if (VerifyAccount($username, $password)) {
      $path = $_SERVER['DOCUMENT_ROOT'];
      $path .= "/databases/notes/" . $noteName . " by " . $username . " by 0.-.0.-.0.txt";
      $write = file_put_contents($path, $noteContent);
      if ($write !== false) { echo "Write successful."; }
      else { echo "Write failed."; }
    }
    else {
      echo "Invalid account.";
    }
  }
?>