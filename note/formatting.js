//Notebox
var notebox, newSpanContents;

//Bold
function SetBold() {
  var boldButton = document.getElementById("Formatting-FontBold");
  
  if (boldButton.getAttribute("data-active") == "true") { boldButton.setAttribute("data-active", "false"); }
  else { boldButton.setAttribute("data-active", "true"); }
}

//Italic
function SetItalic() {
  var italicButton = document.getElementById("Formatting-FontItalic");
  
  if (italicButton.getAttribute("data-active") == "true") { italicButton.setAttribute("data-active", "false"); }
  else { italicButton.setAttribute("data-active", "true"); }
}

//Underline
function SetUnderline() {
  var underlineButton = document.getElementById("Formatting-FontUnderline");
  
  if (underlineButton.getAttribute("data-active") == "true") { underlineButton.setAttribute("data-active", "false"); }
  else { underlineButton.setAttribute("data-active", "true"); }
}

//Fonts
function fonts_updateFont(event) {
  notebox = document.getElementById("App-NoteBox");
  notebox.focus();

  var sel, range, html;
  var text = "<table>";
  text = window.getSelection().toString();
  var spanToInsert = document.createElement("span");
  spanToInsert.innerHTML = text;
  
  //Font size and font family
  spanToInsert.style.fontFamily = document.getElementById("Formatting-FontFamily").options[document.getElementById("Formatting-FontFamily").selectedIndex].value;
  spanToInsert.style.fontSize = document.getElementById("Formatting-FontSize").options[document.getElementById("Formatting-FontSize").selectedIndex].value + "px";
  
  //Bold, italic, underline
  spanToInsert.innerHTML = spanToInsert.innerHTML.replace("<b>", "").replace("</b>", "").replace("<i>", "").replace("</i>", "").replace("<u>", "").replace("</u>", "");
  if (document.getElementById("Formatting-FontUnderline").getAttribute("data-active") == "true") { spanToInsert.innerHTML = "<u>" + spanToInsert.innerHTML + "</u>"; }
  if (document.getElementById("Formatting-FontBold").getAttribute("data-active") == "true") { spanToInsert.innerHTML = "<b>" + spanToInsert.innerHTML + "</b>"; }
  if (document.getElementById("Formatting-FontItalic").getAttribute("data-active") == "true") { spanToInsert.innerHTML = "<i>" + spanToInsert.innerHTML + "</i>"; }
  
  sel = window.getSelection();
  if (sel.getRangeAt && sel.rangeCount)
  {
    if (sel == "") { spanToInsert.innerHTML = "&nbsp;"; }
    
    range = sel.getRangeAt(0);
    range.deleteContents();
    range.insertNode(spanToInsert);
  }
}
