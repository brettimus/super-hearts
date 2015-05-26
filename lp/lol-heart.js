  var lolConfig = {
      count: 1,
      doNotRemove: true,
      fixed: true,
      imageClass: "disappearing-heart",
      imageAppendedTo: "header",
      opacity: .3,
      rotate: false,
      scale: 1,
      translateY: 1,
      translateX: 1,
  };

  var lol = SuperHearts.Button("header", lolConfig); // this just puts an image on the page where the big ring will emanate from... hehehe
  $("header").click();
  lol.removeAll();  // so it doesn't get triggered by the interval function