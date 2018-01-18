/**
 * A construction project estimator
 * @author A'Jee Sieka
 */

conCount = 0;
matCount = 0;
hrCount = 0;
specCount = 0;
doc = null;

/**
 *Generates all the necessary forms
 */
function init() {
	project();
	contacts();
	material();
	hours();
	specialists();
	controls();
}

/**
 * Creates the control buttons used to switch forms
 */
function controls() {
	div = document.getElementById("project");
	
	next = buttonInput(">", function() {nextAction();});
	next.className = "w3-button w3-amber w3-hover-yellow w3-round";
	next.id = "next";
	prev = buttonInput("<", function() {prevAction();});
	prev.className = "w3-button w3-amber w3-hover-yellow w3-round";
	prev.id = "prev";
	
	div.appendChild(prev);
	div.appendChild(next);
}
/**
 * Creates the project form
 */
function project() {
	//Set Header
	document.getElementById("header").innerHTML = "New Project";
	//Get project div, create form
	div = document.getElementById("project");
	projectForm = document.createElement("div");
	projectForm.id = "projectForm";
	projectForm.className = "w3-container w3-animate-left";
	
	//Title (TODO: Required)
	title = textInput("Project Title");
	title.className = "w3-input";
	title.name = "prj";
	title.required = true;
	//Short Description 
	desc = document.createElement("textarea");
	desc.placeholder = "Short Project Description";
	desc.className = "w3-input";
	desc.name = "desc";
	desc.required = true;
	//Business/Contractor Name (TODO: Required)
	business = textInput("Business or Contractor Name");
	business.className = "w3-input";
	business.name = "busi";
	business.required = true;
	
	//Add inputs
	projectForm.appendChild(title);
	projectForm.appendChild(desc);
	projectForm.appendChild(business);
	div.appendChild(projectForm);
}
/**
 * Creates the contacts form
 */
function contacts() {
	div = document.getElementById("project");
	contactsForm = document.createElement("div");
	contactsForm.className = "w3-container w3-animate-left";
	contactsForm.id = "contactsForm";
	contactsForm.style.display = "none";
	
	repeatContacts(contactsForm);
	
	div.appendChild(contactsForm);
	
	//Count
	count = document.createElement("input");
	count.type = "text";
	count.name = "conCount";
	count.id = "conCount";
	count.style.display = "none";
	div.appendChild(count);
}
/**
 * Adds contact inputs to the given form
 * @param {string} contactForm The target for for the inputs
 */
function repeatContacts(contactForm) {
	//Name
	cName = textInput("Contact Name");
	cName.className = "w3-input";
	cName.name = "con" + conCount;
	//Job
	job = textInput("Job Title");
	job.className = "w3-input";
	job.name = "conJob" + conCount;
	//Phone Number
	phone = textInput("Phone Number");
	phone.className = "w3-input";
	phone.name = "conPhone" + conCount;
	//Email (TODO: replace with 'email' type)
	email = textInput("Email Address");
	email.className = "w3-input";
	email.name = "conEmail" + conCount;
	//Add button
	add = buttonInput("+", function() {repeatContacts()});
	add.className = "w3-button w3-amber w3-hover-yellow w3-round";
	
	contactsForm.appendChild(cName);
	contactsForm.appendChild(job);
	contactsForm.appendChild(phone);
	contactsForm.appendChild(email);
	contactsForm.appendChild(add);
	conCount++;
}
/**
 * Creates the material form
 */
function material() {
	div = document.getElementById("project");
	materialsForm = document.createElement("div");
	materialsForm.className = "w3-container w3-animate-left";
	materialsForm.id = "materialsForm";
	materialsForm.style.display = "none";
	
	repeatMaterial(materialsForm);
	
	div.appendChild(materialsForm);
	
	//Count
	count = document.createElement("input");
	count.type = "text";
	count.name = "matCount";
	count.id = "matCount";
	count.style.display = "none";
	div.appendChild(count);
}
/**
 * Adds material inputs to the given form
 * @param {string} materialsForm The target for for the inputs
 */
function repeatMaterial(materialsForm) {
	//Name
	mName = textInput("Material");
	mName.className = "w3-input";
	mName.name = "mat" + matCount;
	//Quantity
	q = numberInput("Material quantity");
	q.className = "w3-input";
	q.name = "matQuan" + matCount;
	//Unit Price
	price = numberInput("Price per unit");
	price.className = "w3-input";
	price.name = "matPrice" + matCount;
	//Add button
	add = buttonInput("+", function() {repeatMaterial(materialsForm)});
	add.className = "w3-button w3-amber w3-hover-yellow w3-round";
	
	//Add inputs
	materialsForm.appendChild(mName);
	materialsForm.appendChild(q);
	materialsForm.appendChild(price);
	materialsForm.appendChild(add);
	matCount++;
}
/**
 * Creates the hours form
 */
function hours() {
	div = document.getElementById("project");
	hoursForm = document.createElement("div");
	hoursForm.className = "w3-container w3-animate-left";
	hoursForm.id = "hoursForm";
	hoursForm.style.display = "none";
	
	//Expected Hours
	hours = numberInput("Total Expected work hours");
	hours.className = "w3-input";
	hours.name = "hours";
	hoursForm.appendChild(hours);

	repeatHours(hoursForm);
	
	//Add inputs
	div.appendChild(hoursForm);
	
	//Count
	count = document.createElement("input");
	count.type = "text";
	count.name = "hrCount";
	count.id = "hrCount";
	count.style.display = "none";
	div.appendChild(count);
}
/**
 * Adds hours inputs to the given form
 * @param {string} hoursForm The target for for the inputs
 */
function repeatHours(hoursForm) {
	//Worker rate ($/hr)
	rate = numberInput("Enter the worker's wage");
	rate.className = "w3-input";
	rate.name = "workerRate" + hrCount;
	//Add button
	add = buttonInput("+", function() {repeatHours(hoursForm)});
	add.className = "w3-button w3-amber w3-hover-yellow w3-round";
	
	//Add inputs
	hoursForm.appendChild(rate);
	hoursForm.appendChild(add);
	hrCount++;
}
/**
 * Creates the specialists form
 */
function specialists() {
	div = document.getElementById("project");
	specialistsForm = document.createElement("div");
	specialistsForm.className = "w3-container w3-animate-left";
	specialistsForm.id = "specialistsForm";
	specialistsForm.style.display = "none";
	
	repeatSpecialists(specialistsForm);
	
	div.appendChild(specialistsForm);
	
	//Count
	count = document.createElement("input");
	count.type = "text";
	count.name = "specCount";
	count.id = "specCount";
	count.style.display = "none";
	div.appendChild(count);
}
/**
 * Adds specialists inputs to the given form
 * @param {string} specialistsForm The target for for the inputs
 */
function repeatSpecialists(specialistsForm) {
	//Job Title
	title = textInput("Job Title");
	title.className = "w3-input";
	title.name = "specJob" + specCount;
	//Name
	sName = textInput("Specialist's Name");
	sName.className = "w3-input";
	sName.name = "specName" + specCount;
	//Business
	busi = textInput("Business");
	busi.className = "w3-input";
	busi.name = "specBusi" + specCount;
	//Expected hours
	exp = numberInput("Expected number of work hours");
	exp.className = "w3-input";
	exp.name = "specHrs" + specCount;
	//Work Rate ($/hr)
	rate = numberInput("Cost per hour");
	rate.className = "w3-input";
	rate.name = "specRate" + specCount;
	//Add button
	add = buttonInput("+", function() {repeatHours(repeatSpecialists(specialistsForm))});
	add.className = "w3-button w3-amber w3-hover-yellow w3-round";
	
	//Add inputs
	specialistsForm.appendChild(title);
	specialistsForm.appendChild(sName);
	specialistsForm.appendChild(busi);
	specialistsForm.appendChild(exp);
	specialistsForm.appendChild(rate);
	specialistsForm.appendChild(add);
	specCount++;
	//document.getElementById("specCount").value = specCount;
}
/**
 * When the "next" button is clicked, advanced to the next form
 */
function nextAction() {
	next = document.getElementById("next");
	
	if (document.getElementById("projectForm").style.display != "none") {
		moveForm("contactsForm", "header", "Contacts", "projectForm");
	}
	else if (document.getElementById("contactsForm").style.display != "none") {
		moveForm("materialsForm", "header", "Materials", "contactsForm");
		document.getElementById("conCount").value = conCount;
	}
	else if (document.getElementById("materialsForm").style.display != "none") {
		moveForm("hoursForm", "header", "Work Hours", "materialsForm");
		document.getElementById("matCount").value = matCount;
	}
	else if (document.getElementById("hoursForm").style.display != "none") {
		moveForm("specialistsForm", "header", "Specialists", "hoursForm");
		document.getElementById("hrCount").value = hrCount;
	}
	else if (document.getElementById("specialistsForm").style.display != "none") {
		document.getElementById("specCount").value = specCount;
		document.getElementById("project").submit();
	}
}
/**
 * When the "back" button is clicked, moves the to the previous form
 */
function prevAction() {
	prev = document.getElementById("prev");
	
	if (document.getElementById("contactsForm").style.display != "none") {
		moveForm("projectForm", "header", "New Project", "contactsForm");
	}
	else if (document.getElementById("materialsForm").style.display != "none") {
		moveForm("contactsForm", "header", "Contacts", "materialsForm");
	}
	else if (document.getElementById("hoursForm").style.display != "none") {
		moveForm("materialsForm", "header", "Materials", "hoursForm");
	}
	else if (document.getElementById("specialistsForm").style.display != "none") {
		moveForm("hoursForm", "header", "Work Hours", "specialistsForm");
	}
}
/**
 * Changes the currently visible form
 */
function moveForm(nextForm, header, headerText, currForm) {
	document.getElementById(nextForm).style.display = "initial";
	document.getElementById(header).innerHTML = headerText;
	document.getElementById(currForm).style.display = "none";
}
/**
 * Creates a select input with the given options
 * @param {string} inputName The text value of the first input (will be disabled)
 * @param {array} An array of option to be appended to the new select input
 * @return {element} The specified select input
 */
function selectInput(inputName, options) {
	input = document.createElement("select");
	opt = document.createElement("option");
	opt.text = inputName;
	opt.disabled = true;
	input.appendChild(opt);
	
	for(i = 0; i < options.length; i++) {
		opt = document.createElement("option");
		opt.text = options[i];
		opt.value = options[i];
		input.appendChild(opt);
	}
	
	return input;
}
/**
 * Creates a text input with the given placeholder
 * @param {string} placeholder The desired placeholder of the input
 * @return {element} The specified text input
 */
function textInput(placeholder) {
	input = document.createElement("input");
	input.type = "text";
	input.placeholder = placeholder;
	return input;
}
/**
 * Creates a number input with the given placeholder
 * @param {string} placeholder The desired placeholder of the input
 * @return {element} The specified number input
 */
function numberInput(placeholder) {
	input = document.createElement("input");
	input.type = "number";
	input.placeholder = placeholder;
	return input;
}
/**
 * Creates a button input with the given properties
 * @param {string} inputName The text value of the first input (will be disable)
 * @param {function} action The action to be performed when thee button is clicked
 * @return {element} The specified button input
 */
function buttonInput(value, action) {
	input  = document.createElement("input");
	input.type = "button";
	input.value = value;
	input.onclick = action;
	return input;
}
/**
 * Retrieves the specified URL variable (GET method) and returns it's value
 * @param {string} variable The name of the desired variable
 * @return {value} The value of the specified variable
 */
function get(variable) {
	url = window.location.href;
	
	reg = new RegExp("[?&]" + variable + "(=([^&#]*)|&|#|$)");
	results = reg.exec(url);
	if (!results) 
		return null;
	if (!results[2]) 
		return '';
	
	return decodeURIComponent(results[2].replace(/\+/g, " "));
}
/**
 * Checks if the "required" variables in a set are empty
 * @param {array} variables The required variables
 * @return {boolean} True if the "required" variables are set, false if not
 */
function emptyVar(variables) {
	result = false;
	for(i = 0; i < variables.length; i++) {
		if(variables == "")
			result = true;
	}
	
	return result;
}
/**
 * Properly formats a currency value
 * @param {number} number The required variables
 * @return {string} The formatted curency value
 */
 function formatCurrency(value) {
	 temp = value.toString();
	 split = temp.split("");
	 result = "$";
	 current = 0;
	 
	 if (split.length <= 3) {
		 result += temp;
		 return result;
	 }
		 
	 if (split.length % 3 == 0) {
		 result += split[0] + split[1] + split[2] + ",";
		 current = 3;
	 }
	 else if ((split.length + 1) % 3 == 0){
		 result += split[0] + split[1] + ",";
		 current = 2;
	 }
	 else if ((split.length - 1) % 3 == 0){
		 result += split[0] + ",";
		 current = 1;
	 }
	 for(i = current; i < split.length; i++) {
		 result += split[i] + split[i + 1] + split[i + 2];
		 i += 2;
		 if(i+1 < split.length)
			 result += ",";
	 }
	 
	 return result;
 }
/**
 * Writes the given form data to a PDF
 */
function toPDF() {
	lineHeight = 40;
	totalCost = 0;
	//40 units = 1 in. margin
	//105x units = centered
	doc = new jsPDF();
	doc.setFont("helvetica");
	pageHeight = doc.internal.pageSize.height - 40;
	
	//*****Head*****
	prj = get("prj");
	document.getElementById("prj").innerHTML = prj;
	desc = get("desc");
	document.getElementById("desc").innerHTML = desc;
	busi = get("busi");
	document.getElementById("busi").innerHTML = busi;
	//Project Title
	doc.setFontSize(30);
	doc.text(105, lineHeight, doc.splitTextToSize(prj, 160), null, null, 'center');
	//Business/Contractor Name
	doc.setFontSize(12);
	doc.setFont("times");
	doc.setFontType("italic");
	lineHeight += 10;
	doc.text(105, lineHeight, doc.splitTextToSize(busi, 160), null, null, 'center');
	//Project Description
	doc.setFont("helvetica");
	doc.setFontType("bold");
	lineHeight += 10;
	doc.text(20, lineHeight, "Project Description");
	doc.setFontType("normal");
	lineHeight += 10;
	doc.text(20, lineHeight, doc.splitTextToSize(desc, 160));
	
	//*****Body*****
	//Contacts
	conCount = get("conCount");
	if(conCount == 1 && emptyVar([get("con0")]))
		conCount = 0;
		
	conHead = "Contacts (" + conCount + ")";
	doc.setFontType("bold");
	lineHeight += 20;
	doc.text(20, lineHeight, conHead);
	doc.setFontType("normal");
	for (i = 0; i < conCount; i++) {
		lineHeight += 10;
		if (lineHeight >= pageHeight) {doc.addPage(); lineHeight = 40;}
		con = get("con" + i);
		conJob = get("conJob" + i);
		conPhone = get("conPhone" + i);
		conEmail = get("conEmail" + i);
		
		if (con != "" && conJob != "" && conPhone != "" && conEmail != "") {
			doc.text(20, lineHeight, doc.splitTextToSize(con, 160));
			lineHeight += 5;
			if (lineHeight >= pageHeight) {doc.addPage(); lineHeight = 40;}
			doc.text(20, lineHeight, doc.splitTextToSize(conJob, 160));
			lineHeight += 5;
			if (lineHeight >= pageHeight) {doc.addPage(); lineHeight = 40;}
			doc.text(20, lineHeight, doc.splitTextToSize(conPhone, 160));
			lineHeight += 5;
			if (lineHeight >= pageHeight) {doc.addPage(); lineHeight = 40;}
			doc.text(20, lineHeight, doc.splitTextToSize(conEmail, 160));
		}
		else {
			doc.text(20, lineHeight, "N/A");
		}
	}
	lineHeight += 20;
	if (lineHeight >= pageHeight) {doc.addPage(); lineHeight = 40;}
	//Materials
	matCount = get("matCount");
	if(matCount == 1 && emptyVar([get("mat0")]))
		matCount = 0;
	
	matHead = "Materials, Fees, Permits (" + matCount + ")";
	doc.setFontType("bold");
	doc.text(20, lineHeight, matHead);
	doc.setFontType("normal");
	for (i = 0; i < matCount; i++) {
		lineHeight += 10;
		if (lineHeight >= pageHeight) {doc.addPage(); lineHeight = 40;}
		mat = get("mat" + i);
		matQuan = get("matQuan" + i) + " units";
		//matPrice = "$" + get("matPrice" + i) + " per unit";
		matPrice = formatCurrency(get("matPrice" + i)) + " per unit";
		
		if (mat != "" && matQuan != "" && matPrice != "") {
			doc.setFontType("italic");
			doc.text(20, lineHeight, doc.splitTextToSize(mat, 160));
			lineHeight += 5;
			if (lineHeight >= pageHeight) {doc.addPage(); lineHeight = 40;}
			doc.setFontType("normal");
			doc.text(20, lineHeight, doc.splitTextToSize(matQuan, 160));
			lineHeight += 5;
			if (lineHeight >= pageHeight) {doc.addPage(); lineHeight = 40;}
			doc.text(20, lineHeight, doc.splitTextToSize(matPrice, 160));
			
			totalCost += get("matQuan" + i) * get("matPrice" + i);
		}
		else {
			doc.text(20, lineHeight, "N/A");
		}
	}
	lineHeight += 20;
	if (lineHeight >= pageHeight) {doc.addPage(); lineHeight = 40;}
	//Hours
	hrCount = get("hrCount");
	hrHead = "Expected Work Hours: " + get("hours");
	doc.setFontType("bold");
	doc.text(20, lineHeight, hrHead);
	lineHeight += 10;
	if (lineHeight >= pageHeight) {doc.addPage(); lineHeight = 40;}
	doc.text(20, lineHeight, "Worker Pay Rates (" + hrCount + ")");
	doc.setFontType("normal");
	
	divHr = get("hours") / hrCount;
	for (i = 0; i < hrCount; i++) {
		lineHeight += 5;
		if (lineHeight >= pageHeight) {doc.addPage(); lineHeight = 40;}
		//workerRate = "$" + get("workerRate" + i) + "/hr";
		workerRate = formatCurrency(get("workerRate" + i)) + "/hr";
		
		doc.text(20, lineHeight, doc.splitTextToSize(workerRate, 160));
		
		totalCost += get("workerRate" + i) * divHr;
	}
	lineHeight += 20;
	if (lineHeight >= pageHeight) {doc.addPage(); lineHeight = 40;}
	//Specialists
	specCount = get("specCount");
	if(specCount == 1 && emptyVar([get("specJob0")]))
		specCount = 0;
	specHead = "Specialists (" + specCount + ")";
	doc.setFontType("bold");
	doc.text(20, lineHeight, specHead);
	doc.setFontType("normal");
	for (i = 0; i < specCount; i++) {
		lineHeight += 10;
		if (lineHeight >= pageHeight) {doc.addPage(); lineHeight = 40;}
		specJob = get("specJob" + i);
		specName = get("specName" + i);
		specBusi = get("specBusi" + i);
		specHrs = get("specHrs" + i);
		//specRate = get("specRate" + i);
		specRate = formatCurrency(get("specRate" + i));
		
		if (specJob != "" && specName != "" && specBusi != "" && specHrs != "" && specRate != "") {
			doc.text(20, lineHeight, doc.splitTextToSize(specJob, 160));
			lineHeight += 5;
			if (lineHeight >= pageHeight) {doc.addPage(); lineHeight = 40;}
			doc.text(20, lineHeight, doc.splitTextToSize(specName, 160));
			lineHeight += 5;
			if (lineHeight >= pageHeight) {doc.addPage(); lineHeight = 40;}
			doc.text(20, lineHeight, doc.splitTextToSize(specBusi, 160));
			lineHeight += 5;
			if (lineHeight >= pageHeight) {doc.addPage(); lineHeight = 40;}
			doc.text(20, lineHeight, doc.splitTextToSize(specHrs, 160));
			lineHeight += 5;
			if (lineHeight >= pageHeight) {doc.addPage(); lineHeight = 40;}
			doc.text(20, lineHeight, doc.splitTextToSize(specRate, 160));
			
			totalCost += specHrs * get("specRate" + i);
		}
		else {
			doc.text(20, lineHeight, "N/A");
		}
	}
	lineHeight += 20;
	if (lineHeight >= pageHeight) {doc.addPage(); lineHeight = 40;}
	
	//*****Footer*****
	total = "Total Estimate Cost";
	doc.setFontType("bold");
	doc.text(20, lineHeight, total);
	lineHeight += 10;
	if (lineHeight >= pageHeight) {doc.addPage(); lineHeight = 40;}
	doc.setFontType("normal");
	doc.text(20, lineHeight, formatCurrency(totalCost));
	lineHeight += 10;
	if (lineHeight >= pageHeight) {doc.addPage(); lineHeight = 40;}
	doc.text(105, lineHeight, doc.splitTextToSize("Generated by Jacob's Ladder", 160), null, null, 'center');
	lineHeight += 10;
	qr = "data:image/png;base64,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";
	doc.addImage(qr, 'PNG', 85, lineHeight, 40, 40);
}
/**
 * Provides user with a download for the generated PDF
 */
function downloadPDF() {
	//TODO: SANITIZE prj String
	prj = get("prj");
	doc.save(prj + '.pdf');
}