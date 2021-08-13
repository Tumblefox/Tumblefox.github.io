(() => {
  window.onload = () => {
    nunjucks.configure("/templates");
    var undoBuffer = [];
    var positionCache = {};
    var documentName = "";

    document.getElementById("undo-btn").onclick = () => {
      if(undoBuffer.length < 1)
        return;
      let state = undoBuffer.pop();
      let ctx = document.getElementById(state.id).getContext("2d");

      let image = new Image();
      image.onload = () => {ctx.drawImage(image, 0, 0)};
      image.src = state.data;
    };

    document.getElementById("pdf-upload").onchange = (uploadEv) => {
      var file = uploadEv.srcElement.files[0];
      documentName = file.name;
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = ev => {
        let base64 = ev.target.result;
        clearCachedData();
        loadPDF({data: atob(base64.replace("data:application/pdf;base64,", ""))})
      };
    };

    document.getElementById("save-btn").onclick = () => {
      if(document.getElementById("pdf-pages").children.length > 0)
        savePDF(documentName, "portrait");
    };

    var clearCachedData = () => {
      undoBuffer = [];
      positionCache = {};
      documentName = "";
    };

    var canvasBehavior = (ev) => {
      let canvas = ev.srcElement;
      let posX = ev.pageX - canvas.offsetLeft;
      let posY = ev.pageY - canvas.offsetTop;

      let dismissTextInput = () => {
        let text = document.getElementById("prompt-content-value").value;
        let font = document.getElementById("text-font").value;
        let fontSize = document.getElementById("text-font-size").value;
        if(text !== "") {
          addContent(canvas, positionCache.x, positionCache.y, text, font, fontSize);
        }
        document.getElementById("content-input").remove();
      };

      let fillCheckbox = () => {
        let shape = document.getElementById("checkbox-shape").value;
        let size = document.getElementById("checkbox-size").value;
        addShape(canvas, posX, posY, size, shape);
      };

      let clickBehavior;
      let inputType = document.querySelectorAll("input[name^='input-type']:checked")[0];
      switch(inputType.value) {
        case "text":
          clickBehavior = dismissTextInput;
          if(document.getElementById("content-input")) {
            clickBehavior();
          }
          positionCache.x = posX;
          positionCache.y = posY;

          let html = nunjucks.render("content-input.html");
          let temp = document.createElement("div");
          temp.innerHTML = html;
          let prompt = document.createElement("div");
          prompt.innerHTML = temp.innerHTML;
          document.body.appendChild(prompt);
          let x = ev.pageX;
          let y = ev.pageY;
          prompt.style.position = 'absolute';
          prompt.style.left = x + "px";
          prompt.style.top = y + "px";
          document.getElementById("prompt-content-value").focus();
          document.getElementById("prompt-content-value").onkeyup = (keyEv) => {
            if(keyEv.keyCode === 13) {
              clickBehavior();
              return;
            }
            if(keyEv.keyCode === 27) {
              keyEv.srcElement.value = "";
              clickBehavior();
              return;
            }
          };
          break;
        case "checkbox":
          clickBehavior = fillCheckbox;
          clickBehavior();
          break;
        case "signature":
          clickBehavior = dismissTextInput;
          break;
      }
    };

    var addContent = (canvas, x, y, text, font, fontSize) => {
      undoBuffer.push({
        id: canvas.id,
        data: canvas.toDataURL()
      });
      let ctx = canvas.getContext("2d");
      if(fontSize !== undefined)
        ctx.font = `${fontSize}px ${font}`;
      ctx.fillText(text, x, y);
    };

    var addShape = (canvas, x, y, size, shape) => {
      undoBuffer.push({
        id: canvas.id,
        data: canvas.toDataURL()
      });
      let ctx = canvas.getContext("2d");
      let offset;
      switch(shape) {
        case "Square":
          offset = size * 2;
          ctx.fillRect(x-offset, y-offset, size * 2, size * 2);
          break;
        case "Round":
          offset = size;
          ctx.beginPath();
          ctx.arc(x-offset, y-offset, size, 0, 2 * Math.PI);
          ctx.fill();
          break;
      }
    };

    var loadPDF = (data) => {
      var loadingTask = pdfjsLib.getDocument(data);
      loadingTask.promise.then(
        (pdf) => {
          console.log('PDF loaded');
          document.getElementById("pdf-pages").innerHTML = "";
          // Fetch all pages
          for(let pageNumber = 1; pageNumber <= pdf["_pdfInfo"].numPages; pageNumber++) {
            pdf.getPage(pageNumber).then(function(page) {
              console.log('Page loaded');

              let scale = 1;
              let viewport = page.getViewport({scale: scale});

              // Prepare canvas using PDF page dimensions
              let canvas = document.createElement("canvas");
              canvas.id = `page-${pageNumber}`;
              canvas.classList.add("pdf-canvas");
              document.getElementById("pdf-pages").appendChild(canvas);
              let context = canvas.getContext('2d');
              canvas.height = viewport.height;
              canvas.width = viewport.width;
              canvas.onclick = canvasBehavior;

              // Render PDF page into canvas context
              var renderContext = {
                canvasContext: context,
                viewport: viewport
              };
              var renderTask = page.render(renderContext);
              renderTask.promise.then(() => {
                console.log('Page rendered');
              });
            });
          }
        },
        (error) => {console.error(error)}
      );
    };

    var savePDF = (filename, orientation) => {
      const doc = new jsPDF({orientation: orientation});
      const margin = 10;
      const width = doc.internal.pageSize.getWidth() - (2 * margin);
      var position = margin;

      document.querySelectorAll(".pdf-canvas").forEach(canvas => {
        const height = ((canvas.height * width) / canvas.width);
        doc.addImage(canvas, 'PNG', margin, position, width, height, '', 'FAST');
        doc.addPage();
      });
      doc.save(filename);
    };
    // load all PDF pages
    // loadPDF("/img/job_application_form.pdf");
  }
})();
