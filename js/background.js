chrome.app.runtime.onLaunched.addListener(function() {
  window.open("window.html")
  /*chrome.app.window.create('window.html', {
    'bounds': {
      'width': 800,
      'height': 400
    }
  });*/
});
