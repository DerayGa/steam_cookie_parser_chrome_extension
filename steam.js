function getCookies(domain, name, callback) {
    chrome.cookies.get({"url": domain, "name": name}, function(cookie) {
        if(callback) {
            callback(cookie);
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {

	getCookies("http://steamcommunity.com", "sessionid", function(id) {
	    console.log(id);
	});

	getCookies("http://steamcommunity.com", "steamLogin", function(login) {
	    console.log(login);
	});
	
});
