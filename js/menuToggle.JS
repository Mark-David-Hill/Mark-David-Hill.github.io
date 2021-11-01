function toggleMenu() {
    document.getElementById("mainNav").classList.toggle("open");
}

let x = document.getElementById('hamburgerButton');
x.onclick = toggleMenu;