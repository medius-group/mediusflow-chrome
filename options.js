// Saves options to localStorage.
function save_options() {
  var url = document.getElementById("url").value;
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  localStorage["mediusflow_url"] = url;
  localStorage["mediusflow_username"] = username;
  localStorage["mediusflow_password"] = password;

  // Update status to let user know options were saved.
  var status = document.getElementById("status");
  status.innerHTML = "Options Saved.";
  setTimeout(function() {
    status.innerHTML = "";
  }, 750);
}

// Restores select box state to saved value from localStorage.
function restore_options() {
  var url = localStorage["mediusflow_url"];
  var username = localStorage["mediusflow_username"];
  var password = localStorage["mediusflow_password"];
  
  document.getElementById("url").value = url;
  document.getElementById("username").value = username;
  document.getElementById("password").value = password;
  
}
document.addEventListener('DOMContentLoaded', restore_options);
document.querySelector('#save').addEventListener('click', save_options);