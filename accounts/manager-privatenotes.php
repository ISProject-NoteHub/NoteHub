<!DOCTYPE html>
<html>
<head>
  <title>Gallery | NoteHub</title>

  <link href="../logo.png" rel="icon" />
  <link href="/gallery/gallery-styling.css" rel="stylesheet" />
  <link href="/resources/stylesheets/test-styling.css" rel="stylesheet" />
  <link href="/resources/stylesheets/w3.css" rel="stylesheet" />

  <link href="https://fonts.googleapis.com/css?family=Questrial" rel="stylesheet">

  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="Description" content="Welcome to the NoteHub gallery, which showcases the best of NoteHub's notes.">
</head>

<body>
  <div id="Page-TitleBar">
    <a href="/" style="color: white; text-decoration: none;">
      <span style="float: left; margin: 10px"><img src="/logo.png" id="Page-Logo" /></span>
      <span style="font-weight: lighter;">Note</span><b>Hub</b>
    </a>
  </div>

  <a style="line-height: 1.5;" id="Page-SignIn" href="/accounts/manager-manage.php"><?php echo explode(",", base64_decode($_COOKIE["signedIn"]))[0]; ?></a>

  <div id="Page-Contents" class="w3-main w3-animate-bottom">
    <h1>Your Private Notebooks</h1>
    <!--Top picks, based on likes-->
    <div class="w3-card w3-border-blue w3-container">
      <div class="SectionContents">
        <?php
          //Get private notebooks
          include("../databases/microdb/Database.php");
          include("../databases/microdb/Cache.php");
          include("../databases/microdb/Event.php");
          include("../databases/microdb/Index.php");
          include("../note/backend/private-notes.php");
          $privateNotes = ListPrivateNotes(explode(",", base64_decode($_COOKIE["signedIn"]))[0], explode(",", base64_decode($_COOKIE["signedIn"]))[1]);

          if (empty($privateNotes)) { echo "<div class='w3-button w3-large' style='width: 100%; background-color: transparent;'>You don't seem to have any private notes yet.<br>&#xAF;\\_(&#x30C4;)_/&#xAF;</div>"; }
          else {
            for ($i = 0; $i < count($privateNotes); $i++) {
              echo '<a class="Note" style="color: black !important;" href="../note/index.php?note=' . $privateNotes[$i] . '&private=true">
                <div class="Note-Image">
                  ' . $privateNotes[$i] . '
                  <br><br><span style="font-size: 14px;">by ' . explode(",", base64_decode($_COOKIE["signedIn"]))[0] . '</span>
                </div>
                <div class="Note-Details">
                  ' . $privateNotes[$i] . '
                </div>
                <div class="Note-Author">By ' . explode(",", base64_decode($_COOKIE["signedIn"]))[0] . '</div>
              </a>';
            }
          }
        ?>
      </div>
    </div>
  </div>
</body>
</html>
