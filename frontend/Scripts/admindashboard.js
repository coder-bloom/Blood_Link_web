function showSection(id) {
  document.querySelectorAll(".section").forEach(sec => sec.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  document.getElementById("page-title").textContent = id.charAt(0).toUpperCase() + id.slice(1);
}

function activateLink(element) {
  const links = document.querySelectorAll(".nav-item");
  links.forEach(link => link.classList.remove("active"));
  element.classList.add("active");
}

function deleteUser(btn) {
  const row = btn.closest("tr");
  row.remove();
  alert("User deleted successfully!");
}

function approveRequest(btn) {
  const row = btn.closest("tr");
  row.querySelector("td:nth-child(3)").textContent = "Approved";
  btn.remove();
  alert("Request approved!");
}

function logout() {
  alert("You have been logged out!");
}

const sidebar = document.getElementById("sidebar");
const menuToggle = document.getElementById("menuToggle");

menuToggle.addEventListener("click", () => {
  sidebar.classList.toggle("show");
});
