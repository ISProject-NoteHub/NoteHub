<!DOCTYPE html>
<html>
<head>
  <title>Gallery | NoteHub</title>

  <link href="../logo.png" rel="icon" />
  <link href="./gallery-styling.css" rel="stylesheet" />
  <link href="/resources/stylesheets/test-styling.css" rel="stylesheet" />
  <link href="/resources/stylesheets/w3.css" rel="stylesheet" />

  <link href="https://fonts.googleapis.com/css?family=Questrial" rel="stylesheet">

  <script src="https://use.fontawesome.com/3e1c5661b6.js"></script>

  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="Description" content="Welcome to the NoteHub gallery, which showcases the best of NoteHub's notes.">
</head>

<body>
  <div id="Page-TitleBar">
    <a href="/" style="color: white; text-decoration: none;">
      <span style="float: left; margin: 10px"><img src="/logo.png" id="Page-Logo" /></span>
      <span style="font-weight: lighter;">Note</span><b>Hub</b>
    </a>
    <span id="Page-Name"> | Gallery</span>
  </div>

  <a style="line-height: 1.5;" id="Page-SignIn" href="/accounts/sign-in.php"><?php
    if (isset($_COOKIE["signedIn"])) echo explode(",", base64_decode($_COOKIE["signedIn"]))[0];
    else echo "Sign In";
  ?></a>

  <div id="Page-Contents" class="w3-animate-bottom" style="padding: 20px;">
    <form class="w3-padding w3-row">
      <div class="w3-col" style="width: 110px;">
        <button type="submit" class="w3-button w3-blue"><i class="fa fa-search"></i>&nbsp;&nbsp;Search</button>
      </div>
      <div class="w3-rest">
        <input name="query" class="w3-input w3-border" />
      </div>
    </form>

    <div class="w3-row">
      <div class="w3-half w3-padding">
        <!--Random Topic-->
        <div class="w3-card w3-border-blue w3-container w3-margin-bottom">
          <h2 class="SectionHead">
            Random Topic - <?php
              $availableTopics = array(111, 100, 200, 300, 500);
              $topic = $availableTopics[mt_rand(0, 4)];

              echo file_get_contents("../databases/notes/" . $topic . "/label.txt");
            ?>
            <a class="fa fa-refresh w3-button" href="index.php" style="float: right;"></a>
          </h2>
          
          <div class="SectionContents" style="min-height: 407px;">
            <?php
              include("../note/backend/public-notes.php");
              
              $privateNotes = ListPublicNotes($topic, true);

              if (count($privateNotes) == 1) { echo "<div class='w3-button w3-large w3-block' style='background-color: transparent;'>This topic doesn't have any notes yet.<br>Why not be the first to <a href='/note'>add one</a>?</div>"; }
              else {
                for ($i = 0; $i < count($privateNotes); $i++) {
                  if ($privateNotes[$i] !== "label.txt") {
                    echo '<a class="Note" style="color: black !important;" href="../note/index.php?note=' . $topic . '/' . str_replace(".txt", "", $privateNotes[$i]) . '&private=false">
                      <div class="Note-Image">
                        ' . explode("by", $privateNotes[$i])[0] . '
                        <br><br><span style="font-size: 14px;">by ' . explode("by", $privateNotes[$i])[1] . '</span>
                      </div>
                      <div class="Note-Details">
                        ' . explode("by", $privateNotes[$i])[0] . '
                      </div>
                      <div class="Note-Author">By ' . explode("by", $privateNotes[$i])[1] . '</div>
                    </a>';
                  }
                }
              }
            ?>
          </div>
        </div>
      </div>

      <div class="w3-half w3-padding">
        <!--Just a simple Bubble-Sort-->
        <div class="w3-card w3-border-blue w3-container w3-margin-bottom">
          <h2 class="SectionHead">Top Notes</h2>
          
          <div class="SectionContents">
            <a class="Note" href="/help">
              <div class="Note-Image">
                NoteHub - Help Menu
                <br><br><span style="font-size: 14px;">by TastyFriesAloy</span>
              </div>
              <div class="Note-Details">
                NoteHub - Help Menu
              </div>
              <div class="Note-Author">By TastyFriesAloy</div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</body>
</html>
