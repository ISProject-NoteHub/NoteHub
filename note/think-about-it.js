/* THIS IS AN IMPORTANT FILE.
 * It is in charge of determining suitable keywords and tags (and cancelling inappropriate ones) for notes when the user types that in.
 * DO NOT REMOVE!
 */

var vulgarities = null;

//Suggest keywords for user

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
  console.log(input);

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
