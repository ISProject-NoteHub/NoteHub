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

function Line(event) {
  event.preventDefault();
  document.execCommand("insertHorizontalRule", false, null);
}

function RemoveFormatting(event) {
  event.preventDefault();
  document.execCommand("removeFormat", false, null);
}

function UpdateFontSize(event) {
  event.preventDefault();
  document.execCommand("fontSize", false, "7");
  var fontElements = document.getElementsByTagName("font");
  for (var i = 0, len = fontElements.length; i < len; i++) {
    if (fontElements[i].size == "7") {
      fontElements[i].removeAttribute("size");
      fontElements[i].style.fontSize = document.getElementById("Formatting-FontSize").options[document.getElementById("Formatting-FontSize").selectedIndex].value + "px";
    }
  }
}

function GetFontSize() {
  var containerEl, sel;
  if (window.getSelection) {
    sel = window.getSelection();
    if (sel.rangeCount) {
      containerEl = sel.getRangeAt(0).commonAncestorContainer;
      if (containerEl.nodeType == 3) {
        containerEl = containerEl.parentNode;
      }
    }
  }
  else if ( (sel = document.selection) && sel.type != "Control") {
    containerEl = sel.createRange().parentElement();
  }
  
  if (containerEl) {
    var fontName = getComputedStyleProperty(containerEl, "fontSize"); console.log(fontSize);

    if (fontName.includes("144")) { document.getElementById("Formatting-FontFamily").selectedIndex = 12; }
    else if (fontName.includes("72")) { document.getElementById("Formatting-FontFamily").selectedIndex = 11; }
    else if (fontName.includes("48")) { document.getElementById("Formatting-FontFamily").selectedIndex = 10; }
    else if (fontName.includes("36")) { document.getElementById("Formatting-FontFamily").selectedIndex = 9; }
    else if (fontName.includes("28")) { document.getElementById("Formatting-FontFamily").selectedIndex = 8; }
    else if (fontName.includes("26")) { document.getElementById("Formatting-FontFamily").selectedIndex = 7; }
    else if (fontName.includes("24")) { document.getElementById("Formatting-FontFamily").selectedIndex = 6; }
    else if (fontName.includes("18")) { document.getElementById("Formatting-FontFamily").selectedIndex = 5; }
    else if (fontName.includes("14")) { document.getElementById("Formatting-FontFamily").selectedIndex = 4; }
    else if (fontName.includes("12")) { document.getElementById("Formatting-FontFamily").selectedIndex = 3; }
    else if (fontName.includes("11")) { document.getElementById("Formatting-FontFamily").selectedIndex = 2; }
    else if (fontName.includes("10")) { document.getElementById("Formatting-FontFamily").selectedIndex = 1; }
    else { document.getElementById("Formatting-FontFamily").selectedIndex = 0; }
  }
}

function UpdateFontFamily(event) {
  event.preventDefault();
  document.execCommand("fontName", false, document.getElementById("Formatting-FontFamily").options[document.getElementById("Formatting-FontFamily").selectedIndex].value);
}

function GetFontFamily() {
  var fontName = document.queryCommandValue("fontName"); console.log(fontName);

  if (fontName.includes("Arial")) { document.getElementById("Formatting-FontFamily").selectedIndex = 0; }
  else if (fontName.includes("Calibri")) { document.getElementById("Formatting-FontFamily").selectedIndex = 1; }
  else if (fontName.includes("Cambria")) { document.getElementById("Formatting-FontFamily").selectedIndex = 2; }
  else if (fontName.includes("Comic")) { document.getElementById("Formatting-FontFamily").selectedIndex = 3; }
  else if (fontName.includes("Consolas")) { document.getElementById("Formatting-FontFamily").selectedIndex = 4; }
  else if (fontName.includes("Open")) { document.getElementById("Formatting-FontFamily").selectedIndex = 5; }
  else if (fontName.includes("Times")) { document.getElementById("Formatting-FontFamily").selectedIndex = 6; }
  else if (fontName.includes("Segoe")) { document.getElementById("Formatting-FontFamily").selectedIndex = 7; }
  else if (fontName.includes("Trebuchet")) { document.getElementById("Formatting-FontFamily").selectedIndex = 8; }
  else if (fontName.includes("Verdana")) { document.getElementById("Formatting-FontFamily").selectedIndex = 9; }
  else if (fontName.includes("monospace")) { document.getElementById("Formatting-FontFamily").selectedIndex = 10; }
  else if (fontName.includes("sans-serif")) { document.getElementById("Formatting-FontFamily").selectedIndex = 11; }
  else if (fontName.includes("serif")) { document.getElementById("Formatting-FontFamily").selectedIndex = 12; }
}

function getComputedStyleProperty(el, propName) {
  if (window.getComputedStyle) {
    return window.getComputedStyle(el, null)[propName];
  }
  else if (el.currentStyle) {
    return el.currentStyle[propName];
  }
}

function FormattingToolbarUpdate() {
  GetFontFamily(); GetFontSize();
}