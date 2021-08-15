


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
    fetch('https://apis.datos.gob.ar/georef/api/provincias')
    .then(res => res.ok ? Promise.resolve(res) : Promise.reject(res))
    .then(res => res.json())
    .then(data => {
        const provincias = data.provincias;
        const fragment = document.createDocumentFragment();
        const provinciasArr = [];

        provincias.forEach(provincia => provinciasArr.push(provincia.nombre));

        provinciasArr.sort().forEach(provincia => {
            const optionProv = document.createElement('OPTION');
            optionProv.textContent = provincia;

            fragment.appendChild(optionProv);
        })
        
        $selectProv.appendChild(fragment);
    })
}

$selectProv.addEventListener('click', traerDatosProvincias);


//SEND FORM

const $btnForm = document.getElementById('btn-form');
const $form = document.getElementById('form');

const $close = document.getElementById('closeModalForm');
const $modalContainer = document.getElementById('modalForm');
const $modalForm = document.getElementById('modalForm__message');

const $closeError = document.getElementById('closeModalError');
const $modalErrorContainer = document.getElementById('modalError');
const $modalError = document.getElementById('modalError__message');

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

    axios.defaults.headers.common = {
        "API-Key": `eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiZGV2ZWxvcGVyIiwiSXNzdWVyIjoiSXNzdWVyIiwiVXNlcm5hbWUiOiJGcm9udERldiIsImV4cCI6MTYyODY5NTg3NiwiaWF0IjoxNjI4Njk1ODc2fQ.CDRPz6Eta78BzmuNTNZsnzzDU2TRgvEtMs-_aZlWCZQ`
    };

    axios({
        method: 'POST',
        url: 'https://sistemacaliva.com/api/front-test',
        data: msg,
        headers: {
            "Content-Type": "application/json",
        }
    })
    .then(res => {
        $modalContainer.style.visibility = 'visible';
		$modalContainer.style.opacity = '1';
        $modalForm.classList.toggle('modalForm__close');
    })
    .catch(err => {
        $modalErrorContainer.style.visibility = 'visible';
		$modalErrorContainer.style.opacity = '1';
		$modalError.classList.toggle('modalError__close');
        console.log(err)

    })

});

//cerrar modales
$close.addEventListener('click', ()=>{
    $modalContainer.style.visibility = 'hidden';
    $modalContainer.style.opacity = '0';
    $modalForm.classList.toggle('modalForm__close');
})

$closeError.addEventListener('click', ()=>{
    $modalErrorContainer.style.visibility = 'hidden';
    $modalErrorContainer.style.opacity = '0';
    $modalError.classList.toggle('modalError__close');
})