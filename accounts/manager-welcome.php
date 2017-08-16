<?php
  if (!isset($_COOKIE["signedIn"])) { header("Location: sign-in.php"); }
?>
<!--HTML document begins here-->
<!DOCTYPE html>
<html>
  <head>
    <title>Welcome | NoteHub</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <link href="/logo-small.png" rel="icon" />
    <link href="/resources/stylesheets/w3.css" rel="stylesheet" />
    <link href="/resources/stylesheets/editor-styling.css" rel="stylesheet" />
  </head>

  <body>
    <style> * { overflow: hidden; } </style>

    <div>
      <svg viewbox="0 0 1600 900" class="mySlides" style="width: 100%; height: 100%;">
        <image xlink:href="resources/background.png" width="1600" height="900" />
        <rect fill="black" opacity="0.8" width="1600" height="900" />
        <image xlink:href="/logo.png" width="400" height="400" x="600" y="250" />

        <text alignment-baseline="middle" text-anchor="middle" x="800" y="150" fill="white" style="font-size: 72px;">
          Welcome to NoteHub, <?php echo explode(",", base64_decode($_COOKIE["signedIn"]))[0]; ?>!
        </text>

        <text alignment-baseline="middle" text-anchor="middle" x="800" y="700" fill="white" style="font-size: 48px;">
          We're happy to have you here
        </text>
      </svg>

      <svg viewbox="0 0 1600 900" class="mySlides" style="width: 100%; height: 100%;">
        <image xlink:href="resources/background.png" width="1600" height="900" />
        <rect fill="black" opacity="0.8" width="1600" height="900" />
        <image xlink:href="/logo.png" width="400" height="400" x="600" y="250" />

        <text alignment-baseline="middle" text-anchor="middle" x="800" y="150" fill="white" style="font-size: 72px;">
          Explore a wealth of notes in our gallery
        </text>

        <text alignment-baseline="middle" text-anchor="middle" x="800" y="700" fill="white" style="font-size: 48px;">
          <a style="text-decoration: underline; cursor: pointer;" xlink:target="_blank" xlink:href="/gallery">https://notehub.ga/gallery</a>
        </text>
      </svg>

      <svg viewbox="0 0 1600 900" class="mySlides" style="width: 100%; height: 100%;">
        <image xlink:href="resources/background.png" width="1600" height="900" />
        <rect fill="black" opacity="0.8" width="1600" height="900" />
        <image xlink:href="resources/background.png" width="800" height="450" x="400" y="200" />

        <text alignment-baseline="middle" text-anchor="middle" x="800" y="150" fill="white" style="font-size: 72px;">
          Suggest on notebooks in our editor
        </text>

        <text alignment-baseline="middle" text-anchor="middle" x="800" y="700" fill="white" style="font-size: 48px;">
          Correct each others' mistakes and learn, at the same time
        </text>
      </svg>

      <svg viewbox="0 0 1600 900" class="mySlides" style="width: 100%; height: 100%;">
        <image xlink:href="resources/background.png" width="1600" height="900" />
        <rect fill="black" opacity="0.8" width="1600" height="900" />
        <image xlink:href="resources/share.png" width="800" height="450" x="400" y="200" />

        <text alignment-baseline="middle" text-anchor="middle" x="800" y="150" fill="white" style="font-size: 72px;">
          Invite Collaborators with a simple link
        </text>

        <text alignment-baseline="middle" text-anchor="middle" x="800" y="700" fill="white" style="font-size: 48px;">
          Work on private notes together
        </text>
      </svg>

      <svg viewbox="0 0 1600 900" class="mySlides" style="width: 100%; height: 100%;">
        <image xlink:href="resources/background.png" width="1600" height="900" />
        <rect fill="black" opacity="0.8" width="1600" height="900" />

        <text alignment-baseline="middle" text-anchor="middle" x="800" y="350" fill="white" style="font-size: 72px;">
          Why not get started?
        </text>

        <text alignment-baseline="middle" text-anchor="middle" x="800" y="500" fill="white" style="font-size: 48px;">
          <a style="text-decoration: underline; cursor: pointer;" xlink:target="_blank" xlink:href="manager-manage.php">Account Manager</a>
        </text>
      </svg>

      <button class="w3-button w3-black w3-display-right" onclick="plusDivs(1)">Next &#10095;</button>
    </div>

    <script>
      var slideIndex = 1;
      showDivs(slideIndex);

      function plusDivs(n) {
        showDivs(slideIndex += n);
      }

      function showDivs(n) {
        var i;
        var x = document.getElementsByClassName("mySlides");
        if (n > x.length) {slideIndex = 1}    
        if (n < 1) {slideIndex = x.length}
        for (i = 0; i < x.length; i++) {
          x[i].style.display = "none";  
        }
        x[slideIndex-1].style.display = "block";  
      }
    </script>

    <?php
      include("../databases/microdb/Database.php");
      include("../databases/microdb/Cache.php");
      include("../databases/microdb/Event.php");
      include("../databases/microdb/Index.php");

      $db = new \MicroDB\Database("../databases/accounts");

      $accountData = $db -> load(1);
      $accounts = count($accountData);

      for ($i = 0; $i < $accounts; $i++) {
        if ($accountData[$i][0] == explode(",", base64_decode($_COOKIE["signedIn"]))[0]) {
          if ($accountData[$i][6] == "active") {
            $accountData[$i][6] = "up and running";
            $db -> save(1, $accountData);
          }
        }
      }
    ?>
  </body>
</html>
