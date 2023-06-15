<!DOCTYPE html>
<html>
	<head>
		<!--INCLUDE CREDIT FOR jsPDF by @MrRio (twitter)-->
		<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.3.5/jspdf.debug.js"></script>
	</head>
	
	<body>
		<h1 id="test"><?php echo $_GET["prj"]; ?></h1>
		<script>
			function toPDF() {
				var doc = new jsPDF();
				doc.setFontSize(40);
				doc.text(35, 25, "Octonyan loves jsPDF");
				//doc.save('a4.pdf');
			}
		</script>
	</body>
</html>