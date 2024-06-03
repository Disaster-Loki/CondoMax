
// Imagens slide
var slideIndex = 0;
showSlides();

function showSlides() {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }
    slides[slideIndex - 1].style.display = "block";
    setTimeout(showSlides, 5000);
}

// Menu
const menuIcon = document.querySelector('.menu-icon');
const menu = document.querySelector('.side_right .links');

menuIcon.addEventListener('click', () => {
    menu.classList.toggle('active');
});
window.addEventListener('click', (e) => {
    if (!menu.contains(e.target) && !menuIcon.contains(e.target)) {
        menu.classList.remove('active');
    }
});