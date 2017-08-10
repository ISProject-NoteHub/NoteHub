<?php
  include("backend/private-notes.php");
  $writeResult = WritePrivateNote($_POST["username"], $_POST["password"], $_POST["noteName"], $_POST["noteContent"]);
  return $writeResult;
?>