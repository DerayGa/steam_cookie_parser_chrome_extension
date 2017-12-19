var steamcommunityURL = "http://steamcommunity.com";
var textarea;

function getCookies(name) {
  return new Promise((resolve) => {
    chrome.cookies.get({
      "url": steamcommunityURL,
      "name": name
    }, function(cookie) {
      if (cookie) {
        resolve(cookie.value);
      } else if (chrome.runtime.lastError) {
        textarea.value = 'Error: ' + chrome.runtime.lastError.message;
      } else {
        resolve('cookie not found');
      }
    });
  });
}

function showContent([id, login]) {
  textarea.value = [
    `sessionid = "${id}"`,
    `steamLogin = "${login}"`,
    'steamparental = ""',
    'sort = ""'
  ].join('\r\n');
}

function showCookie() {
  textarea = document.getElementById("cookie");
  textarea.onmousedown = function() {
    textarea.focus();

    document.execCommand('SelectAll');
    document.execCommand("Copy", false, null);
  }
  const promises = [
    getCookies("sessionid"),
    getCookies("steamLogin")
  ];

  Promise.all(promises).then((values) => {
    showContent(values);
  });
}

document.addEventListener('DOMContentLoaded', function() {

  chrome.tabs.getAllInWindow(null, function(tabs) {
    for (var i = 0; i < tabs.length; i++) {
      if (tabs[i].url.indexOf('steamcommunity.com') > -1) {
        showCookie();
        return;
      }
    }

    chrome.tabs.create({
      url: steamcommunityURL
    });
  });
});