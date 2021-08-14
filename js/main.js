


//navbar
const $navbarbutton = document.getElementById('navbar__btn');
const $navbarIcon = document.getElementById('navbar__icon');
const $menu = document.getElementById('nav__ul');


$navbarbutton.addEventListener('click', (e)=>{
    $menu.classList.toggle('nav__dropdown');
    $navbarIcon.classList.toggle('navbar__arrow');
})