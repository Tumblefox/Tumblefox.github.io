function format() {
  var opener = document.getElementById("opener").value;
  var closer = document.getElementById("closer").value;
  var shell = document.getElementById("shell").value;
  var lastShell = document.getElementById("lastShell").value;
  var result = "";

  var shellPieces = shell.split("$$");
  var lastShellPiece = lastShell.split("$$");

  if(document.getElementById("files").value !== null && document.getElementById("files").value !== "") {
    var objects = document.getElementById("files").files;

    for(var i = 0; i < objects.length; i++) {
      if(i === (objects.length - 1)) {
        result += lastShellPiece[0] + objects[i].name + lastShellPiece[1];
      }
      else {
        result += shellPieces[0] + objects[i].name + shellPieces[1];
      }
    }
  }
  else {
    var source = document.getElementById("copy").value;
    let delimiter = document.getElementById("delimiter").value;
    console.log(source);
    if(delimiter !== "" && delimiter !== null) {
      console.log("Delimeter: " + delimiter);
      var objects = source.split(delimiter);
    }
    else {
      if(source.indexOf(",") > -1) {
        console.log("Delimeter: ,");
        var objects = source.split(",");
      }
      else if(source.indexOf("\n") > -1) {
        console.log("Delimeter: \\n");
        var objects = source.split("\n");
      }
    }

    for(var i = 0; i < objects.length; i++) {
      if(i === (objects.length - 1)) {
        result += lastShellPiece[0] + objects[i] + lastShellPiece[1];
      }
      else {
        result += shellPieces[0] + objects[i] + shellPieces[1];
      }
    }
  }

  document.getElementById("result").value = opener + result + closer;
}
