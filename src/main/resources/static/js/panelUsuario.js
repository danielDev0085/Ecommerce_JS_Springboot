// VARIABLES ENLACES A SECCIONES
var enlaceCuenta = document.getElementById("enlaceCuenta");
var enlaceDeseos = document.getElementById("enlaceDeseos");
var enlaceDirecciones = document.getElementById("enlaceDirecciones");
var enlacePedidos = document.getElementById("enlacePedidos");
var enlaceCancelados = document.getElementById("enlaceCancelados");
// VARIABLES SECCIONES
var seccionCuenta = document.getElementById("seccionCuenta");
var seccionDeseos = document.getElementById("seccionDeseos");
var seccionDirecciones = document.getElementById("seccionDirecciones");
var seccionPedidos = document.getElementById("seccionPedidos");
var seccionCancelados = document.getElementById("seccionCancelados");
var secciones = [seccionCuenta, seccionDeseos, seccionDirecciones, seccionPedidos, seccionCancelados];
// VARIABLES FORMS
var formCuentaNick = document.forms['formCuentaNick'];
var inputNick = document.forms['formCuentaNick']['nick'];
var formFechaNacimiento = document.forms['formFechaNacimiento'];
var inputDia = document.forms['formFechaNacimiento']['dia'];
var inputMes = document.forms['formFechaNacimiento']['mes'];
var inputAño = document.forms['formFechaNacimiento']['año'];
var btnNacimiento = document.forms['formFechaNacimiento']['btnNacimiento'];
var formCuentaNick = document.forms['formContraseña'];
var contraseña = document.forms['formContraseña']['contraseña'];
var contraseñaNueva = document.forms['formContraseña']['contraseña-nueva'];
var repetirContraseña = document.forms['formContraseña']['repetir-contraseña'];
var btnContraseña = document.forms['formContraseña']['btnContraseña'];

// abrimos secciones segun enlace
enlaceCuenta.addEventListener('click', () => {
    for (let i = 0; i < secciones.length; i++) {
        secciones[i].classList.add("d-none");
    }
    seccionCuenta.classList.remove("d-none");
});
enlaceDeseos.addEventListener('click', () => {
    for (let i = 0; i < secciones.length; i++) {
        secciones[i].classList.add("d-none");
    }
    seccionDeseos.classList.remove("d-none");
});
enlaceDirecciones.addEventListener('click', () => {
    for (let i = 0; i < secciones.length; i++) {
        secciones[i].classList.add("d-none");
    }
    seccionDirecciones.classList.remove("d-none");
});
enlacePedidos.addEventListener('click', () => {
    for (let i = 0; i < secciones.length; i++) {
        secciones[i].classList.add("d-none");
    }
    seccionPedidos.classList.remove("d-none");
});
enlaceCancelados.addEventListener('click', () => {
    for (let i = 0; i < secciones.length; i++) {
        secciones[i].classList.add("d-none");
    }
    seccionCancelados.classList.remove("d-none");
});

// obtenemos el usuario con sesion abierta, usuario que está logueado
let usuario = localStorage.getItem("usuario");
// console.log("Hemos recibido el usuario que es " + usuario);