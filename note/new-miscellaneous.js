function RevealIconDescriptors() {
  var description = document.getElementById("Menu-Descriptors");
  
  if (description.getAttribute("data-open") == "closed") { description.setAttribute("data-open", "open"); }
  else { description.setAttribute("data-open", "closed");  }
}
