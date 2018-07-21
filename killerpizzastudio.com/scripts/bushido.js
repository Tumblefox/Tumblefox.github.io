/*
NOTICE: This file depends on Bootstrap 3, Bootstrap JS, and jQuery for functionality
*/

/*-----------------------------Sitewide Elements------------------------------*/
//Make Changes to the header or footer HERE
var init = {
  "header": function() {
	  //document.head.appendChild();
  },
  "footer": function() {
	  var col1 = [
		text("Countact Us", "h3", "text-center"),
		hyperlinkElement(text("Email", "p", "text-center"), "mailto:", ""),
		];
	  var col2 = [
		text("Follow Us", "h3", "text-center"),
		hyperlinkElement(text("Steam", "p", "text-center"), "http://steampowered.com", ""),
		hyperlinkElement(text("Facebook", "p", "text-center"), "http://facebook.com", ""),
		hyperlinkElement(text("Youtube", "p", "text-center"), "http://youtube.com", ""),
		hyperlinkElement(text("Instagram", "p", "text-center"), "http://instagram.com", "")
		];
	  
	  var footerGrid = grid(2, 
	  [
		division(col1, ""),
		division(col2, "")
	  ],
	  "", []);
	  footer.className = "light-gray";
	  document.getElementById("footer").appendChild(footerGrid);
  }
};

/*---------------------------Element generators-------------------------------*/

/*Generates the navigation bar given list items
returns -> <nav> element with all navigation items added
navItems (array) -> <li> elements containing hyperlinks
classes (string) -> addditional classes for the <nav> element
*/
function nav(navItems, classes) {
  var nav = document.createElement("nav");
  nav.className = classes;
  nav.style.position = "fixed"; //or "absolute"
  nav.style.top = 0;
  nav.style.width = "100%";
  nav.style.zIndex = "1";
  nav.id = "navigation";

  var navbarHeader = document.createElement("div");
  navbarHeader.className = "navbar-header";
  var collapseButton = document.createElement("button");
  collapseButton.className = "navbar-toggle";
  collapseButton.type = "button";
  var toggle = document.createAttribute("data-toggle");
  toggle.value = "collapse";
  var target = document.createAttribute("data-target");
  target.value = "#navDiv";
  collapseButton.setAttributeNode(toggle);
  collapseButton.setAttributeNode(target);
  var line = document.createElement("span");
  var line1 = document.createElement("span");
  var line2 = document.createElement("span");
  line.className = "icon-bar";
  line1.className = "icon-bar";
  line2.className = "icon-bar";
  collapseButton.appendChild(line);
  collapseButton.appendChild(line1);
  collapseButton.appendChild(line2);
  var brand = document.createElement("img");
  brand.src = "img/branding.png";
  navbarHeader.appendChild(collapseButton);
  navbarHeader.appendChild(hyperlinkElement(brand, "#", "navbar-brand"));

  var navCollapse = document.createElement("div");
  navCollapse.className = "collapse navbar-collapse";
  navCollapse.id = "navDiv";

  var ul = document.createElement("ul");
  ul.className = "nav navbar-nav";

  var div = document.createElement("div");
  div.className = "container-fluid";

  for(var i = 0; i < navItems.length; i++) {
    ul.appendChild(navItems[i]);//append here
  }
  navCollapse.appendChild(ul);
  div.appendChild(navbarHeader);
  div.appendChild(navCollapse);
  nav.appendChild(div);

  return nav;
}

/* Creates a <li> element with a hyperlink
returns -> <li> element with the specified text and link
text (string) -> the desired text to be link
url (string) -> the desired location of the link
*/
function navItem(text, url) {
  var li = document.createElement("li");
  li.className = "navlink";
  li.appendChild(hyperlink(text, url, ""));
  return li;
}

/* Creates an <li> with sub list items to create a dropdown nav item
returns -> <li> with the specified sub list navItems
text (array) -> the text of each item; the first item is the parent
url (array) -> the desired location for each item to link to
*/
function dropDownNavItem(text, url) {
  var parent = document.createElement("li");
  parent.className = "dropdown";

  var a = hyperlink(text[0], url[0], "dropdown-toggle");
  var toggle = document.createAttribute("data-toggle");
  toggle.value = "dropdown";
  a.setAttributeNode(toggle);
  var caret = document.createElement("span");
  caret.className = "caret";
  a.appendChild(caret);

  parent.appendChild(a);

  sublist = document.createElement("ul");
  sublist.className = "dropdown-menu";

  for(var j = 1; j < url.length; j++) {
    var child = document.createElement("li");
    child.appendChild(hyperlink(text[j], url[j], ""));
    sublist.appendChild(child);
  }
  parent.appendChild(sublist);
  return parent;
}

/*Creates a grid; # of elements determine number of rows
returns -> grid with the specified elements
colLength (int) -> the max number of columns per rows
elements (array) -> the html elements to be placed in the columns
id (string) -> the id of the grid's formDigestValue
classes (array) -> the classes for each element
*/
function grid(colLength, elements, id, classes) {
  var div = document.createElement("div");
  div.id = id;

  var rows = Math.ceil(elements.length / colLength);
  var elemCount = 0;

  var length = 0;
  var offset = 0;
  if (colLength > 12 || colLength < 1) {
    length = 12;
  }
  //if colLength doesn't divide into 12
  if(12 % colLength !== 0) {
    length = Math.floor(12 / colLength);
    offset = Math.ceil((12 - (elements.length * length)) / 2);
  }
  else {
    length = 12 / colLength;
  }

  for(var i = 0; i < rows; i++) {
    var row = document.createElement("div");
    row.className = "row";
    for(j = 0; j < colLength; j++) {
      if(elemCount < elements.length) {
        var col = document.createElement("div");
        if(j === 0 && offset !== 0) {
          col.className = "col-md-offset-" + offset;
        }
        if(classes.length > 0) {
          col.className += " col-sm-" + length + " " + classes[elemCount];
        }
        else {
          col.className += " col-sm-" + length;
        }
        col.appendChild(elements[elemCount]);
        row.appendChild(col);
        elemCount++;
      }
    }
    div.appendChild(row);
  }
  return div;
}

/*Creates a button with the specified text
returns -> a <button> element
text (string) -> the desired text for the button
classes (string) -> additional classes for the button
*/
function button(text, classes) {
  var button = document.createElement("button");
  button.className = classes;
  button.innerHTML = text;
  return button;
}

/*Creates a hyperlink
returns -> the specified <a> element
text (string) -> the desired text to become a hyperlink
url (string) -> the hyperlink url
*/
function hyperlink(text, url, classes) {
  var a = document.createElement("a");
  a.href = url;
  a.innerHTML = text;
  a.className = classes;
  return a;
}

/*Creates text given the specified element tag (p, h1-h6)
returns -> the specified element with the given text
text (string) -> the desired text
type (string) -> the desired element type
classes
*/
function text(text, type, classes) {
  var element = document.createElement(type);
  element.innerHTML = text;
  element.className = classes;
  return element;
}

/* Creates a <div> element and fills it with the specified elements
returns -> div with every provided element
elements (array) -> the desired elements to be added
*/
function division(elements, classes) {
  div = document.createElement("div");
  div.className = classes;
  for (var i = 0; i < elements.length; i++) {
    div.appendChild(elements[i]);
  }
  return div;
}

/* Creates an <img> element with the specified url and alt text
returns -> the specified <img> element
url (string) -> the location of the image
alt (string) -> the alternative text to be displayed
*/
function picture(url, alt, classes) {
  img = document.createElement("img");
  img.src = url;
  img.alt = alt;
  img.className = classes;
  return img;
}

/*Retrieves JSON file at the specified url and performs an action
returns -> JSON file as an object, or false if the process failed
url (string) -> the location of the desired JSON file
action (string) -> the desired action to take on success
*/
function httpJSONRequest(url, action) {
  var request = new XMLHttpRequest();
  request.overrideMimeType("application/json");
  request.onreadystatechange = function() {
    action(this);
  };
request.open("GET", url, true);
request.send();
}

/*Creates a <script> element
returns -> <script> element given the source
source (string) -> the location of the script
*/
function script(source) {
  newScript = document.createElement("script");
  newScript.src = source;
  return newScript;
}

/*Creates a stylesheet
returns -> a <link> element that points to the specified stylesheet
source (string) -> the location of the specified stylesheet
*/
function stylesheet(source) {
  link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = source;
  return link;
}

/* Creates a <meta> element with the given name and content
returns -> the desired <meta> element
tagName (string) -> the desired name (type of <meta> element)
tagContent (string) -> the desired content
*/
function meta(tagName, tagContent) {
  var meta = document.createElement("meta");
  meta.name = tagName;
  meta.content = tagContent;
  return meta;
}

/*----------------------------------Animations---------------------------------*/

/**/
function animation(fps, elem, action, terminationValue) {
	var id = setInterval(frame, fps);
	var count = 0;
	function frame() {
		if (count === terminationValue) {
			clearInterval(id);
		} else {
			count++;
			action(elem);
		}
	}
}

/**/
function pop(fps, elem) {
	var id = setInterval(frame, fps);
	var count = 0;
	function frame() {
		if (count === 500) {
			clearInterval(id);
		} else {
			if((count % 10) === 0) {
				elem.style.width = "100%"; 
			} 
			else {
				elem.style.width = (100 + count) + "%"; 
			} 
		}
	}
}


/*--------------------------Feature generators--------------------------------*/

/**/
function triangleCard(img, text) {
	var div = document.createElement("div");
	div.style.width = "0";
	div.style.height = "0";
	div.style.borderLeft = "100px solid transparent";
	div.style.borderRight = "100px solid transparent";
	div.style.borderBottom = "200px solid #555";
	
	var pic = document.createElement("img");
	pic.src  = img;
	pic.style.objectFit = "cover";
	div.appendChild(pic);
	div.style.backgroundImage = "url('img/pizza.jpg');";
	return div;
}

function roundCard(img, desc, roundness) {
	var div = document.createElement("div");
	div.style.borderRadius = roundness;
	div.style.overflow = "hidden";
	
	var container = document.createElement("div");
	
	var pic = document.createElement("img");
	pic.src  = img;
	pic.className = "center-block";
	
	div.appendChild(pic);
	//container.appendChild(div);
	pic.style.borderRadius = roundness;
	container.appendChild(pic);
	container.appendChild(text(desc, "p", "text-center whitespace-sm"));
	return container;
}

/*Creates "Our Team" contact cards
returns -> div with specified contact cards
img (array) -> collection of all team member profile image urls
names (array) -> the names of all team members
titles (array) -> the title/role of all team members
*/
function ourTeam(img, names, titles) {
  var cards = [];
  for(var i = 0; i < names.length; i++) {
    cards.push(contactCard(img[i], names[i], titles[i]));
  }

  return grid(4, cards, "", []);
}

/*Creates a div with an image, text, and subtext
returns -> div with the specified img and subtext
img (string) -> the specified image url
name (string) -> the specified main text
title (string) -> the specified subtext
*/
function contactCard(img, name, title) {
  var card = document.createElement("div");
  card.className = "light-gray img-rounded";
  card.style.overflow = "hidden";
  card.style.marginBottom = "10%";

  var image = document.createElement("img");
  image.src = img;
  image.style.width = "100%";
  var imgDiv = document.createElement("div");
  imgDiv.style.height = "500px";
  imgDiv.style.width = "100%";
  imgDiv.style.overflowY = "hidden";
  imgDiv.appendChild(image);

  var textDiv = document.createElement("div");
  textDiv.style.padding = "10%";

  var h2 = text(name, "h2", "text-center");
  h2.style.padding = "5%";

  textDiv.appendChild(h2);
  textDiv.appendChild(text(title, "h4", "text-center"));

  card.appendChild(imgDiv);
  card.appendChild(textDiv);

  return card;
}

/*Creates a div with an image, text, subtext, and a div with more content
returns -> div with the specified img and subtext
img (string) -> the specified image url
name (string) -> the specified main text
desc (string) -> the specified subtext
content (object) -> the desired additional content
*/
function infoCard(img, name, desc, content) {
  var card = contactCard(img, name, desc);
  card.appendChild(content);
  return card;
}

/* Wraps an element in an <a> with the given url
returns -> an anchor with the specified element and reference
element (object) -> the desired element to be hyperlinked
url (string) -> the desired reference for the anchor
classes (string) -> additional classes for the anchor
*/
function hyperlinkElement(element, url, classes) {
  a = document.createElement("a");
  a.href = url;
  a.appendChild(element);
  a.className = classes;
  return a;
}

/*Creates <div> with an <img> and hyperlinked text
returns -> a <div> with the specified image, and linked text
img (string) -> the url of the desired image
text (string) -> the desired text
url (String) -> the desired location of the link
*/
function iconLink(img, text, url) {
  var image = document.createElement("img");
  image.src = img;
  var h3 = document.createElement("h3");
  h3.innerHTML = text;
  var div = document.createElement("div");
  div.className = "text-center";
  div.style.padding = "5%";
  var a = document.createElement("a");
  a.href = url;

  a.appendChild(image);
  a.appendChild(h3);
  div.appendChild(a);

  return div;
}

/* Using a AJAX-fetched JSON file, updates 'Upcoming events' on homepage
resp (XMLHttpRequest) -> the response object containing the JSON string
*/
function jsonUpdateEvents(resp) {
  if (resp.readyState === 4 && resp.status === 200) {
      var div = document.getElementById("main");
      var json = JSON.parse(resp.responseText);

      div.appendChild(grid(
          3,
          [
            hyperlinkElement(
              contactCard(json.events[0].img, "Upcoming Events", json.events[0].name),
              "events.html",
              ""
            ),
            hyperlinkElement(
              contactCard("img/worship.jpg", "Plan Your Visit", "Come and Worship With Us"),
              "visit.html",
              ""
            ),
            hyperlinkElement(
              contactCard("img/group.jpg", "Find a Small Group", "Join our Ministries"),
              "ministries.html",
              ""
            )
          ],
          "",
          ["", "", ""]
        )
      );
  }
}

/* Creates a Google map given the source url
returns -> an iframe containing the specified Google map
source (string) -> the URL of the desired map
w (string) -> width of the map
h (string) -> height of the map
*/
function map(source, w, h) {
  var iframe = document.createElement("iframe");
  iframe.className = "center-block whitespace-sm";
  iframe.id = "map";
  iframe.src = source;
  iframe.width = w;
  iframe.height = h;
  iframe.frameborder = "0";
  iframe.style.borderRadius = "50px";
  return iframe;
}

/*
*/
function brochure(stickyHeading, stickyText, photos, headings, paragraphs) {
  //Content (left side)
  var content = document.createElement("div");
  for(var i = 0; i < headings.length; i++) {
    content.appendChild(
      picture(photos[i], "", "img-rounded")
    );
    content.appendChild(
      text(headings[i], "h1", "whitespace-sm")
    );
    content.appendChild(
      text(paragraphs[i], "p", "whitespace-sm")
    );
    var space = document.createElement("div");
    space.style.padding = "5%";
    content.appendChild(space);
  }

  //persistent/sticky text (right side)
  var sticky = document.createElement("div");
  for(var i = 0; i < stickyHeading.length; i++) {
	  sticky.appendChild(
		text(stickyHeading[i], "h4", "")
	  );
	  sticky.appendChild(
		text(stickyText[i], "p","whitespace-sm")
	  );
  }

  return grid(2, [content, sticky], "", ["stackable", "light-gray whitespace-sm img-rounded sticky"]);
}

function carousel(images) {
	var carousel = document.createElement("div");
	carousel.id = "carousel";
	carousel.className = "carousel slide";
	var ride = document.createAttribute("data-ride");
	ride.value = "carousel";
	carousel.setAttributeNode(ride);
	
	var indicators = document.createElement("ol");
	indicators.className = "carousel-indicators";
	
	var inner = document.createElement("div");
	inner.className = "carousel-inner";
	
	for(var i = 0; i < images.length; i++) {
		var item = document.createElement("li");
		var target = document.createAttribute("data-target");
		ride.target = "#carousel";
		var slideto = document.createAttribute("data-slide-to");
		slideto.value = "" + i;
		item.setAttributeNode(target);
		item.setAttributeNode(slideto);
		
		var imgHolder = document.createElement("div");
		imgHolder.className = "item";
		var pic = document.createElement("img");
		pic.src = images[i];
		pic.style.width = "100%";
		imgHolder.appendChild(pic);
		if(i === 0) {
			item.className = "active";
			imgHolder.className += " active";
		}
		
		inner.appendChild(imgHolder);
		indicators.appendChild(item);
	}
	
	var left = document.createElement("a");
	left.className = "left carousel-control";
	left.href = "#carousel";
	var leftSlide = document.createAttribute("data-slide");
	leftSlide.value = "prev";
	left.setAttributeNode(leftSlide);
	var spanLeft1 = document.createElement("span");
	spanLeft1.className = "glyphicon glyphicon-chevron-left";
	var spanLeft2 = document.createElement("span");
	spanLeft2.className = "sr-only";
	spanLeft2.innerHTML = "Previous";
	left.appendChild(spanLeft1);
	left.appendChild(spanLeft2);
	
	var right = document.createElement("a");
	right.className = "right carousel-control";
	right.href = "#carousel";
	var rightSlide = document.createAttribute("data-slide");
	rightSlide.value = "next";
	right.setAttributeNode(rightSlide);
	var spanRight1 = document.createElement("span");
	spanRight1.className = "glyphicon glyphicon-chevron-right";
	var spanRight2 = document.createElement("span");
	spanRight2.className = "sr-only";
	spanRight2.innerHTML = "Next";
	right.appendChild(spanRight1);
	right.appendChild(spanRight2);
	
	carousel.appendChild(indicators);
	carousel.appendChild(inner);
	carousel.appendChild(left);
	carousel.appendChild(right);
	
	return carousel;
}
