var url = localStorage["mediusflow_url"];
var username = localStorage["mediusflow_username"];
var password = localStorage["mediusflow_password"];

chrome.browserAction.onClicked.addListener(function(activeTab){
  chrome.tabs.create({ url: url });
});

var loadTasksUrl = url + "/Backend/Rest/InboxManager/Tasks/1"
var loginUrl = url + "/LocalAccount/LogOn"
var loginBody = "a=send&username=" + username + "&password=" + password

console.log (loadTasksUrl);
console.log (loginUrl);

$.ajax({
  contentType: "application/x-www-form-urlencoded",
  url: loadTasksUrl,
  data: loginBody
}).done(function() {
    console.log( "Login successful");
  })
  .fail(function() {
    console.log( "Login failed");
  });

$.ajax({
  dataType: "json",
  url: loadTasksUrl
}).done(function(data) {
	var countTasks = 0;
	$.each(data, function(i, item) {
		countTasks = countTasks + item.TotalTasks;
		console.log (item.TotalTasks);
		console.log (countTasks);
	});
	chrome.browserAction.setBadgeText({text : countTasks.toString()});
  })
  .fail(function() {
    chrome.browserAction.setBadgeText({text:"?"});
  });

