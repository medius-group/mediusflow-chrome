// Saves options to localStorage.
function save_options() {
  var url = document.getElementById("url").value;
  localStorage["mediusflow_url"] = url;


  // Update status to let user know options were saved.
  var status = document.getElementById("status");
  status.innerHTML = "Options Saved. Please start using the extension!";
  }

// Restores select box state to saved value from localStorage.
function restore_options() {
  var url = localStorage["mediusflow_url"];
  document.getElementById("url").value = url;  
}
document.addEventListener('DOMContentLoaded', restore_options);
document.querySelector('#save').addEventListener('click', save_options);