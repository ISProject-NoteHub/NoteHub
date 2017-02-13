function savenote() {
    var getphpfile = new XMLHttpRequest();
    getphpfile.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            alert('Note Saved!')
        }
    }
    getphpfile.open("GET", "https://notehub-serverside.000webhostapp.com/handlers/filing.php", true);
    getphpfile.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
}