(() => {
  var terms = [];
  var wordMap = {};
  var intersections = {};

  window.onload = () => {
    document.getElementById("generate-puzzle").onclick = (ev) => {
      let vocabString = document.getElementById("vocabulary-list").value;
      vocabString = vocabString.trim();
      if(vocabString === "") {
        notifyUser("Vocabulary list is empty. Please enter a vocabulary list.", "warning");
        return;
      }

      terms = parseVocabList(vocabString);
      wordMap = {};
      intersections = {};

      mapTerms();
      generateCrosswordPuzzle();
      generateHintList();
    };
  };

  var notifyUser = (message, type) => {
    if(type === "")
      return;

    switch(type) {
      default:
        alert(message);
        break;
    }
  };

  var parseVocabList = string => {
    let termArray = string.split("\n");
    return termArray.map(term => {
      let word = term.split(":")[0].trim();
      let hint = term.split(":")[1].trim();
      return {word: word, hint: hint};
    })
  };

  var randomlyPickLayout = () => ["DOWN", "ACROSS"][Math.floor(Math.random() * 2)];

  var shuffleArray = (array) => JSON.parse(JSON.stringify(array)).sort(() => Math.random() - 0.5);

  var mapTerms = () => {
    terms.forEach(term => {
      let word = term.word;
      let hint = term.hint;
      let layout = randomlyPickLayout();
      for(let i = 0; i < word.length; i++) {
        let letter = word[i].toUpperCase();
        let letterMap = {word: word, index: i};
        if(!intersections[letter])
          intersections[letter] = [letterMap];
        else
          intersections[letter].push(letterMap);
      }
      wordMap[word] = {word: word, hint: hint, layout: layout};
    });
    Object.keys(intersections).forEach(key => {
      if(intersections[key].length < 2)
        delete intersections[key];
    });
  };

  var generateSVGElement = (type, x, y) => {
    // let element = document.createElement(type);
    let element = document.createElementNS("http://www.w3.org/2000/svg", type);
    element.setAttribute("x", x);
    element.setAttribute("y", y);
    return element;
  };

  var generatePuzzleSquare = (x, y, length) => {
    let square = generateSVGElement("rect", x, y);
    square.setAttribute("width", length);
    square.setAttribute("height", length);
    return square;
  };

  var generatePuzzleSquareNumber = (x, y, number) => {
    let text = generateSVGElement("text", x, y);
    text.innerHTML = number;
    text.setAttribute("dy", "1em");
    return text;
  };

  var generatePuzzleLine = (svg, word, number, layout, unitXStart, unitYStart, unitSize) => {
    let unitX = unitXStart;
    let unitY = unitYStart;
    for(var i = 0; i < word.length; i++) {
      let letter = word[i];
      let group = document.createElementNS("http://www.w3.org/2000/svg", "g");
      let x = unitX * unitSize;
      let y = unitY * unitSize;
      group.appendChild(generatePuzzleSquare(x, y, unitSize));
      if(i === 0)
        group.appendChild(generatePuzzleSquareNumber(x+2, y+2, number));

      if(layout === "DOWN")
        unitY++;
      else
        unitX++;

      svg.appendChild(group);
    }
  };

  var getNewIntersection = word => {
    Object.keys(intersections).forEach(key => {
      intersections[key].forEach(intersection => {
        intersection.word === word
      });
    });
  };

  var generateCrosswordPuzzle = () => {
    const unitSize = 30;
    const xMax = 1000;
    const yMax = 1000;

    let puzzleContainer = document.getElementById("crossword-puzzle");
    puzzleContainer.innerHTML = "";

    let grid = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
    grid.setAttribute("viewBox", `0 0 ${xMax} ${yMax}`);
    puzzleContainer.appendChild(grid);
    grid.style.borderStyle = "solid";

    let startX = 16;
    let startY = 16;
    let number = "x";
    Object.keys(wordMap).forEach((wordKey, index, array) => {
      let layout = wordMap[wordKey].layout;
      let isIntersecting = false;
      // startX -= Math.round(wordKey.length / 2);
      // startY -= Math.round(wordKey.length / 2);
      generatePuzzleLine(grid, wordKey, number, layout, startX, startY, unitSize);
      // startX += 1;
      // startY += 1;
      // console.log(intersections);
      let nextWord = array[index];
      if(nextWord) {
        for(var i = 0; i < wordKey.length; i++) {
          let letter = wordKey[i].toUpperCase();
          if(intersections[letter]) {
            console.log(intersections[letter]);
            isIntersecting = true;
            let nextIntersectsCurrent = false;

            intersections[letter].forEach(item => {
              if(item.word === nextWord)
                nextIntersectsCurrent = true;
            });

            if(nextIntersectsCurrent) {
              if(wordMap[nextWord].layout === "DOWN") {
                startY += i;
              }
              else if(wordMap[nextWord].layout === "ACROSS") {
                startX += i;
              }
              break;
            }
          }
        }
      }
      if(!isIntersecting) {
        if((startX + 2) < xMax)
          startX += 2;
      }
      // number = index+1;
    });
  };

  var generateHintList = () => {
    let hints = document.getElementById("hints");
    hints.innerHTML = "";

    let vocabWords = Object.keys(wordMap);
    let wordMapKeys = shuffleArray(vocabWords);

    let showVocabulary = document.getElementById("show-vocabulary-words").checked;
    let separateByLayout = document.getElementById("separate-by-layout").checked;

    if(separateByLayout) {
      let listContainer = document.createElement("div");
      listContainer.classList.add("row");
      let downListContainer = document.createElement("div");
      downListContainer.classList.add("col-6");
      listContainer.appendChild(downListContainer);
      let downItems = [];
      let acrossListContainer = document.createElement("div");
      acrossListContainer.classList.add("col-6");
      listContainer.appendChild(acrossListContainer);
      let acrossItems = [];

      wordMapKeys.forEach(key => {
        let item = document.createElement("li");
        item.innerHTML = wordMap[key].hint;

        switch(wordMap[key].layout) {
          case "DOWN":
            downItems.push(item);
            break;
          case "ACROSS":
            acrossItems.push(item);
            break;
        }
      });

      let downTitle = document.createElement("p");
      downTitle.innerHTML = "<b>Down</b>";
      downListContainer.appendChild(downTitle);
      let downList = document.createElement("ol");
      downListContainer.appendChild(downList);
      downItems.forEach(item => {
        downList.appendChild(item);
      });

      let acrossTitle = document.createElement("p");
      acrossTitle.innerHTML = "<b>Across</b>";
      acrossListContainer.appendChild(acrossTitle);
      let acrossList = document.createElement("ol");
      acrossListContainer.appendChild(acrossList);
      acrossItems.forEach(item => {
        acrossList.appendChild(item);
      });

      hints.appendChild(listContainer);
    }
    else {
      let list = document.createElement("ol");
      wordMapKeys.forEach(key => {
        let item = document.createElement("li");
        item.innerHTML = wordMap[key].hint;
        list.appendChild(item);
      });
      hints.appendChild(list);
    }


    if(showVocabulary) {
      let container = document.createElement("div");
      container.classList.add("row");

      let containerTitle = document.createElement("p");
      containerTitle.innerHTML = "<b>Vocabulary</b>";
      container.appendChild(containerTitle);

      vocabWords.forEach(word => {
        let wordContainer = document.createElement("div");
        wordContainer.classList.add("col-4");
        wordContainer.innerHTML = `<p>${word}</p>`;
        container.appendChild(wordContainer);
      });
      hints.appendChild(container);
    }
  };
})();
