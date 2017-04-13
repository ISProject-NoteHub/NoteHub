//Notebox
var notebox, newSpanContents;

//Fonts
function fonts_updateFont(event) {
  notebox = document.getElementById("App-NoteBox");
  //notebox.focus();

  var sel, range, html;
  var text = "<table>";
  text = window.getSelection().toString();
  var spanToInsert = document.createElement("span");
  spanToInsert.innerHTML = text;
  spanToInsert.style.fontFamily = document.getElementById("Formatting-FontFamily").options[document.getElementById("Formatting-FontFamily").selectedIndex].value;
  
  if (event.keyCode == 13) {
    notebox.focus();
    spanToInsert.style.fontSize = document.getElementById("Formatting-FontSize").value + "px";
  }
  else {
    //...
  }
  
  sel = window.getSelection();
  if (sel.getRangeAt && sel.rangeCount)
  {
    range = sel.getRangeAt(0);
    range.deleteContents();
    range.insertNode(spanToInsert);
  }
}
