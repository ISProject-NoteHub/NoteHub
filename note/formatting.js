//Notebox
var notebox;
var newSpanContents;

//Fonts
function fonts_updateFont() {
  notebox = document.getElementById("App-NoteBox");
  notebox.focus();
  notebox.removeAttribute("contenteditable");

  var sel, range, html;
  var text = "<table>";
  text = window.getSelection().toString();
  var spanToInsert = document.createElement("span");
  spanToInsert.innerHTML = text;
  spanToInsert.style.fontFamily = document.getElementById("Formatting-FontFamily").options[document.getElementById("Formatting-FontFamily").selectedIndex].value;
  spanToInsert.style.fontSize = document.getElementById("Formatting-FontSize").value;
  
  sel = window.getSelection();
  if (sel.getRangeAt && sel.rangeCount)
  {
    range = sel.getRangeAt(0);
    range.deleteContents();
    range.insertNode(spanToInsert);
  }
}
