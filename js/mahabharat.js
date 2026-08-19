const sections = document.querySelectorAll('.chapter');
const navItems = document.querySelectorAll('.side-nav li');

// 🕉️ Show selected section
function showSection(id) {
  sections.forEach(sec => sec.classList.remove('active'));
  document.getElementById(id).classList.add('active');

  navItems.forEach(item => item.classList.remove('active'));
  document.querySelector(`[data-section="${id}"]`).classList.add('active');

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Sidebar click
navItems.forEach(item => {
  item.addEventListener('click', () => showSection(item.dataset.section));
});

// Next & Previous buttons
document.addEventListener('click', (e) => {
  // NEXT button
  if (e.target.classList.contains('next-btn')) {
    showSection(e.target.dataset.next);
  }

  // PREVIOUS button
  if (e.target.classList.contains('prev-btn')) {
    showSection(e.target.dataset.prev);
  }
});

