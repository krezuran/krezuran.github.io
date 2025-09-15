document.addEventListener('DOMContentLoaded', () => {
  const logo = document.querySelector('#logo-container');
  if (!logo) return;

  logo.addEventListener('click', () => {
    window.open('https://www.mayapin.com', '_blank');
  });
});