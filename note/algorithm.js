var prepositions = ["the", "a","abaft","aboard","about","above","absent","across","afore","after","against","along","alongside","amid","amidst","among","amongst","an","anenst","apropos","apud","around","as","aside","astride","at","athwart","atop","barring","before","behind","below","beneath","beside","besides","between","beyond","but","by","circa","concerning","despite","down","during","except","excluding","failing","following","for","forenenst","from","given","in","including","inside","into","lest","like","mid","midst","minus","modulo","near","next","notwithstanding","of","off","on","onto","opposite","out","outside","over","pace","past","per","plus","pro","qua","regarding","round","sans","save","since","than","through","throughout","till","times","to","toward","towards","under","underneath","unlike","until","unto","up","upon","versus","via","vice","with","within","without","worth"];
var contentTags = ["<p>", "</p>", "<br>", "<div>", "</div>"];

function ListSuggestions() {
  var a = document.getElementById("NoteInfo-SuggestedTags"), b = document.getElementById("SaveAs-SuggestedTags");

  if (document.getElementsByClassName("cke_wysiwyg_frame cke_reset")[0].contentDocument.body.innerHTML == "<p><br></p>") {
    var tag = document.createElement("div");
    tag.className = "FilePicker-Item-Tag";
    tag.style.top = "0";
    tag.innerHTML = "- No Suggestions -";

    a.innerHTML = tag.outerHTML;
    b.innerHTML = a.innerHTML;
  }
  else {
    var words = document.getElementsByClassName("cke_wysiwyg_frame cke_reset")[0].contentDocument.body.innerHTML.toLowerCase();
    var wordsFound = [];
    var commonOccurences = [];

    //Removes HTML tags
    for (i = 0; i < contentTags.length; i++) {
      var regex = new RegExp(contentTags[i], "g");
      words = words.replace(regex, "");
    }
    
    //Removes prepositions
    for (i = 0; i < prepositions.length; i++) {
      var regex = new RegExp(" " + prepositions[i] + " ", "g");
      words = words.replace(regex, " ");
    }

    words = words.split(" ");

    console.log(words);

    //This comparison is done for every word
  }
}