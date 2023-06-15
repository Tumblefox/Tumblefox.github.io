(() => {
  var subData = {};
  nunjucks.configure('templates', { autoescape: true });

  var loadContent = json => {
    subData = json;
    let subs = json.subscriptions;
    let creators = subs.map(mapSubscriptions);
    console.log(creators);
    // console.log(creators);

    let html = nunjucks.render('content-creator.html', { creators: creators });
    document.getElementById("content-creators").innerHTML = html;

    setInputs();
  };

  var setInputs = () => {
    const buttons = [
      {class: ".newFeedBtn", function: showNewFeedForm},
      {class: ".submitNewFeedBtn", function: submitNewFeedForm},
      {class: ".closeNewFeedFormBtn", function: closeNewFeedForm},
      {class: ".newTagBtn", function: showNewTagForm},
      {class: ".submitNewTagBtn", function: submitNewTagForm},
      {class: ".closeNewTagFormBtn", function: closeNewTagForm},
    ];
    buttons.forEach(item => {
      document.querySelectorAll(item.class).forEach(btn => {
        btn.onclick = item.function;
      });
    });
  };

  var mapSubscriptions = sub => {
    let feedCount = Object.keys(sub.feeds).length;
    let feeds = processFeeds(sub.feeds);
    let tags = sub.tags;
    return {
      name: sub.name,
      feedCount: feedCount,
      feeds: feeds,
      tags: tags
    }
  };

  var showNewFeedForm = (ev) => {
    let btn = ev.srcElement;
    let form = btn.parentNode.querySelectorAll(".newFeedForm")[0];

    if(form.classList.contains("hidden"))
      form.classList.remove("hidden");
  };

  var showNewTagForm = (ev) => {
    let btn = ev.srcElement;
    let form = btn.parentNode.querySelectorAll(".newTagForm")[0];
    form.classList.remove("hidden");
  };

  var submitNewFeedForm = (ev) => {
    let form = ev.srcElement.parentNode;
    let creator = form.querySelectorAll(".newFeedCreator")[0].value;
    let platform = form.querySelectorAll(".newFeedPlatform")[0].value;
    let url = form.querySelectorAll(".newFeedUrl")[0].value;
    if(url === "")
      return;

    subData.subscriptions.forEach(sub => {
      if(sub.name !== creator)
        return;
      if(sub.feeds[platform]) {
        sub.feeds[platform].push(url);
        return;
      }
      sub.feeds[platform] = [url];
    });

    localStorage.setItem("declutter_data", JSON.stringify(subData));

    let updatedSub = subData.subscriptions
    .filter(sub => sub.name === creator)
    .map(mapSubscriptions);
    console.log(updatedSub);

    let html = nunjucks.render('content-creator.html', { creators: updatedSub });
    let temp = document.createElement("div");
    temp.innerHTML = html;
    document.getElementById(creator).innerHTML = temp.children[0].innerHTML;
    setInputs();
  };

  var submitNewTagForm = (ev) => {
    let form = ev.srcElement.parentNode.parentNode.parentNode.parentNode;
    let creator = form.querySelectorAll(".newFeedCreator")[0].value;
    let tag = form.querySelectorAll(".newTagName")[0].value;
    if(tag === "")
      return;

    subData.subscriptions.forEach(sub => {
      if(sub.name !== creator)
        return;
      if(sub.tags.indexOf(tag) === -1)
        sub.tags.push(tag);
    });

    localStorage.setItem("declutter_data", JSON.stringify(subData));

    let element = document.createElement("span");
    element.setAttribute("data-search-tag", tag);
    element.classList.add("badge");
    element.classList.add("badge-pill");
    element.classList.add("badge-dark");
    element.innerHTML = tag;
    form.querySelectorAll(".tags")[0].appendChild(element);
    form.querySelectorAll(".newTagName")[0].value = "";
  };

  var closeNewFeedForm = (ev) => {
    let btn = ev.srcElement;
    btn.parentNode.classList.add("hidden");
  };

  var closeNewTagForm = (ev) => {
    let btn = ev.srcElement;
    btn.parentNode.classList.add("hidden");
  };

  var processFeeds = (feeds) => {
    Object.keys(feeds).forEach(key => {
      let formattedURLs = feeds[key].map(url => {
        if(key === "youtube") {
          let params = url.split("?")[1].split("&");
          let listParam = "list=";
          params.forEach(param => {
            if(param.indexOf("list=") > -1)
              listParam = param;
          });
          console.log(params);
          let newUrl = `https://www.youtube.com/embed/videoseries?${listParam}`;
          return newUrl;
        }
        return url;
      });
      feeds[key] = formattedURLs;
    });
    return feeds;
  };

  window.onload = () => {
    document.getElementById("feed-file").onchange = fileEvent => {
      var file = fileEvent.srcElement.files[0];
      var reader = new FileReader();
      reader.readAsText(file, "UTF-8");
      reader.onload = ev => {
        localStorage.setItem("declutter_data", ev.target.result);
        let json = JSON.parse(ev.target.result);
        loadContent(json);
      }
    };

    if(localStorage.getItem("declutter_data")) {
      let json = JSON.parse(localStorage.getItem("declutter_data"));
      loadContent(json);
    }
  }
})();
