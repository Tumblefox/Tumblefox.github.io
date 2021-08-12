variables = {
  lists: {
    characters: ["Bilbo", "Gordon", "Annette"],
    expressions: ["Angry", "Horny"]
  },
  mappings: {
    characters: "name",
    expressions: "expression"
  },
  schema: {
    name: "datalist",
    expression: "datalist",
    action: "input",
    line: "textarea",
  },
  colors: {},
  lines: []
}

window.onload = function() {
  var addLine = document.getElementById("dialogue").children[1];
  addLine.onclick = newLine;

 loadLists();
}

function loadLists() {
  var lists = document.getElementById("lists");
  var keys = Object.keys(variables.lists);

  for(var i = 0; i < keys.length; i++) {
    var list = document.createElement("div");
    list.className = "list w-25";
    list.id = "list-" + keys[i];

    var title = document.createElement("h3");
    title.innerHTML = keys[i];

    var textarea = document.createElement("textarea");
    textarea.className = "w-100";
    if(variables.lists[keys[i]].length > 0) {

    }

    list.appendChild(title);
    list.appendChild(textarea);
    lists.appendChild(list);
  }
}

function loadLines() {
  var box = document.getElementById("dialog-box");
  emptyElement(box);

  var keys = Object.keys(variables.schema);
  for(var i = 0; i < variables.lines.length; i++) {
    var bubble = document.createElement("div");
    bubble.className = "bubble w-100";

    for(var j = 0; j < keys.length; j++) {
      var text = document.createElement("p");
      text.style.margin = "none";
      text.innerHTML = keys[j] + ": " + variables.lines[i][keys[j]];
      bubble.appendChild(text);
    }

    box.appendChild(bubble);
  }
}

function newLine() {
  var box = document.getElementById("dialog-box");
  emptyElement(box);

  var bubble = document.createElement("div");
  bubble.className = "bubble";
  var keys = Object.keys(variables.schema);

  for(var i = 0; i < keys.length; i++) {
    var title = document.createElement("h3");
    title.innerHTML = keys[i];

    var inputType = variables.schema[keys[i]];
    if(inputType === "datalist") {
      var input = document.createElement("div");
      input.setAttribute("data-type", "datalist");
      var inputElement = document.createElement("input");
      inputElement.className = "w-100";
      inputElement.type = "text";
      inputElement.setAttribute("list", "datalist-" + keys[i]);
      var datalist = document.createElement("datalist");
      datalist.id = "datalist-" + keys[i];
      input.appendChild(inputElement);
      input.appendChild(datalist);
    }
    else {
      var input = document.createElement(inputType);
      input.type = "text";
      input.className = "w-100";
    }

    input.id = "input-" + keys[i];
    bubble.appendChild(title);
    bubble.appendChild(input);
    //box.appendChild(bubble);
  }
  var colorTitle = document.createElement("h3");
  colorTitle.innerHTML = "Bubble Color";
  var color = document.createElement("input");
  color.type = "color";
  color.value = "#cc6600";
  color.id = "input-color";
  bubble.appendChild(colorTitle);
  bubble.appendChild(color);
  box.appendChild(bubble);

  var add = document.createElement("button");
  add.innerHTML = "+";
  add.className = "add-btn";
  add.onclick = function(e) {
    var keys = Object.keys(variables.schema);
    var line = {};
    for(var i = 0; i < keys.length; i++) {
      var input = document.getElementById("input-" + keys[i]);
      if(input.getAttribute("data-type") === "datalist") {
        line[keys[i]] = input.children[0].value;
      }
      else {
        line[keys[i]] = input.value;
      }
    }
    variables.lines.push(line);

    var colors = document.getElementById("input-color");
    loadLines();
    e.srcElement.parentNode.parentNode.removeChild(e.srcElement.parentNode);
  };
  bubble.appendChild(add);
  populateData();
}

function populateData() {
  var keys = Object.keys(variables.mappings);
  for(var i = 0; i < keys.length; i++) {
    var id = "input-" + variables.mappings[keys[i]];
    var datalist = document.getElementById(id).children[1];
    console.log(keys[i]);
    var list = variables.lists[keys[i]];
    for(var j = 0; j < list.length; j++) {
      var opt = document.createElement("option");
      opt.value = list[j];
      datalist.appendChild(opt);
    }
  }
}

function emptyElement(element) {
  while(element.hasChildNode) {
    element.removeChild(element.lastChild);
  }
}
