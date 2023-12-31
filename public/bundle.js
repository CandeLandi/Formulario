'use strict';

const formulario$3 = document.getElementById('formulario');


const validarCantidad = () => {
    //Aceptamos cualquier digito del 1 al 9, y un punto con decimales (opcional)
    const expRegCantidad = /^\d+(\.\d+)?$/;
    //Obtenemos el input cantidad
    const inputCantidad = formulario$3.cantidad;

    if (expRegCantidad.test(inputCantidad.value)) {
        inputCantidad.classList.remove('formulario__input--error');
        return true;
    } else {
        inputCantidad.classList.add('formulario__input--error');
        return false;
    }
};

const formulario$2 = document.getElementById('formulario');


const validarNombre = () => {
    //Aceptamos cualquier digito del 1 al 9, y un punto con decimales (opcional)
    const expRegNombre = /^[a-zA-ZÀ-ÿ\s]{1,40}$/;
    //Obtenemos el input cantidad
    const inputNombre = formulario$2['nombre-receptor']; 

    if (expRegNombre.test(inputNombre.value)) {
        inputNombre.classList.remove('formulario__input--error');
        return true;
    } else {
        inputNombre.classList.add('formulario__input--error');
        return false;
    }
};

const validarCorreo = () => {
	// Expresion regular para validar un correo.
	const expRegCorreo = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

	// Obtenemos los inputs
	const inputCorreo = formulario['correo-receptor'];

	// Comprobamos que el nombre y correo sean correctos.
	if (!expRegCorreo.test(inputCorreo.value)) {
		inputCorreo.classList.add('formulario__input--error');
		return false;
	} else {
		inputCorreo.classList.remove('formulario__input--error');
		return true;
	}
};

const marcaPaso = (paso) => {
    document
        .querySelector(`.linea-pasos [data-paso="${paso}"] span `)
        .classList.add('linea-pasos__paso-check--checked');
};

/* 
Tomamos los index de cada paso, le sumamos en una unidad y cuando cambie vamos a agregarle la clase de active 
*/
/**
 * Funcion que navega al siguiente paso.
 */
const siguientePaso = () => {
	// Creamos un arreglo con los pasos.
	const pasos = [...document.querySelectorAll('.linea-pasos__paso')];

	// Obtenemos el paso activo.
	const pasoActivo = document.querySelector('.linea-pasos__paso-check--active').closest('.linea-pasos__paso');

	// Obtenemos el index del paso activo.
	const indexPasoActivo = pasos.indexOf(pasoActivo);

	// Comprobamos si hay mas pasos.
	if (indexPasoActivo < pasos.length - 1) {
		// Eliminamos la clase de paso activo.
		pasoActivo.querySelector('span').classList.remove('linea-pasos__paso-check--active');
		// Ponemos la clase de paso activo al siguiente elemento.
		pasos[indexPasoActivo + 1].querySelector('span').classList.add('linea-pasos__paso-check--active');

		// Mostramos el siguiente elemento.
		const id = pasos[indexPasoActivo + 1].dataset.paso;

		document.querySelector(`.formulario__body [data-paso="${id}"]`).scrollIntoView({
			inline: 'start',
			behavior: 'smooth',
		});
	}
};

const formulario$1 = document.getElementById('formulario');

// Reiniciando scroll al cargar el formulario.
formulario$1.querySelector('.formulario__body').scrollLeft = 0;

//EventListener para coprobar los campos de formulaio cuando el usuario corrige.
formulario$1.addEventListener('keyup', (e) => {
    if (e.target.tagName === 'INPUT') {
        if (e.target.id === 'cantidad') {
            validarCantidad();
        } else if (e.target.id === 'nombre-receptor') {
            validarNombre();
        } else if (e.target.id === 'correo-receptor') {
            validarCorreo();
        }
    }
});

const btnFormulario = document.getElementById('formulario__btn');
btnFormulario.addEventListener('click', (e) => {
    e.preventDefault();


    // Validamos el paso actual.
    const pasoActual = document.querySelector('.linea-pasos__paso-check--active').closest('.linea-pasos__paso')
        .dataset.paso;
    if (pasoActual === 'cantidad') {
        if (validarCantidad()) {
            marcaPaso('cantidad');
            siguientePaso();
        }
    } else if (pasoActual === 'datos') {
        if (validarNombre() && validarCorreo()) {
            marcaPaso('datos');
            siguientePaso();
        }
    } else if (pasoActual === 'metodo') {
        marcaPaso('metodo');
        //Formato de moneda
        const opciones = { style: 'currency', currency: "ARS" };
        const formatoMoneda = new Intl.NumberFormat('es-AR', opciones);

        document.querySelector('[data-valor="cantidad"]').innerText = formatoMoneda.format(formulario$1.cantidad.value);

        document.querySelector('[data-valor="nombre-receptor"] span').innerText = formulario$1['nombre-receptor'].value;
        document.querySelector('[data-valor="correo-receptor"] span').innerText = formulario$1['correo-receptor'].value;
        document.querySelector('[data-valor="metodo"] span').innerText = formulario$1.metodo.value;

        // Cambiamos el texto del btn a 'transferir'
        btnFormulario.querySelector('span').innerHTML = 'Transferir';
        //Agregamos la clase que deshabilita el boton 
        btnFormulario.classList.add('formulario__btn--disabled');
        //Ocualtamos el icono de siguiente 
        btnFormulario
            .querySelector('[data-icono="siguiente"]')
            .classList.remove('formulario__btn-contenedor-icono--active');


        //Mostramos el icono del banco
        btnFormulario.querySelector('[data-icono="banco"]').classList.add('formulario__btn-contenedor-icono--active');

        siguientePaso();

        //Eliminamos la clase de disabled despues de 4 segundos
        setTimeout(() => {
            btnFormulario.classList.remove('formulario__btn--disabled');
        }, 4000);
    }

});

const linea = document.getElementById('linea-pasos');

addEventListener('click', (e) => {
    if (!e.target.closest('.linea-pasos__paso')) {
        return false;
    }

    const pasoActual = document.querySelector('.linea-pasos__paso-check--active').closest('.linea-pasos__paso').dataset.paso;

    //Validamos el campo actual
    if (pasoActual === 'cantidad') {
        if (!validarCantidad()) return false;
    } else if (pasoActual === 'datos') {
        if (!validarNombre() || !validarCorreo()) return;
    }

    //Obtenemos el paso que queremos navegar
    const pasoANavegar = e.target.closest('.linea-pasos__paso');
    //Comprobamos si el paso tiene el icono de palomita
    //Solo queremos poder dar click a los que tienen palomita
    if (pasoANavegar.querySelector('.linea-pasos__pasos-check--checked')) {

        const pasoActual = linea.querySelector('.linea-pasos__paso-check--active');
        pasoActual.classList.remove('linea-pasos__paso-check--active');

        //Obtenemos el identificador del paso a navegar
        const id = pasoANavegar.dataset.paso;

        //Agregamos la clase de active al nuevo paso 
        linea.querySelector(`[data-paso="${id}"] span`).classList.add('linea-pasos__paso-check--active');

        //Nos aseguramos de que el texto del boton sea siguiente 
        const btnFormulario = document.querySelector('#formulario__btn');
        btnFormulario.querySelector('span').innerText = 'Siguiente';

        //Nos aseguramos de ocultar el icono del banco 
        btnFormulario.querySelector('[data-icono="banco" ]').classList.remove('formulario__btn-contenedor-icono--active');

        //Nos aseguramos de mostrar el icono de siguiente
        btnFormulario.querySelector('[data-icono="siguiente"]').classList.add('formulario__btn-contenedor-icono--active');

        //Eliminamos la clase disabled
        btnFormulario.classList.remove('formulario__btn--disabled');

        //Navegamos al paso 
        document.querySelector(`.formulario__body [data-paso="${id}"`).scrollIntoView({
            inline: 'start',
            behavior: 'smooth'
        });
    }

});
//# sourceMappingURL=bundle.js.map
