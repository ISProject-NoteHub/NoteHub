//prepositions actually contains pronouns and prepositions
var prepositions = ["you", "just", "can", "would", "knew", "had", "that", "my", "their", "was", "that", "is", "and", "i", "the", "a","abaft","aboard","about","above","absent","across","afore","after","against","along","alongside","amid","amidst","among","amongst","an","anenst","apropos","apud","around","as","aside","astride","at","athwart","atop","barring","before","behind","below","beneath","beside","besides","between","beyond","but","by","circa","concerning","despite","down","during","except","excluding","failing","following","for","forenenst","from","given","in","including","inside","into","lest","like","mid","midst","minus","modulo","near","next","notwithstanding","of","off","on","onto","opposite","out","outside","over","pace","past","per","plus","pro","qua","regarding","round","sans","save","since","than","through","throughout","till","times","to","toward","towards","under","underneath","unlike","until","unto","up","upon","versus","via","vice","with","within","without","worth"];

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
    var words = document.getElementsByClassName("cke_wysiwyg_frame cke_reset")[0].contentDocument.body.innerHTML.toLowerCase().replace(/&nbsp;/g, " ");
    var wordsFound = [];
    var commonOccurences = [{
      word: ".", count: 1
    }];

    //Removes HTML tags
    var tmp = document.createElement("div");
    tmp.innerHTML = words;
    words = tmp.textContent || tmp.innerText;

    words = words.split(" ");
    
    //Removes prepositions
    for (i = 0; i < prepositions.length; i++) {
      removeFrom(prepositions[i], words, false);
    }

    //This comparison is done for every word
    for (i = 0; i < words.length; i++) {
      if (contains(wordsFound, words[i])) {
        var giveUp = true;

        for (a = 0; a < commonOccurences.length; a++) {
          if (commonOccurences[a].word.includes(words[i])) {
            giveUp = false;
            commonOccurences[a].count = commonOccurences[a].count + 1;
          }
          else if (a == (commonOccurences.length - 1)) {
            commonOccurences[commonOccurences.length] = {
              word: words[i], count: 1
            };
          }
        }
      }
      else {
        wordsFound[wordsFound.length] = words[i];
      }
    }

    //Combine duplicates
    var duplicatesHolding = [];

    for (i = 0; i < commonOccurences.length; i++) {
      var word = commonOccurences[i].word;
      var indexesFound = [];

      for (a = 0; a < commonOccurences.length; a++) {
        if (commonOccurences[a].word == word) { indexesFound.push(a); }
      }

      duplicatesHolding[i] = { word: "...", count: 0 };

      //Add count of the next index
      for (a = 0; a < indexesFound.length; a++) {
        duplicatesHolding[i].word = word;
        duplicatesHolding[i].count = duplicatesHolding[i].count + commonOccurences[indexesFound[a]].count;

        commonOccurences.splice(indexesFound[a], 1);
      }
    }

    commonOccurences = duplicatesHolding;

    //Sort output
    var arr = commonOccurences;
    var len = arr.length;
    for (var z = 0; z < len ; z++) {
      for(var j = 0 ; j < len - z - 1; j++){
        if (arr[j].count > arr[j + 1].count) {
          var temp = arr[j];
          arr[j] = arr[j+1];
          arr[j + 1] = temp;
        }
      }
    }

    commonOccurences = arr;

    //Format output
    var suggestionsOutput = [];
    for (i = 0; i < commonOccurences.length; i++) { suggestionsOutput[i] = commonOccurences[i].word; }

    //Sanitise output
    var specialChars = "!@#$^&%*()+=-[]\/{}|:<>?,.";
    for (var i = 0; i < specialChars.length; i++) {
      for (a = 0; a < suggestionsOutput.length; a++) {
        suggestionsOutput[a] = suggestionsOutput[a].replace(new RegExp("\\" + specialChars[i], "gi"), "");
      }
    }

    //Display output
    a.innerHTML = "";
    b.innerHTML = a.innerHTML;

    for (i = (suggestionsOutput.length - 5); i < suggestionsOutput.length; i++) {
      var tag = document.createElement("div");
      tag.className = "FilePicker-Item-Tag";
      tag.style.top = "0"; tag.style.cursor = "pointer";
      tag.innerHTML = suggestionsOutput[i];
      tag.setAttribute("onclick", "this.style.display = 'none'; otherTags.addTags('" + suggestionsOutput[i] + "'); noteProperties.tags.addTags('" + suggestionsOutput[i] + "');");

      document.getElementById("NoteInfo-SuggestedTags").appendChild(tag);
      document.getElementById("SaveAs-SuggestedTags").appendChild(tag);
    }
  }
}

function removeFrom(needle, haystack, HTMLtags) {
  for (a = 0; a < haystack.length; a++) {
    if (HTMLtags === true) {
      if (haystack[a].includes(needle)) {
        haystack[a] = haystack[a].replace(needle, " ");
        haystack.splice(a, 0, haystack[a].split(" ")[0], haystack[a].split(" ")[1]);
      }
    }
    else {
      if (haystack[a] == needle) { haystack.splice(a, 1); }
    }
  }
}

function contains(a, obj) {
  for (var c = 0; c < a.length; c++) {
    if (a[c] == obj) {
      return true;
    }
  }
  return false;
}