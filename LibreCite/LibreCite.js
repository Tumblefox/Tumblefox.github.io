
/**
 * Given the user's selected citation format, load the input to select citation type
 * @author A'Jee Sieka
 */
function loadTypeInput() {
	//get format value and form element
	format = document.getElementById("format").value;
	citeForm = document.getElementById("citeForm");
	
	//create and add the selection input
	selectInput = document.createElement("select");
	selectInput.id = "citeType";
	selectInput.className = "w3-input w3-green";
	selectInput.onchange = function(){loadIEEEInputSet()};
	citeForm.appendChild(selectInput);
	
	//add initial blank option
	blankOption = document.createElement("option");
	blankOption.innerHTML = "Select Citation Type";
	selectInput.appendChild(blankOption);

	if (format == "ieee")
		ieeeTypes();

	if (format == "mla")
		mlaTypes();
}
/**
 * A loose translation of Java's String.format() to JS; Takes a string, replaces placeholders (in this case, '[*]') with elements in an array
 * @param {string} fString The target string containing placeholders
 * @param {array} entry Array containing values to replace the target string's placeholders
 * @return {string} Returns formatted string
 * @author A'Jee Sieka
 */
 function stringFormat(fString, entry) {
	 //argument[0] is the format string (ex. "My name is [*]")
	 //[*] is used in palce of sequential numbering [0], [1], [2]...
	 //string = arguments[0].split("[*]");
	 string = fString.split("[*]");
	 
	 output = "";

	 for (i = 0; i < entry.length; i++) {
		 if (entry[i] != "") {
			 output += string[i] + entry[i];
		 }
	 }
	 
	 return output;
 }
/**
 * Given the user's selected citation format, load the input to select citation type
 * @param {string} name Formats the given name to meet citation standards (ex. Walter William White -> W. W. White)
 * @author A'Jee Sieka
 */
 function formatName(name) {
	string = "";
	
	words = name.split(" ");
	//if there is only one name, return it
	if (words.length == 1)
		return name;
	//format the name (currently only works with single name)
	for (i = 0; i < words.length - 1; i++) {
		words[i] = words[i].substr(0, 1) + ". ";
		string += words[i];
	}
	
	string += words[words.length - 1];
	
	return string;
 }
/**
 * Reset the form to its initial state
 * @author A'Jee Sieka
 */
 function resetForm() {
	 
	 citeForm = document.getElementById("citeForm");
	 count = citeForm.childElementCount();
	 
	 if (count > 1) {
		 format = document.getElementById("format");
	 
		 for (i = 0; i < count; i++) {
			if (citeForm.childNodes[i] != format) {
				citeForm.removeChild(citeForm.childNodes(i));
			}
		 }
	 }
 }

//|--------------------------------------IEEE---------------------------------------------|
/**
 * Populate the select input with options of IEEE citation types 
 * @author A'Jee Sieka
 */
function ieeeTypes() {
	//Created using this manual: https://www.ieee.org/documents/ieeecitationref.pdf
	types = ["Book", "Handbook", "Report", "Conference Technical Article", "Conference Technical Article (Electronic; no page numbers)",
	"Conference Technical Article (Unpublished)", "FTP", "WWW", "Email", "Telnet", "Patent", "Standard", "Thesis",
	"Dissertation", "Unpublished (Communication)", "Unpublished (Paper)", "Periodical"];
	
	for (i = 0; i < types.length; i++)  {
		type = document.createElement("option");
		type.innerHTML = types[i];
		//value will be its corresponding index of types[]
		type.value = i;
		
		document.getElementById("citeType").appendChild(type);
	}
}
/**
 * Loads the set of neccessary inputs for citation
 * @author A'Jee Sieka
 */
 function loadIEEEInputSet() {
	 type = document.getElementById("citeType").value;
	 citeForm = document.getElementById("citeForm");
	 
	 //resetForm();
	 
	 if (type == 0)
		 ieeeBook();
	 if (type == 1)
		 ieeeHandbook();
	 if (type == 2)
		 ieeeReport();
	 if (type == 3 || type == 4 || type == 5)
		 ieeeCTA(type);
	 if (type == 6)
		 ieeeFTP();
	 if (type == 7)
		 ieeeWWW();
	 if (type == 8)
		 ieeeEmail();
	 if (type == 9)
		 ieeeTelnet();
	 if (type == 10)
		 ieeePatent();
	 if (type == 11)
		 ieeeStandard();
	 if (type == 12)
		 ieeeThesis();
	 if (type == 13)
		 ieeeDisseration();
	 if (type == 14)
		 ieeeUnpubComm();
	 if (type == 15)
		 ieeeUnpubPaper();
	 if (type == 16)
		 ieeePeriodical();
	 
	 submitButton = document.createElement("input");
	 submitButton.type = "button";
	 submitButton.value = "Cite";
	 submitButton.onclick = function(){writeCitation(type)};
	 submitButton.className = "w3-button w3-green w3-hover-lime";
	 citeForm.appendChild(submitButton);
	 
	 resetButton = document.createElement("input");
	 resetButton.type = "button";
	 resetButton.value = "Reset";
	 resetButton.onclick = function(){resetForm()};
	 resetButton.className = "w3-button w3-red w3-hover-pink";
	 citeForm.appendChild(resetButton);
 }
 /**
 * Creates input set for an IEEE book citation
 * @author A'Jee Sieka
 */
 function ieeeBook() {
	 citeForm = document.getElementById("citeForm");
	 
	 //tags[] contains all the important book information
	 tags = ["author", "chapter-name", "title", "edition", "publisher-city",
	 "state/country", "publisher-abbreviation", "year", "chapter-number", "section-number", "page-range"];

	 //generate inputs 
	 for (i = 0; i < tags.length; i++) {
		input = document.createElement("input");
		input.id = tags[i];
		input.placeholder = tags[i];
		input.className = "w3-input";
		citeForm.appendChild(input);
	 }
 }
  /**
 * Creates input set for an IEEE handbook citation
 * @author A'Jee Sieka
 */
 function ieeeHandbook() {
	 citeForm = document.getElementById("citeForm");
	 
	 //tags[] contains all the important book information
	 tags = ["handbook-name", "edition", "company-name-abbreviation", "company-city",
	 "state/country",  "year", "page-range"];

	 //generate inputs 
	 for (i = 0; i < tags.length; i++) {
		input = document.createElement("input");
		input.id = tags[i];
		input.placeholder = tags[i];
		input.className = "w3-input";
		citeForm.appendChild(input);
	 }
 }
/**
 * Creates input set for an IEEE report citation
 * @author A'Jee Sieka
 */
 function ieeeReport() {
	 citeForm = document.getElementById("citeForm");
	 
	 //tags[] contains all the important book information
	 tags = ["author", "title", "company-name-abbreviation", "company-city",
	 "state/country",  "report-number", "date"];

	 //generate inputs 
	 for (i = 0; i < tags.length; i++) {
		input = document.createElement("input");
		input.id = tags[i];
		input.placeholder = tags[i];
		input.className = "w3-input";
		citeForm.appendChild(input);
	 }
 }
/**
 * Creates input set for an IEEE Conference Technical Article citation. Takes into account electronic and unpublished articles
 * @author A'Jee Sieka
 * @param {number} type The type of Conference technical article
 */
  function ieeeCTA(type) {
	 citeForm = document.getElementById("citeForm");
	 
	 //basic
	 if (type == 3) {
		 tags = ["author", "title", "full-conference-name", "conference-city",
		 "state/country",  "year", "page-range"];
	 }
	 //electronic, no page numbers
	 if (type == 4) {
		 tags = ["author", "title", "title-of-conference-record", "copyright-year",
		 "copyright-holder",  "DOI-number"];
	 }
	 //unpublished
	 if (type == 5) {
		 tags = ["author", "title", "full-conference-name", "conference-city",
		 "state/country",  "year"];
	 }

	 //generate inputs 
	 for (i = 0; i < tags.length; i++) {
		input = document.createElement("input");
		input.id = tags[i];
		input.placeholder = tags[i];
		input.className = "w3-input";
		citeForm.appendChild(input);
	 }
 }
 /**
 * Creates input set for an IEEE FTP citation
 * @author A'Jee Sieka
 */
 function ieeeFTP() {
	 citeForm = document.getElementById("citeForm");
	 
	 //tags[] contains all the important book information
	 tags = ["author", "year", "title", "FTP", "directory", "file"];

	 //generate inputs 
	 for (i = 0; i < tags.length; i++) {
		input = document.createElement("input");
		input.id = tags[i];
		input.placeholder = tags[i];
		input.className = "w3-input";
		citeForm.appendChild(input);
	 }
 }
/**
 * Creates input set for an IEEE Website (WWW) citation
 * @author A'Jee Sieka
 */
 function ieeeWWW() {
	 citeForm = document.getElementById("citeForm");
	 
	 //tags[] contains all the important book information
	 tags = ["author", "date", "title", "URL"];

	 //generate inputs 
	 for (i = 0; i < tags.length; i++) {
		input = document.createElement("input");
		input.id = tags[i];
		input.placeholder = tags[i];
		input.className = "w3-input";
		citeForm.appendChild(input);
	 }
 }
/**
 * Creates input set for an IEEE Email citation
 * @author A'Jee Sieka
 */
 function ieeeEmail() {
	 citeForm = document.getElementById("citeForm");
	 
	 //tags[] contains all the important book information
	 tags = ["author", "date", "title", "sender-email-address", "email-message"];

	 //generate inputs 
	 for (i = 0; i < tags.length; i++) {
		input = document.createElement("input");
		input.id = tags[i];
		input.placeholder = tags[i];
		input.className = "w3-input";
		citeForm.appendChild(input);
	 }
 }
 /**
 * Creates input set for an IEEE Telnet citation
 * @author A'Jee Sieka
 */
 function ieeeTelnet() {
	 citeForm = document.getElementById("citeForm");
	 
	 //tags[] contains all the important book information
	 tags = ["author", "date", "title", "Telnet", "directory", "file"];

	 //generate inputs 
	 for (i = 0; i < tags.length; i++) {
		input = document.createElement("input");
		input.id = tags[i];
		input.placeholder = tags[i];
		input.className = "w3-input";
		citeForm.appendChild(input);
	 }
 }
/**
 * Creates input set for an IEEE Patent citation
 * @author A'Jee Sieka
 */
 function ieeePatent() {
	 citeForm = document.getElementById("citeForm");
	 
	 //tags[] contains all the important book information
	 tags = ["author", "patent-title", "us-patent-number", "date"];

	 //generate inputs 
	 for (i = 0; i < tags.length; i++) {
		input = document.createElement("input");
		input.id = tags[i];
		input.placeholder = tags[i];
		input.className = "w3-input";
		citeForm.appendChild(input);
	 }
 }
 /**
 * Creates input set for an IEEE Standard citation
 * @author A'Jee Sieka
 */
 function ieeeStandard() {
	 citeForm = document.getElementById("citeForm");
	 
	 //tags[] contains all the important book information
	 tags = ["standard-title", "standard-number", "date"];

	 //generate inputs 
	 for (i = 0; i < tags.length; i++) {
		input = document.createElement("input");
		input.id = tags[i];
		input.placeholder = tags[i];
		input.className = "w3-input";
		citeForm.appendChild(input);
	 }
 }
  /**
 * Creates input set for an IEEE Master's thesis citation
 * @author A'Jee Sieka
 */
 function ieeeThesis() {
	 citeForm = document.getElementById("citeForm");
	 
	 //tags[] contains all the important book information
	 tags = ["author", "title", "abbreviated-department", "abbreviated-university",
	 "city-of-university", "state/country", "year"];

	 //generate inputs 
	 for (i = 0; i < tags.length; i++) {
		input = document.createElement("input");
		input.id = tags[i];
		input.placeholder = tags[i];
		input.className = "w3-input";
		citeForm.appendChild(input);
	 }
 }
  /**
 * Creates input set for an IEEE Doctorate's dissertation citation
 * @author A'Jee Sieka
 */
 function ieeeDisseration() {
	 citeForm = document.getElementById("citeForm");
	 
	 //tags[] contains all the important book information
	 tags = ["author", "title", "abbreviated-department", "abbreviated-university",
	 "city-of-university", "state/country", "year"];

	 //generate inputs 
	 for (i = 0; i < tags.length; i++) {
		input = document.createElement("input");
		input.id = tags[i];
		input.placeholder = tags[i];
		input.className = "w3-input";
		citeForm.appendChild(input);
	 }
 }
   /**
 * Creates input set for an IEEE unpublished, private communication citation
 * @author A'Jee Sieka
 */
 function ieeeUnpubComm() {
	 citeForm = document.getElementById("citeForm");
	 
	 //tags[] contains all the important book information
	 tags = ["author", "date"];

	 //generate inputs 
	 for (i = 0; i < tags.length; i++) {
		input = document.createElement("input");
		input.id = tags[i];
		input.placeholder = tags[i];
		input.className = "w3-input";
		citeForm.appendChild(input);
	 }
 }
   /**
 * Creates input set for an IEEE unpublished published citation
 * @author A'Jee Sieka
 */
 function ieeeUnpubPaper() {
	 citeForm = document.getElementById("citeForm");
	 
	 //tags[] contains all the important book information
	 tags = ["author", "title"];

	 //generate inputs 
	 for (i = 0; i < tags.length; i++) {
		input = document.createElement("input");
		input.id = tags[i];
		input.placeholder = tags[i];
		input.className = "w3-input";
		citeForm.appendChild(input);
	 }
 }
   /**
 * Creates input set for an IEEE periodical citation
 * @author A'Jee Sieka
 */
 function ieeePeriodical() {
	 citeForm = document.getElementById("citeForm");
	 
	 //tags[] contains all the important book information
	 tags = ["author", "paper-name", "abbreviated-periodical-title", "volume",
	 "number", "page-range", "date"];

	 //generate inputs 
	 for (i = 0; i < tags.length; i++) {
		input = document.createElement("input");
		input.id = tags[i];
		input.placeholder = tags[i];
		input.className = "w3-input";
		citeForm.appendChild(input);
	 }
 }
  /**
 * Given the data and citation type, writes the appropriate citation
 * @param {string} type The type of citation to write
 * @author A'Jee Sieka
 */
 function writeCitation(type) {
	 citation = "[X] ";
	 
	 //Book
	 if (type == 0) {
		 entry = [formatName(document.getElementById("author").value), document.getElementById("chapter-name").value,
		 document.getElementById("title").value, document.getElementById("edition").value,
		 document.getElementById("publisher-city").value, document.getElementById("state/country").value,
		 document.getElementById("publisher-abbreviation").value, document.getElementById("year").value,
		 document.getElementById("chapter-number").value, document.getElementById("section-number").value,
		 document.getElementById("page-range").value];
		 
		 fString = '[*], "[*]," in <i>[*]</i>, <i>[*]</i> ed. [*], [*]: [*], [*], ch. <i>[*]</i>, sec. <i>[*]</i>, pp. <i>[*]</i>';
		 
		 citation += stringFormat(fString, entry);
	 }
	 //Handbook
	 if (type == 1) {
		 entry = [document.getElementById("handbook-name").value, document.getElementById("edition").value,
		 document.getElementById("company-name-abbreviation").value, document.getElementById("company-city").value,
		 document.getElementById("state/country").value, document.getElementById("year").value,
		 document.getElementById("page-range").value];

		 fString = '<i>[*]</i>, <i>[*]</i> ed., [*], [*], [*], [*], pp. <i>[*]</i>';
		 
		 citation += stringFormat(fString, entry);
	 }
	 //Report
	 if (type == 2) {
		 entry = [formatName(document.getElementById("author").value), document.getElementById("title").value,
		 document.getElementById("company-name-abbreviation").value, document.getElementById("company-city").value,
		 document.getElementById("state/country").value, document.getElementById("report-number").value,
		 document.getElementById("date").value];
 
		 fString = '[*], “[*],” [*], [*], [*], Rep. <i>[*]</i>, [*]';
		 
		 citation += stringFormat(fString, entry);
	 }
	 //Conference Technical Article (basic)
	 if (type == 3) {
		 entry = [formatName(document.getElementById("author").value), document.getElementById("title").value,
		 document.getElementById("full-conference-name").value, document.getElementById("conference-city").value,
		 document.getElementById("state/country").value, document.getElementById("year").value,
		 document.getElementById("page-range").value];
 
		 fString = '[*], “[*],” in <i>[*]</i>, [*], [*], [*], pp. <i>[*]</i>.';
		 
		 citation += stringFormat(fString, entry);
	 }
	 //Conference Technical Article (electronic)
	 if (type == 4) {
		 entry = [formatName(document.getElementById("author").value), document.getElementById("title").value,
		 document.getElementById("title-of-conference-record").value, document.getElementById("copyright-year").value,
		 document.getElementById("copyright-holder").value, document.getElementById("DOI-number").value];
 
		 fString = '[*], “[*],” in <i>[*]</i>, [*] © [*]. doi: [*]';
		 
		 citation += stringFormat(fString, entry); 
	 }
	 //Conference Technical Article (unpublished)
	 if (type == 5) {
		 entry = [formatName(document.getElementById("author").value), document.getElementById("title").value,
		 document.getElementById("full-conference-name").value, document.getElementById("conference-city").value,
		 document.getElementById("state/country").value, document.getElementById("year").value];
 
		 fString = '[*], “[*],” presented at the [*], [*], [*], [*].';
		 
		 citation += stringFormat(fString, entry);
	 }
	 //FTP
	 if (type == 6) {
		 entry = [formatName(document.getElementById("author").value), document.getElementById("year").value,
		 document.getElementById("title").value, document.getElementById("FTP").value,
		 document.getElementById("directory").value, document.getElementById("file").value];
 
		 fString = '[*]. ([*]). <i>[*]</i> [Online]. Available FTP: [*] Directory: [*] File: [*]';
		 
		 citation += stringFormat(fString, entry);
	 }
	 //WWW
	 if (type == 7) {
		 entry = [formatName(document.getElementById("author").value), document.getElementById("date").value,
		 document.getElementById("title").value, document.getElementById("URL").value];
 
		 fString = '[*]. ([*]). <i>[*]</i> [Online]. Available: [*]';
		 
		 citation += stringFormat(fString, entry);
	 }
	 //Email
	 if (type == 8) {
		 entry = [formatName(document.getElementById("author").value), document.getElementById("date").value,
		 document.getElementById("title").value, document.getElementById("sender-email-address").value,
		 document.getElementById("email-message").value];
 
		 fString = '[*]. ([*]). <i>[*]</i> [Online]. Available e-mail: [*] Message: [*]';
		 
		 citation += stringFormat(fString, entry);
	 }
	 //Telnet
	 if (type == 9) {
		 entry = [formatName(document.getElementById("author").value), document.getElementById("date").value,
		 document.getElementById("title").value, document.getElementById("Telnet").value,
		 document.getElementById("directory").value, document.getElementById("file").value];
 
		 fString = '[*]. ([*]). <i>[*]</i> [Online]. Available Telnet: [*] Directory: [*] File: [*]';
		 
		 citation += stringFormat(fString, entry);
	 }
	 //Patent
	 if (type == 10) {
		 entry = [formatName(document.getElementById("author").value), document.getElementById("patent-title").value,
		 document.getElementById("us-patent-number").value, document.getElementById("date").value];
 
		 fString = '[*], “[*],” U.S. Patent <i>[*]</i>, [*].';
		 
		 citation += stringFormat(fString, entry);
	 }
	 //Standard
	 if (type == 11) {
		 entry = [document.getElementById("standard-title").value, document.getElementById("standard-number").value,
		 document.getElementById("date").value];
 
		 fString = '<i>[*]</i>, [*], [*].';
		 
		 citation += stringFormat(fString, entry);
	 }
	 //Thesis
	 if (type == 12) {
		 entry = [formatName(document.getElementById("author").value), document.getElementById("title").value,
		 document.getElementById("abbreviated-department").value, document.getElementById("abbreviated-university").value,
		 document.getElementById("city-of-university").value, document.getElementById("state/country").value,
		 document.getElementById("year").value];
 
		 fString = '[*], “[*],” M.S. thesis, [*], [*], [*], [*], [*].';
		 
		 citation += stringFormat(fString, entry);
	 }
	 //Dissertation
	 if (type == 13) {
		 entry = [formatName(document.getElementById("author").value), document.getElementById("title").value,
		 document.getElementById("abbreviated-department").value, document.getElementById("abbreviated-university").value,
		 document.getElementById("city-of-university").value, document.getElementById("state/country").value,
		 document.getElementById("year").value];
 
		 fString = '[*], “[*],” Ph.D. dissertation, [*], [*], [*], [*], [*].';
		 
		 citation += stringFormat(fString, entry);
	 }
	 //Unpublished communication
	 if (type == 14) {
		 entry = [formatName(document.getElementById("author").value), document.getElementById("date").value];
 
		 fString = '[*], private communication, [*].';
		 
		 citation += stringFormat(fString, entry);
	 }
	 //Unpublished paper
	 if (type == 15) {
		 entry = [formatName(document.getElementById("author").value), document.getElementById("title").value];
 
		 fString = '[*], “[*],” unpublished.';
		 
		 citation += stringFormat(fString, entry);
	 }
	 //Periodical
	 if (type == 16) {
		 entry = [formatName(document.getElementById("author").value), document.getElementById("paper-name").value,
		 document.getElementById("abbreviated-periodical-title").value, document.getElementById("volume").value,
		 document.getElementById("number").value, document.getElementById("page-range").value,
		 document.getElementById("date").value];
 
		 fString = '[*], “[*],” <i>[*]</i>, vol. <i>[*]</i>, no. <i>[*]</i>, pp. <i>[*]</i>, [*]';
		 
		 citation += stringFormat(fString, entry);
	 }

	 document.getElementById("bibTextArea").innerHTML += citation + "<br>";
 }

//|-------------------------------------------------MLA------------------------------------------------------|
/**
 * Given the user's selected MLA citation type, 
 * @author A'Jee Sieka
 * @param {string} type The user given format of citation.
 */
function mlaTypes() {
	/*Created using these manuals: 
	https://owl.english.purdue.edu/owl/resource/747/06/
	https://owl.english.purdue.edu/owl/resource/747/07/
	https://owl.english.purdue.edu/owl/resource/747/09/
	
	*/
	types = ["Book", "Book (Translated)", "Book (Republished)", "Book (nth Edition)", "Book (Editor prepared)",
	"Book (Anthonlogy/Collection)", "Book (Single Work in an Anthology)", "Book (Article in Reference Book)",
	"Book (Multi-Volume Work)", "Book (Introduction)", "Book (Preface)","Book (Forword)", "Book (Afterword)",
	"Book (Pre-1900s)", "Book (Government Publication)", "Book (Pamphet)", "Book(Dissertation)", "Book(Master Thesis)",
	"Article (Magazine)", "Article (Newspaper)", "Article (Review)", "Article (Editorial)", "Article (Letter To Editor)",
	"Article (Anonymous)", "Article (Scholarly Journal)", "Article (Special Issue Scholarly Journal)",
	"Website (Course)", "Website (Department)", "Webpage", "Web Image", "Online Article (Web Magazine)",
	"Online Article (Online Scholarly Journal)", "Online Article (Print Scholarly Journal)",
	"Online Article (Online Database)", "Email", "A Listserv/Discussion Group/Blog Posting", "Tweet (Twitter Post)",
	"Youtube Video", "Comment (Website/Article)", "Interview (Personal)", "Interview (Published, Printed)",
	"Interview (Published, Broadcasted)", "Interview (Published, Online)", "Oral Presentation", "Published Conferenc Proceedings",
	"Work of Art (Paint/Sculpture/Photo)", "Song", "Song (Online)", "Album", "Album (Online)", "Film/Movie",
	"TV Episode", "Broadcast TV/Radio", "Online TV Episode", "TV Series", "Podcast", "Spoken Word Album", "Digital Files"];
	
	for (i = 0; i < types.length; i++)  {
		type = document.createElement("option");
		type.innerHTML = types[i];
		//value will be its corresponding index of types[]
		type.value = i;
		
		document.getElementById("citeType").appendChild(type);
	}
}