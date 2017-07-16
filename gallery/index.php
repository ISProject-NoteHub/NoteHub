<!DOCTYPE html>
<html>
<head>
  <title>Gallery | NoteHub</title>

  <link href="../logo.png" rel="icon" />
  <link href="./gallery-styling.css" rel="stylesheet" />
  <link href="/resources/stylesheets/test-styling.css" rel="stylesheet" />

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

  <a style="line-height: 1.5;" id="Page-SignIn" href="/accounts/sign-in.php">Sign In</a>

  <div id="Page-Contents">
    <label style="font-size: 28px;" id="SignedInContent-Welcome">Welcome to the NoteHub Gallery!</label>
    <!--Top picks, based on likes-->
    <label class="SectionHead">Recommended for You</label>

    <div class="SectionContents">
      <div class="Note">
        <div class="Note-Image">
          World War I - A Brief Introduction
          <br><br><span style="font-size: 14px;">by historymvc</span>
        </div>
        <div class="Note-Details">
          World War I - A Brief Introduction
        </div>
        <div class="Note-Author">By historymvc</div>
        <div class="Note-Stats">
          <div class="Note-Likes">Over 9000</div>
          <div class="Note-Dislikes">10</div>
        </div>
      </div>
    </div>

    <!--Recommendations-->
    <label class="SectionHead">Try Something New!</label>
    
    <div class="SectionContents">
      <div class="Note">
        <div class="Note-Image">
          World War I - A Brief Introduction
          <br><br><span style="font-size: 14px;">by historymvc</span>
        </div>
        <div class="Note-Details">
          World War I - A Brief Introduction
        </div>
        <div class="Note-Author">By historymvc</div>
        <div class="Note-Stats">
          <div class="Note-Likes">Over 9000</div>
          <div class="Note-Dislikes">10</div>
        </div>
      </div>
    </div>
  </div>
</body>
</html>
