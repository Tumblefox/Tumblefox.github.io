conCount = 0;
matCount = 0;
hrCount = 0;
specCount = 0;
doc = null;

function init() {
	project();
	contacts();
	material();
	hours();
	specialists();
	controls();
}

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

function moveForm(nextForm, header, headerText, currForm) {
	document.getElementById(nextForm).style.display = "initial";
	document.getElementById(header).innerHTML = headerText;
	document.getElementById(currForm).style.display = "none";
}

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

function textInput(placeholder) {
	input = document.createElement("input");
	input.type = "text";
	input.placeholder = placeholder;
	return input;
}

function numberInput(placeholder) {
	input = document.createElement("input");
	input.type = "number";
	input.placeholder = placeholder;
	return input;
}

function buttonInput(value, action) {
	input  = document.createElement("input");
	input.type = "button";
	input.value = value;
	input.onclick = action;
	return input;
}

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
	matHead = "Materials, Fees, Permits (" + matCount + ")";
	doc.setFontType("bold");
	doc.text(20, lineHeight, matHead);
	doc.setFontType("normal");
	for (i = 0; i < matCount; i++) {
		lineHeight += 10;
		if (lineHeight >= pageHeight) {doc.addPage(); lineHeight = 40;}
		mat = get("mat" + i);
		matQuan = get("matQuan" + i) + " units";
		matPrice = "$" + get("matPrice" + i) + " per unit";
		
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
		workerRate = "$" + get("workerRate" + i) + "/hr";
		
		doc.text(20, lineHeight, doc.splitTextToSize(workerRate, 160));
		
		totalCost += get("workerRate" + i) * divHr;
	}
	lineHeight += 20;
	if (lineHeight >= pageHeight) {doc.addPage(); lineHeight = 40;}
	//Specialists
	specCount = get("specCount");
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
		specRate = get("specRate" + i);
		
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
			
			totalCost += specHrs * specRate;
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
	doc.text(20, lineHeight, "$" + totalCost); 
}

function downloadPDF() {
	//TODO: SANITIZE prj String
	prj = get("prj");
	doc.save(prj + '.pdf');
}