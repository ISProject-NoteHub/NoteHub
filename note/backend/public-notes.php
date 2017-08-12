<?php
  if (isset($_POST["decimal"])) { ListPublicNotes($_POST["decimal"]); }

  function ListPublicNotes($decimal) {
    $notes = scandir("../../databases/notes/" . $decimal);
    $notesOut = [];

    for ($i = 2; $i < count($notes); $i++) { $notesOut[$i - 2] = $notes[$i]; }
    echo json_encode($notesOut);
  }

  function WritePublicNote($username, $password, $noteName, $noteContent) {
    
  }
?>