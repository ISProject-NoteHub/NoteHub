<?php
  if (isset($_POST["action"])) {
    if ($_POST["action"] == "WriteNote") { WriteNote(); }
  }

  function WriteNote() {
    if ($_POST["saveas"] == "true") {
      //Write to notes map
      //$notesMap = json_decode(file_get_contents("../../databases/notes/notes-map.json"));

      //Write to note
      file_put_contents("../../" . $_POST["notename"] . ".txt", $_POST["note"]);
    }
  }
?>