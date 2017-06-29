//Add references
function AddReference() {
  var a = document.getElementById("Reference-Table");
  var b = document.getElementById("References-AddBar-Reference"), c = document.getElementById("References-AddBar-Author");
  var d = document.getElementById("References-AddBar-Types").selectedIndex;

  if (b.value == "") {
    b.style.animation = "vibrate 0.9s linear";
    setTimeout(900, function() { b.style.animation = ""; });
  }
  else if (c.value == "") {
    c.style.animation = "vibrate 0.9s linear";
    setTimeout(900, function() { c.style.animation = ""; });
  }
  else {
    if (noteProperties.references == null) {
      a.deleteRow(1);
      noteProperties.references = [];
    }

    noteProperties.references[noteProperties.references.length] = {
      type: d,
      name: b.value, author: c.value
    };

    var reference = a.insertRow(-1);

    var type = reference.insertCell(-1);
    var name = reference.insertCell(-1);
    var author = reference.insertCell(-1);

    switch (d) {
      case 0:
        type.innerHTML = "Written Work";
        name.innerHTML = b.value;
        break;
      
      case 1:
        type.innerHTML = "Website";
        name.innerHTML = "<a href='" + b.value + "'>" + b.value + "</a>";
        break;
      
      case 2:
        type.innerHTML = "Multimedia";
        name.innerHTML = "<a target='_blank' href='" + b.value + "'>" + b.value + "</a>";
        break;
      
      case 3:
        type.innerHTML = "Other";
        name.innerHTML = b.value;
        break;
    }

    author.innerHTML = c.value;
  }
}

//Update placeholders of references
function UpdateReferencesBar() {
  var a = document.getElementById("References-AddBar-Types").selectedIndex;
  var b = document.getElementById("References-AddBar-Reference"), c = document.getElementById("References-AddBar-Author");

  switch (a) {
    case 0:
      b.setAttribute("placeholder", "Title of Written Work");
      c.setAttribute("placeholder", "Author / Publisher of Written Work");
      break;
    
    case 1:
      b.setAttribute("placeholder", "Title / Name of Website");
      c.setAttribute("placeholder", "Author of Website");
      break;
    
    case 2:
      b.setAttribute("placeholder", "Location (URL) of Multimedia");
      c.setAttribute("placeholder", "Creator of Multimedia");
      break;
    
    case 3:
      b.setAttribute("placeholder", "Title / Name of Reference");
      c.setAttribute("placeholder", "Author / Creator of Reference");
      break;
  }
}