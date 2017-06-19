/* THIS IS AN IMPORTANT FILE.
 * It is in charge of determining suitable keywords and tags (and cancelling inappropriate ones) for notes when the user types that in.
 * DO NOT REMOVE!
 */

var vulgarities = null;

var notTags = ["the", "h1", "h2", "h3", "h4", "h5", "h6", "span", "big", "img", "src", "font-size"]; 
var prepositions = ["a","abaft","aboard","about","above","absent","across","afore","after","against","along","alongside","amid","amidst","among","amongst","an","anenst","apropos","apud","around","as","aside","astride","at","athwart","atop","barring","before","behind","below","beneath","beside","besides","between","beyond","but","by","circa","concerning","despite","down","during","except","excluding","failing","following","for","forenenst","from","given","in","including","inside","into","lest","like","mid","midst","minus","modulo","near","next","notwithstanding","of","off","on","onto","opposite","out","outside","over","pace","past","per","plus","pro","qua","regarding","round","sans","save","since","than","through","throughout","till","times","to","toward","towards","under","underneath","unlike","until","unto","up","upon","versus","via","vice","with","within","without","worth"];

//Suggest tags for user to input; add click handlers to add those tags
function SuggestTags() {
  //Generate list of words in note
  var noteContent = document.getElementsByClassName("cke_wysiwyg_frame cke_reset")[0].contentDocument.body.innerHTML.replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").trim();
  var noteContentWords = noteContent.split(" ");
  console.log(noteContentWords);
}

//Load data from server-side databases
function LoadLanguageData(callback) {
  var getPHPFile = new XMLHttpRequest();
  getPHPFile.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      vulgarities = JSON.parse(getPHPFile.responseText);
      callback();
    }
  }
  getPHPFile.open("GET", "https://notehub-serverside.000webhostapp.com/databases/databases.php?requestedFunction=vulgarities");
  getPHPFile.send();
}

//Vulgarity check
function CheckKeywordsTags(input) {
  //Checks for vulgarities that are bad, no need for context checking
  for (i = 0; i < vulgarities["no-context"].length; i++) {
    if (input.value.toUpperCase().includes(vulgarities["no-context"][i].toUpperCase())) {
      document.getElementById("NoteInfo-SuggestedTags").style.color = "red";
      document.getElementById("NoteInfo-SuggestedTags").innerHTML = "We've detected that you're trying to add a rude tag to your note. Try another tag.";
      console.log("no.");
      return "No.";
    }
    else if (i == (vulgarities["no-context"].length - 1)) {
      document.getElementById("NoteInfo-SuggestedTags").style.color = "black";
      document.getElementById("NoteInfo-SuggestedTags").innerHTML = "- None -";
      return "Approved.";
    }
  }

  //Checks for vulgarities that may only be vulgar in some contexts
}
