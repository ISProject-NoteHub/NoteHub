function SetBold() {
  notebox = document.getElementById("Editor");
  notebox.focus();
  
  document.execCommand("bold", false, null);
  
  notebox.focus();
}
