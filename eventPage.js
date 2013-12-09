function getMediusflowUrl() {
  return localStorage["mediusflow_url"];
}

function getLoadTaskUrl() {
  return getMediusflowUrl() + "/Backend/Rest/InboxManager/Tasks/1";
}

function goToInbox() {
  console.log("MediusflowURL: " + getMediusflowUrl());
  if (getMediusflowUrl()) {
    chrome.tabs.create({ url: getMediusflowUrl() });
  }
  else {
    console.log("No Url");
    chrome.tabs.create({ url: '/options.html' });
  }
}

function scheduleGetMediusflowData(){
 chrome.alarms.get("GetDataFromMediusflow",function(alarm){
  console.log("Scheduled Time (before)  "+ alarm.scheduledTime);
  console.log("Alarm Name "+alarm.name);
 });

 chrome.alarms.create("GetDataFromMediusflow",{periodInMinutes:10});
 
 chrome.alarms.get("GetDataFromMediusflow",function(alarm){
  console.log("Scheduled Time (after) "+ alarm.scheduledTime);
  console.log("Alarm Name "+alarm.name);
 });
}

function getMediusflowData(params) {
  if (params && params.scheduleGetMediusflowData) scheduleGetMediusflowData();
  $.ajax({
    dataType: "json",
    url: getLoadTaskUrl()
  }).done(function(data) {
    var countTasks = 0;
    $.each(data, function(i, item) {
      countTasks = countTasks + item.TotalTasks;
    });
    console.log("Total count: " + countTasks.toString());
    chrome.browserAction.setBadgeText({text : countTasks.toString()});
  }).fail(function() {
    console.log("Count failed..");
    chrome.browserAction.setBadgeText({text:"?"});
  });

}

function isMediusflowUrl(url) {
// Return whether the URL starts with the Gmail prefix.
  return url.indexOf(getMediusflowUrl()) == 0;
}

function onNavigate(details) {
  if (details.url && isMediusflowUrl(details.url)) {
    console.log('Recognized Mediusflow navigation to: ' + details.url + '.' +
      'Refreshing count...');
    getMediusflowData({scheduleGetMediusflowData:false});
  }
}

function onInit() {
  console.log('onInit');
  getMediusflowData({scheduleGetMediusflowData:true});
}

function onAlarm(alarm) {
  console.log('Got alarm', alarm);
  getMediusflowData({scheduleGetMediusflowData:true});
}

if (chrome.webNavigation && chrome.webNavigation.onDOMContentLoaded && 
  chrome.webNavigation.onReferenceFragmentUpdated) {
    chrome.webNavigation.onDOMContentLoaded.addListener(onNavigate, filters);
    chrome.webNavigation.onReferenceFragmentUpdated.addListener(onNavigate, filters);
  } else {
    chrome.tabs.onUpdated.addListener(function(_, details) {
      onNavigate(details);
    });
  }

chrome.runtime.onInstalled.addListener(onInit);
chrome.alarms.onAlarm.addListener(onAlarm);
chrome.browserAction.onClicked.addListener(goToInbox);

if (chrome.runtime && chrome.runtime.onStartup) {
  chrome.runtime.onStartup.addListener(function() {
    console.log('Starting browser... updating icon.');
    startRequest({scheduleRequest:false, showLoadingAnimation:false});
  });
}

chrome.alarms.onAlarm.addListener(function(alarm){
  console.log("Run GetDataFromMediusflow...");
});