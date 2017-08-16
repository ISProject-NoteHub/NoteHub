<?php
  include("microdb/Database.php");
  include("microdb/Cache.php");
  include("microdb/Event.php");
  include("microdb/Index.php");

  $db = new \MicroDB\Database("../databases/accounts");

  $accountData = $db -> load(1);
  $accounts = count($accountData);

  $folders = scandir("notes/private-notes/");

  for ($i = 0; $i < $accounts; $i++) {
    for ($a = 0; $a < count($folders); $a++) {
      if ($accountData[$i][0] !== $folders[$a]) { mkdir("notes/private-notes/" . $accountData[$i][0]); }
    }
  }
?>