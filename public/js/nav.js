
function toggleMenu() {
    // every time the hamburger button is clicked, the primaryNav will have a class of open
    document.getElementById("nav").classList.toggle("open")
    document.getElementById("hamburgerBtn").classList.toggle("open")
  }
  const x = document.getElementById("hamburgerBtn")
  x.onclick = toggleMenu