window.onload = function() {
  document.getElementById("files").onchange = function(e) {
    var files = e.srcElement.files;
    var list = "";
    for(var i = 0; i < files.length; i++) {
      list += files[i].name;
      if(i < files.length-1) {
        list += "\n";
      }
    }
    document.getElementById("copy").value = list;
  }

  document.getElementById("exe-rep").onclick = function() {
    var remove = document.getElementById("rep-remove").value;
    var insert = document.getElementById("rep-insert").value;
    document.getElementById("copy").value = regex(
      document.getElementById("copy").value,
      [remove, insert],
      "replace"
    );
  }

  document.getElementById("exe-rem").onclick = function() {
    var remove = document.getElementById("remove").value;
    document.getElementById("copy").value = regex(
      document.getElementById("copy").value,
      remove,
      "remove"
    );
  }

  document.getElementById("format").onclick = function() {
    var type = document.getElementById("formatType").value;
    switch(type) {
      case "1":
        toArray();
        console.log("toArray");
        break;
      case "2":
        toCSV();
    }
  }
}

function regex(source, input, action) {
  switch(action) {
    case "replace":
      console.log(source.replace(input[0], input[1]));
      return source.replace(new RegExp(input[0], "g"), input[1]);
      break;
    case "remove":
      return source.replace(new RegExp(input[0], "g"), "");
  }
}

function toArray() {
  var source = document.getElementById("copy").value;
  var output = "[";
  var delim = document.getElementById("delimiter").value;
  if(delim === "") {
    delim = "\n";
  }
  var items = source.split(delim);
  for(var i = 0; i < items.length; i++) {
    output += "\"" + items[i].replace(/"/g, "'") + "\"";
    if(i < items.length-1) {
      output += ",";
    }
  }
  output += "]";
  document.getElementById("result").value = output;
}

function toCSV() {
  var source = document.getElementById("copy").value;
  var output = "";
  var delim = document.getElementById("delimiter").value;
  if(delim === "") {
    delim = "\n";
  }
  var items = source.replace(/,/g, " ").split(delim);
  output += items.toString();
  document.getElementById("result").value = output;
}
