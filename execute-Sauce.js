chrome.runtime.onConnect.addListener(function(port) {
  console.assert(port.name == "Image");
  port.onMessage.addListener(function(msg) {
    var ImageFileURL = msg.ImageURL;
	console.log(ImageFileURL);
	document.getElementsByName("url")[0].value = ImageFileURL;
	togglenao();
  });
});
togglenao();