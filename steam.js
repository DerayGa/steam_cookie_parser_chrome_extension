var id, login, cookie;

function getCookies(domain, name, callback) {
  chrome.cookies.get({
    "url": domain,
    "name": name
  }, function(cookie) {
    if (callback) {
      callback(cookie.value);
    }
  });
}

function showContent() {
  if (!id || !login) return;

  cookie.value = 'sessionid = "' + id + '"\r\nsteamLogin = "' +
    login + '"\r\nsteamparental = ""\r\nsort = ""';
}

function showCookie() {

  cookie = document.getElementById("cookie");
  cookie.onmousedown = function() {
    cookie.focus();

    document.execCommand('SelectAll');

    document.execCommand("Copy", false, null);
  }

  getCookies("http://steamcommunity.com", "sessionid", function(value) {
    id = value;

    showContent();
  });

  getCookies("http://steamcommunity.com", "steamLogin", function(value) {
    login = value;

    showContent();
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

    var steamcommunityURL = "http://steamcommunity.com/";
    chrome.tabs.create({
      url: steamcommunityURL
    });
  });
});