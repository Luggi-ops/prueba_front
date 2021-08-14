


//navbar
const $navbarbutton = document.getElementById('navbar__btn');
const $navbarIcon = document.getElementById('navbar__icon');
const $menu = document.getElementById('nav__ul');


$navbarbutton.addEventListener('click', (e)=>{
    $menu.classList.toggle('nav__dropdown');
    $navbarIcon.classList.toggle('navbar__arrow');
})


//Form

const $selectProv = document.getElementById('prov');

const traerDatosProvincias = ()=>{
    let xhr = new XMLHttpRequest();
    

    xhr.open('GET', 'https://apis.datos.gob.ar/georef/api/provincias', true);

    xhr.addEventListener('load', (data)=>{
        const provincias = JSON.parse(data.target.response).provincias;
        const fragment = document.createDocumentFragment();

        provincias.forEach(provincia => {
            const optionProv = document.createElement('OPTION');
            optionProv.textContent = provincia.nombre;

            fragment.appendChild(optionProv);
        });

        $selectProv.appendChild(fragment);
    })

    xhr.send();
}

$selectProv.addEventListener('click', traerDatosProvincias());