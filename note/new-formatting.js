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

function UpdateFontSize() {
  document.execCommand("fontSize", false, document.getElementById("Formatting-FontSize").options[document.getElementById("Formatting-FontSize").selectedIndex].value + "px");
}
