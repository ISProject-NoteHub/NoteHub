function SetBold(event) {
  event.preventDefault();
  document.execCommand("bold", false, null);
}

function SetItalic(event) {
  event.preventDefault();
  document.execCommand("italic", false, null);
}

function SetUnderline(event) {
  event.preventDefault();
  document.execCommand("underline", false, null);
}

function InsertNumberedList(event) {
  event.preventDefault();
  document.execCommand("insertOrderedList", false, null);
}

function InsertBulletedList(event) {
  event.preventDefault();
  document.execCommand("insertUnorderedList", false, null);
}

function Indent(event) {
  event.preventDefault();
  document.execCommand("indent", false, null);
}

function Outdent(event) {
  event.preventDefault();
  document.execCommand("outdent", false, null);
}

function UpdateFontSize(event) {
  event.preventDefault();
  document.execCommand("fontSize", false, "7");
  var fontElements = document.getElementsByTagName("font");
  for (var i = 0, len = fontElements.length; i < len; ++i) {
    if (fontElements[i].size == "7") {
      fontElements[i].removeAttribute("size");
      fontElements[i].style.fontSize = document.getElementById("Formatting-FontSize").options[document.getElementById("Formatting-FontSize").selectedIndex].value + "px";
    }
  }
}

function UpdateFontFamily(event) {
  event.preventDefault();
  document.execCommand("fontName", false, document.getElementById("Formatting-FontFamily").options[document.getElementById("Formatting-FontFamily").selectedIndex].value);
}

function UpdateHighlight() {
}
