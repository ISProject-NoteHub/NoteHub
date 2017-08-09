<?php
  function ListPrivateNotes($user) { return json_encode(scandir("../databases/notes/private-notes/" . $user)); }
?>