/* VARIABLES REGISTRO INPUT FORMULARIO*/
var formRegistro = document.forms["formRegistro"];
var dni = formRegistro['dni'];
var nombre = formRegistro['nombre'];
var apellidos = formRegistro['apellidos'];
var telefono = formRegistro['telefono'];
var correo = formRegistro['correo'];
var usuarioRegistro = formRegistro['usuarioRegistro'];
var contraseña1 = formRegistro['contraseña1'];
var contraseña2 = formRegistro['contraseña2'];
var btnRegistro = document.getElementById("btnRegistro");
/* VARIABLES REGISTRO DIVS ERRORES */
var divErrorRegistro = document.getElementById("divErrorRegistro");
var errorRegistroDni = document.getElementById("errorRegistroDni");
var errorRegistroNombre = document.getElementById("errorRegistroNombre");
var errorRegistroApellidos = document.getElementById("errorRegistroApellidos");
var errorRegistroTelefono = document.getElementById("errorRegistroTelefono");
var errorRegistroCorreo = document.getElementById("errorRegistroCorreo");
var errorRegistroUsuario = document.getElementById("errorRegistroUsuario");
var errorRegistroContraseña1 = document.getElementById("errorRegistroContraseña1");
var errorRegistroContraseña2 = document.getElementById("errorRegistroContraseña2");
/* ARRAYS DE INPUTS, DIVS ERRORES... */
var inputsRegistroObligatorios = [dni, nombre, apellidos, correo, usuarioRegistro, contraseña1, contraseña2];
var inputsAllRegistros = [dni, nombre, apellidos, telefono, correo, usuarioRegistro, contraseña1, contraseña2];
var divsErroresInputs = [errorRegistroDni, errorRegistroNombre, errorRegistroApellidos, errorRegistroTelefono, errorRegistroCorreo, errorRegistroUsuario, 
                         errorRegistroContraseña1, errorRegistroContraseña2];
/* OTRAS VARIABLES */
var estadoFormulario = false; // Al comienzo, tenemos el formulario en false, no hemos hecho nada aún, campos vacíos
var validacionFormulario = false; // Al comienzo, no hemos validado formulario, una vez intentemos registrar pasa a true

/* PONER INPUTS VACIOS EN INICIO */
function inputsVacios() {
    for (let i = 0; i < inputsAllRegistros.length; i++) {
        inputsAllRegistros[i].value = "";
    }
}

/* FUNCION REGISTRAR USUARIO */
btnRegistro.addEventListener("click", (event) => {
    event.preventDefault(); // evitamos envío de formulario
    validacionFormulario = true; // pasamos la validacion de formulario a activa, necesario para la función pierdeFoco()

    for (let i = 0; i < inputsRegistroObligatorios.length; i++) { // recorremos inputs obligatorios, todos excepto teléfono
        if (inputsRegistroObligatorios[i].value == "") { // si están vacíos...
            divErrorRegistro.style.display = "block";
            divErrorRegistro.innerHTML = "Campo o campos vacios";
            inputsRegistroObligatorios[i].style.border = "2px solid red";
        }
        else {
            pierdeFoco(event);
        }
    }
    
    if (estadoFormulario) { // si todos los input están correctos
        validacionFormulario = false; // validacion ya no es necesaria
        
        /*Hacemos petición para registrar usuario*/
        let dni = formRegistro['dni'].value;
        let nombre = formRegistro['nombre'].value;
        let apellidos = formRegistro['apellidos'].value;
        let telefono = formRegistro['telefono'].value;
        let correo = formRegistro['correo'].value;
        let usuario = formRegistro['usuarioRegistro'].value;
        let contraseña = formRegistro['contraseña1'].value; 
        let tipo=1;
        let infoRegistro=document.getElementById("infoRegistro");

        let configFetch = {
            method : "post",
            body : JSON.stringify({dni: dni, name: nombre, lastname: apellidos, telephone: telefono, email: correo, username: usuario, password: contraseña, type: tipo}),
            //headers : {'Content-Type':'application/x-www-form-urlencoded'} Así como URL
            headers : {'Content-Type':'application/json;charset=UTF-8'} //Así como JSON
        }

        let promesa = fetch("./person/save", configFetch);

        promesa.then((respuesta) => {
            if (!respuesta.ok) {
                console.log("No se pudo obtener la respuesta");
            }
            respuesta.text().then((datos)=>{
                infoRegistro.innerHTML=datos
            });
        }).catch((error)=>{
            console.log(error.message);
        });
    }
});

/* EVENTOS DE INPUTS */
for (let i = 0; i < inputsAllRegistros.length; i++) {
    inputsAllRegistros[i].addEventListener("blur", pierdeFoco); // input pierde foco
    inputsAllRegistros[i].addEventListener("focus", ganaFoco); // input gana foco
    inputsAllRegistros[i].addEventListener("keyup", pulsaTecla); // presionamos tecla en input
}
/* EXPRESIONES REGULARES */
function expresionRegular(input, idInput) {
    var ExRegDni = /^[0-9]{8}[A-z]{1}$/; // 8 numeros y una letra, mayuscula o minuscula
    var ExRegNombreApellidos = /^[A-z]{2,}$/; // solo letras y mínimo 2
    var ExRegTelef = /^[0-9]{9}$/; // solo números y exactamente 9
    var ExRegCorreo = /^[A-z0-9]+@[A-z0-9]+\.[A-z0-9]{2,3}$/; // formato válido: nombre@dominio.extension
    var ExRegPass = /[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]{6,}/; /* Tiene que contener, letras mayúsculas, números, minúsculas y esos carácteres especiales */

    switch (idInput) {
        case 'dni':
            if(ExRegDni.test(input.value)) {return true;} else {return false;}
            break;
    
        case 'nombre':
            if(ExRegNombreApellidos.test(input.value)) {return true;} else {return false;}
        break;

        case 'apellidos':
            if(ExRegNombreApellidos.test(input.value)) {return true;} else {return false;}
            break;
    
        case 'telefono':
            if(ExRegTelef.test(input.value)) {return true;} else {return false;}
        break;

        case 'correo':
            if(ExRegCorreo.test(input.value)) {return true;} else {return false;}
            break;
    
        case 'usuarioRegistro': // no hace falta comprobar
            return true;
        break;

        case 'contraseña1':
            if(ExRegPass.test(input.value)) {return true;} else {return false;}
            break;

        case 'contraseña2': // solo comprobamaremos que sea igual a contraseña 1
            return true;
        break;
    }
}
/* EVENTO PIERDE FOCO */
function pierdeFoco(event, eventForm) {
    if (eventForm) { // el segundo parámetro hace referencia al evento del form, si existe, es que NO lo llamamos desde evento "blur", es el llamado desde formulario
        input = eventForm; // asignamos valor al input
    }else {
        var input = event.target; // si no existe, asignamos valor al input del input con el evento "blur"
    }
    let idInput = input.getAttribute("id"); // id del input

    switch (idInput) { // para cada caso segun id del input...
        case 'dni':
            if (validacionFormulario) { // si hemos intentado validar el formulario
                if (input.value == "") { // input vacio...
                    errorRegistroDni.style.display = "block";
                    errorRegistroDni.innerHTML = "Campo dni vacio";
                    input.style.border = "2px solid red";
                    estadoFormulario = false;
                }
                else if (!expresionRegular(input, idInput)){ // expresion regular incorrecta...
                    errorRegistroDni.style.display = "block";
                    errorRegistroDni.innerHTML = "dni no válido";
                    input.style.border = "2px solid red";
                    estadoFormulario = false;
                }
                else { // valor del input correcto...
                    errorRegistroDni.style.display = "none";
                    input.style.border = "none";
                    estadoFormulario = true;
                }
            }
            else { // no hemos intentado validar el formulario
                if (input.value == "") { 
                    errorRegistroDni.style.display = "none";
                    estadoFormulario = false;
                }
                else if (expresionRegular(input, idInput)){
                    estadoFormulario = true;
                }
            }
            break;
    
        case 'nombre':
            if (validacionFormulario) {
                if (input.value == "") {
                    errorRegistroNombre.style.display = "block";
                    errorRegistroNombre.innerHTML = "Campo nombre vacio";
                    input.style.border = "2px solid red";
                }
                else if (!expresionRegular(input, idInput)){
                    errorRegistroNombre.style.display = "block";
                    errorRegistroNombre.innerHTML = "Nombre no válido";
                    input.style.border = "2px solid red";
                    estadoFormulario = false;
                }
                else {
                    errorRegistroNombre.style.display = "none";
                    input.style.border = "none";
                    estadoFormulario = true;
                }
            }
            else {
                if (input.value == "") {
                    errorRegistroNombre.style.display = "none";
                    estadoFormulario = false;
                }
                else if (expresionRegular(input, idInput)){
                    estadoFormulario = true;
                }
            }
        break;

        case 'apellidos':
            if (validacionFormulario) {
                if (input.value == "") {
                    errorRegistroApellidos.style.display = "block";
                    errorRegistroApellidos.innerHTML = "Campo apellidos vacio";
                    input.style.border = "2px solid red";
                }
                else if (!expresionRegular(input, idInput)){
                    errorRegistroApellidos.style.display = "block";
                    errorRegistroApellidos.innerHTML = "Apellidos no válido";
                    input.style.border = "2px solid red";
                    estadoFormulario = false;
                }
                else {
                    errorRegistroApellidos.style.display = "none";
                    input.style.border = "none";
                    estadoFormulario = true;
                }
            }
            else {
                if (input.value == "") {
                    errorRegistroApellidos.style.display = "none";
                    estadoFormulario = false;
                }
            }
            break;
    
        case 'telefono':
            if (validacionFormulario) {
                if (input.value == "") {
                    errorRegistroTelefono.style.display = "none";
                    estadoFormulario = true;
                }
                else if (input.value != "" && !expresionRegular(input, idInput)){
                    errorRegistroTelefono.style.display = "block";
                    errorRegistroTelefono.innerHTML = "Teléfono no válido";
                    input.style.border = "2px solid red";
                    estadoFormulario = false;
                }
                else {
                    errorRegistroTelefono.style.display = "none";
                    input.style.border = "none";
                    estadoFormulario = true;
                }
            }
            else {
                if (input.value == "") {
                    errorRegistroTelefono.style.display = "none";
                    estadoFormulario = true;
                }
            }
            break;

        case 'correo':
            if (validacionFormulario) {
                if (input.value == "") {
                    errorRegistroCorreo.style.display = "block";
                    errorRegistroCorreo.innerHTML = "Campo correo vacio";
                    input.style.border = "2px solid red";
                }
                else if (!expresionRegular(input, idInput)){
                    errorRegistroCorreo.style.display = "block";
                    errorRegistroCorreo.innerHTML = "Correo no válido";
                    input.style.border = "2px solid red";
                    estadoFormulario = false;
                }
                else {
                    errorRegistroCorreo.style.display = "none";
                    input.style.border = "none";
                    estadoFormulario = true;
                }
            }
            else {
                if (input.value == "") {
                    errorRegistroCorreo.style.display = "none";
                    estadoFormulario = false;
                }
                else if (expresionRegular(input, idInput)){
                    estadoFormulario = true;
                }
            }
            break;
    
        case 'usuarioRegistro':
            if (validacionFormulario) {
                if (input.value == "") {
                    errorRegistroUsuario.style.display = "block";
                    errorRegistroUsuario.innerHTML = "Campo usuario vacio";
                    input.style.border = "2px solid red";
                }
                else if (input.value.length < 4){
                    errorRegistroUsuario.style.display = "block";
                    errorRegistroUsuario.innerHTML = "Usuario no válido";
                    input.style.border = "2px solid red";
                    estadoFormulario = false;
                }
                else {
                    errorRegistroUsuario.style.display = "none";
                    input.style.border = "none";
                    estadoFormulario = true;
                }
            }
            else {
                if (input.value == "") {
                    errorRegistroUsuario.style.display = "none";
                    estadoFormulario = false;
                }
                else if (expresionRegular(input, idInput)){
                    estadoFormulario = true;
                }
            }
            break;

        case 'contraseña1':
            if (validacionFormulario) {
                if (input.value == "") {
                    errorRegistroContraseña1.style.display = "block";
                    errorRegistroContraseña1.innerHTML = "Campo contraseña vacio";
                    input.style.border = "2px solid red";
                }
                else if (!expresionRegular(input, idInput)){
                    errorRegistroContraseña1.style.display = "block";
                    errorRegistroContraseña1.innerHTML = "Contraseña no válida";
                    input.style.border = "2px solid red";
                    estadoFormulario = false;
                }
                else {
                    errorRegistroContraseña1.style.display = "none";
                    input.style.border = "none";
                    estadoFormulario = true;
                }
            }
            else {
                if (input.value == "") {
                    errorRegistroContraseña1.style.display = "none";
                    estadoFormulario = false;
                }
                
                else if (expresionRegular(input, idInput)){
                    estadoFormulario = true;
                }
            }
            break;
    
        case 'contraseña2':
            if (validacionFormulario) {
                if (input.value == "") {
                    errorRegistroContraseña2.style.display = "block";
                    errorRegistroContraseña2.innerHTML = "Campo repite contraseña vacio";
                    input.style.border = "2px solid red";
                }
                else if (input.value != formRegistro['contraseña1'].value){
                    errorRegistroContraseña2.style.display = "block";
                    errorRegistroContraseña2.innerHTML = "Contraseña no coincide";
                    input.style.border = "2px solid red";
                    estadoFormulario = false;
                }
                else {
                    errorRegistroContraseña2.style.display = "none";
                    input.style.border = "none";
                    estadoFormulario = true;
                }
            }
            else {
                if (input.value == "") {
                    errorRegistroContraseña2.style.display = "none";
                    estadoFormulario = false;
                }
                else if (expresionRegular(input, idInput)){
                    estadoFormulario = true;
                }
            }
            break;
    }
}
/* EVENTO GANA FOCO */
function ganaFoco(event) {
    let input = event.target;
    let idInput = input.getAttribute("id");

    switch (idInput) {
        case 'dni':
            errorRegistroDni.style.display = "block";
            errorRegistroDni.innerHTML = "Formado por 8 números y una letra";
            break;
    
        case 'nombre':
            errorRegistroNombre.style.display = "block";
            errorRegistroNombre.innerHTML = "Sólo letras y mínimo 2";
        break;

        case 'apellidos':
            errorRegistroApellidos.style.display = "block";
            errorRegistroApellidos.innerHTML = "Sólo letras y mínimo 2";
            break;
    
        case 'telefono':
            errorRegistroTelefono.style.display = "block";
            errorRegistroTelefono.innerHTML = "Formado por 9 números";
        break;

        case 'correo':
            errorRegistroCorreo.style.display = "block";
            errorRegistroCorreo.innerHTML = "Formato válido: nombre@dominio.extension";
            break;
    
        case 'usuarioRegistro':
            errorRegistroUsuario.style.display = "block";
            errorRegistroUsuario.innerHTML = "Mínimo 4 caracteres";
        break;

        case 'contraseña1':
            errorRegistroContraseña1.style.display = "block";
            errorRegistroContraseña1.innerHTML = "Mínimo 6 caracteres, incluye minúsculas, mayúsculas, números y caracteres especiales";
            break;
    
        case 'contraseña2':
            errorRegistroContraseña2.style.display = "block";
            errorRegistroContraseña2.innerHTML = "Exactamente igual a contraseña";
        break;
    }
}
/* EVENTO PULSA TECLA */
function pulsaTecla(event) {
    let input = event.target;
    let idInput = input.getAttribute("id");

    switch (idInput) {
        case 'dni':
            if (expresionRegular(input, idInput)) {
                errorRegistroDni.style.display = "none";
            }
            break;
    
        case 'nombre':
            if (expresionRegular(input, idInput)) {
                errorRegistroNombre.style.display = "none";
            }
        break;

        case 'apellidos':
            if (expresionRegular(input, idInput)) {
                errorRegistroApellidos.style.display = "none";
            }
            break;
    
        case 'telefono':
            if (expresionRegular(input, idInput)) {
                errorRegistroTelefono.style.display = "none";
            }
            break;

        case 'correo':
            if (expresionRegular(input, idInput)) {
                errorRegistroCorreo.style.display = "none";
            }
            break;
    
        case 'usuarioRegistro':
            if (input.value.length >= 4) {
                errorRegistroUsuario.style.display = "none";
            }
            break;

        case 'contraseña1':
            if (expresionRegular(input, idInput)) {
                errorRegistroContraseña1.style.display = "none";
            }
            break;
    
        case 'contraseña2':
            if (input.value == formRegistro['contraseña1'].value) {
                errorRegistroContraseña2.style.display = "none";
            }
        break;
    }
}