/* VARIABLES LOGIN */
var loginForm =  document.forms['loginForm']; // formulario del login
var btnLogin = document.getElementById("btnLogin");
var checkboxRecuerdame = document.getElementById("recuerdame");
var divErrorLogin = document.getElementById("divErrorLogin");

// cuando presionamos tecla en input, llamamos a función presionaTecla
loginForm['usuarioLogin'].addEventListener("keyup", presionaTecla);
loginForm['contraseñaLogin'].addEventListener("keyup", presionaTecla);

/* FUNCION PARA LOGUEARSE Y GUARDAR LOGIN EN COOKIE */
btnLogin.addEventListener("click", (event) => {
    event.preventDefault(); // evitamos envío de formulario
    var usuarioLogin = document.getElementById("usuarioLogin").value; // valor del input usuario
    var contraseñaLogin = document.getElementById("contraseñaLogin").value; // valor del input contraseña

    if (usuarioLogin != "" && contraseñaLogin != "") { // si los 2 campos están rellenados...
        //console.log("recuerdame clickado");
        let xhr = new XMLHttpRequest(); // obtenemos el objeto en una variable para manejar la peticion ajax
        xhr.addEventListener("readystatechange", function () { // le establecemos una funcion que es el cambio de estado
            if (xhr.readyState == 4 && xhr.status == 200) { // el readyState es 4 se ha enviado y el estado es 200 está OK
                var respuesta = xhr.responseText; // obtenemos la respuesta de PHP
                console.log(respuesta); // muestra 1 o 0, true o false
                if (respuesta == 1) { // si es true...
                    document.getElementById("usuarioLogin").classList.remove("is-invalid");
                    document.getElementById("contraseñaLogin").classList.remove("is-invalid");
                    divErrorLogin.style.display = "none";
                    if (checkboxRecuerdame.checked == true) { // si está checkeado recordar login
                        crearCookieLogin(usuarioLogin, contraseñaLogin); // llamamos a función para crear cookie con los datos del login
                    }
                    loginForm.submit(); // enviamos formulario
                }
                if(respuesta === "0") { // si el usuario recibido es admin, dirigimos a la página...
                    window.location.href='./panelAdmin.html';
                }
                if(respuesta === "2") { // si la respuesta es false, 0, no reconoce usuario y/o contraseña
                    document.getElementById("usuarioLogin").classList.add("is-invalid");
                    document.getElementById("contraseñaLogin").classList.add("is-invalid");
                    divErrorLogin.style.display = "block";
                    divErrorLogin.innerHTML = "Usuario o contraseña incorrectos !";
                }
            }
        });
        xhr.open("POST", "./person/login"); // preparamos el envio mediante post, true es asíncrono creo...
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // hace referencia a la cabecera del envío
        xhr.send("usuario=" + usuarioLogin + "&pass=" + contraseñaLogin); // enviamos pasándole las variables que son los valores del input
    }
    else if (usuarioLogin != "") {
        document.getElementById("contraseñaLogin").classList.add("is-invalid");
        divErrorLogin.style.display = "block";
        divErrorLogin.innerHTML = "Campo o campos vacios !";
    }
    else if (contraseñaLogin != "") {
        document.getElementById("usuarioLogin").classList.add("is-invalid");
        divErrorLogin.style.display = "block";
        divErrorLogin.innerHTML = "Campo o campos vacios !";
    }
    else { // si uno o los 2 campos están vacios...
        document.getElementById("usuarioLogin").classList.add("is-invalid");
        document.getElementById("contraseñaLogin").classList.add("is-invalid");
        divErrorLogin.style.display = "block";
        divErrorLogin.innerHTML = "Campo o campos vacios !";
    }

});
/* FUNCION CREAR COOKIE */
function crearCookieLogin(usuario, pass) {
    let fechaActual = new Date();
    fechaActual.setTime(fechaActual.getTime() + (365*24*60*60*1000)); // asiganmos 1 año a la fecha actual para la cookie
    let expira = "expires=" + fechaActual.toUTCString();
    document.cookie = "datosLogin=" + usuario + "," + pass + ";" + expira + ";path=/";
}
/* FUNCION OBTENER COOKIES Y RETORNAR */
function obtenerCookieLogin() {
    let cookies = document.cookie.split("; "); // separamos en un array las cookies
    let cookie = [];
    for (let i = 0; i < cookies.length; i++) {
        cookie.push(cookies[i].split("=")); // por cada cookie guardamos un array bidimensional de nombre y valor
    }
    let datosLogin = [];
    for (let j = 0; j < cookie.length; j++) {
        if (cookie[j][0] == "datosLogin") {
            datosLogin.push(cookie[j][1].split(",")); // por cada cookie iterada, separamos el valor por la , que son usuario y contraseña
        }
    }
    // obtenemos los input
    let usuarioLogin = document.getElementById("usuarioLogin"); 
    let contraseñaLogin = document.getElementById("contraseñaLogin");

    if (datosLogin[0]) {
        // le damos el valor al input del usuario y contraseña que tenemos en la cookie
        usuarioLogin.value = datosLogin[0][0];
        contraseñaLogin.value = datosLogin[0][1];
    }
    else {
        usuarioLogin.value = "";
        contraseñaLogin.value = "";
    }
}
/* FUNCION CUANDO PRESIONAMOS TECLA EN INPUT */
function presionaTecla(event) {
    var input = event.target; // obtenemos el input del evento llamado
    var idInput = input.getAttribute("id"); // obtenemos el id del input

    switch (idInput) { // para cada caso, si no está vacío el input...
        case 'usuarioLogin':
            if (input.value != "") {
                input.classList.remove("is-invalid");
            }
            break;
        
        case 'contraseñaLogin':
            if (input.value != "") {
                input.classList.remove("is-invalid");
            }
            break;
    }

    // si los 2 valores no están vacios eliminamos mensaje de campo o campos vacios
    if(document.getElementById("usuarioLogin").value != "" && document.getElementById("contraseñaLogin").value != "") {
        divErrorLogin.style.display = "none";
    }
}