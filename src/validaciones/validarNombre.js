const formulario = document.getElementById('formulario');


const validarNombre = () => {
    //Aceptamos cualquier digito del 1 al 9, y un punto con decimales (opcional)
    const expRegNombre = /^[a-zA-ZÀ-ÿ\s]{1,40}$/;
    //Obtenemos el input cantidad
    const inputNombre = formulario['nombre-receptor']; 

    if (expRegNombre.test(inputNombre.value)) {
        inputNombre.classList.remove('formulario__input--error');
        return true;
    } else {
        inputNombre.classList.add('formulario__input--error');
        return false;
    }
};

export default validarNombre;