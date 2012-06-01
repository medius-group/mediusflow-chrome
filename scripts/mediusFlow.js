var serverAddr = "https://online.mediusflow.com/sharp/frontend/";
//var serverAddr = "http://utv26/servicefrontend/";

function Login() {
	
    var username = "system";
    var password = "system824806";
	
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("GET", serverAddr + "xml/auth/BasicHttpBinding_USCOREAuthenticationServiceSoap.Login.req.xml", false);
	
    xmlhttp.setRequestHeader("Content-Type", "text/xml");
	
    xmlhttp.send();
    var xmlReq = xmlhttp.responseXML;
    
	xmlReq.getElementsByTagName('userName')[0].childNodes[0].nodeValue = username;
    xmlReq.getElementsByTagName('password')[0].childNodes[0].nodeValue = password;
	
	var req = new XMLHttpRequest();
	req.onreadystatechange=function() {
		if (req.readyState==4) {
			if (req.status==200) 
				alert(req.status);
			else
				alert(req.status);
		};
	};
	
	
    req.open("POST", serverAddr + "Services/Medius-Gemini-Services-AuthenticationService.svc", true);

    req.setRequestHeader("SOAPAction", "http://tempuri.org/AuthenticationServiceSoap/Login");
    req.setRequestHeader('Content-Type', 'text/xml');
	
    req.send(xmlReq);
}

function countTasks() {

	xmlhttpTaskList = new XMLHttpRequest();
	xmlhttpTaskList.open("GET", serverAddr + "xml/data/BasicHttpBinding_USCOREDataServiceSoap.GetTasks.req.xml", false);
    xmlhttpTaskList.send();

    reqTaskList = new XMLHttpRequest();
	
	reqTaskList.onreadystatechange=function() {
		if (reqTaskList.readyState==4) {
			if (reqTaskList.status==200) 
				chrome.browserAction.setBadgeText({text:String(tasks.length)});
			else
				alert(reqTaskList.status);
		};
	};
	
    reqTaskList.open("POST", serverAddr + "Services/Medius-Gemini-Services-DataService.svc", true);

    reqTaskList.setRequestHeader("SOAPAction", "http://tempuri.org/DataServiceSoap/GetTasks");
    reqTaskList.setRequestHeader("Content-Type", "text/xml");

    reqTaskList.send(xmlhttpTaskList.responseXML);

    var getTaskRes = reqTaskList.responseXML;
    
    var tasks = getTaskRes.getElementsByTagName('Task');
}
