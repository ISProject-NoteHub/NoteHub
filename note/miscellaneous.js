window.addEventListener("load", function() {
  //CKEditor Initialisation
  CKEDITOR.replace("Editor");
  CKEDITOR.config.resize_enabled = false;
});

function ConfirmLeave() { return ""; }