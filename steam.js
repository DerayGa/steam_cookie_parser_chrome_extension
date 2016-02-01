var id, login, cookie;

function getCookies(domain, name, callback) {
    chrome.cookies.get({"url": domain, "name": name}, function(cookie) {
        if(callback) {
            callback(cookie.value);
        }
    });
}

function showContent(){
	if(!id || !login) return;

	cookie.value = 'sessionid = "' + id + '"\r\nsteamLogin = "' + login + '"\r\nsteamparental = ""\r\nsort = ""';
}
document.addEventListener('DOMContentLoaded', function() {
	cookie = document.getElementById("cookie");
	cookie.onmousedown = function(){
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
});
