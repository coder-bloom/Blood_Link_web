function showSection(sectionId) {
  document.querySelectorAll('.content-section').forEach(sec => sec.classList.remove('active'));
  document.getElementById(sectionId).classList.add('active');

  document.querySelectorAll('.nav-menu a').forEach(link => link.classList.remove('active'));
  event.target.classList.add('active');
}

function toggleMenu() {
  document.querySelector('.nav-menu').classList.toggle('show');
}
