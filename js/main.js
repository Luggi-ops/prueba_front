


//navbar
const $navbarbutton = document.getElementById('navbar__btn');
const $navbarIcon = document.getElementById('navbar__icon');
const $menu = document.getElementById('nav__ul');


$navbarbutton.addEventListener('click', (e)=>{
    $menu.classList.toggle('nav__dropdown');
    $navbarIcon.classList.toggle('navbar__arrow');
})


//Form provincias

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


//SEND FORM

const $btnForm = document.getElementById('btn-form');
const $form = document.getElementById('form');


$form.addEventListener('submit', (event)=>{
    event.preventDefault();
    let formDates = new FormData($form);

    const msg = {
        nombre: formDates.get('nombre'),
        provincia: formDates.get('provincia'),
        email: formDates.get('email'),
        horario: formDates.get('hora'),
        tel: formDates.get('tel'),
        consulta: formDates.get('consulta')
    }

    const token = `eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiZGV2ZWxvcGVyIiwiSXNzdWVyIjoiSXNzdWVyIiwiVXNlcm5hbWUiOiJGcm9udERldiIsImV4cCI6MTYyODY5NTg3NiwiaWF0IjoxNjI4Njk1ODc2fQ.CDRPz6Eta78BzmuNTNZsnzzDU2TRgvEtMs-_aZlWCZQ`;

    fetch('https://sistemacaliva.com/api/front-test', {
        method: 'POST',
        mode: 'cors',
        headers: {
            "Content-Type": "application/json",
            "api-key": `${token}`,
            "Origin": "*",
        },
        body: JSON.stringify(msg),
    })
    .then(res => console.log(res))
})

