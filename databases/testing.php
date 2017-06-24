<?php
  include("microdb/Database.php");
  include("microdb/Cache.php");
  include("microdb/Event.php");
  include("microdb/Index.php");

  $db = new \MicroDB\Database("accounts");

  print_r($db -> load(1));
?>