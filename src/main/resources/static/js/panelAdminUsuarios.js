/*Limpiar campos informativos*/
function limpiarCamposInformativos(){
    let errorBuscarDni=document.getElementById("errorBuscarDni");
    errorBuscarDni.innerHTML="";

    let informacion=document.getElementById("informacion");
    informacion.innerHTML="";

    let infoActualizarUsuario=document.getElementById("infoActualizarUsuario");
    infoActualizarUsuario.innerHTML="";

    let errorBuscarProducto=document.getElementById("errorBuscarProducto");
    errorBuscarProducto.innerHTML="";

    let infoProductos=document.getElementById("infoProductos");
    infoProductos.innerHTML="";

    let infoActualizarProducto=document.getElementById("info-actualizar-producto");
    infoActualizarProducto.innerHTML="";
}

/*Eliminar usuario*/
function eliminarUsuario(dni){
    //Borramos campos informativos
    limpiarCamposInformativos();

    //Párrafo para mostrar información
    let parrafoInfo = document.getElementById("informacion");

    let configFetch={
        method : "POST",
        body : "eliminarUsuario="+dni,
        headers : {'Content-Type':'application/x-www-form-urlencoded'}
    }

    let promesa=fetch("./controlador/admin.php", configFetch);

    promesa.then(
        (respuesta)=>{
            if(!respuesta.ok){
                console.log("Respuesta no recibida");
                throw new Error('Error en la solicitud' + respuesta.status);
            }else{
                //console.log("Respuesta recibida");
            }
            
            respuesta.json().then(
                (resultado)=>{
                    //Tratar error
                    if (resultado.error) {
                        parrafoInfo.innerHTML=resultado.error;
                    }
                    //Tratar datos de respuesta
                    if(resultado.mensaje){
                        parrafoInfo.innerHTML=resultado.mensaje;
                    }
                });
    }).catch(
        (error)=>{
            console.log("Error: " + error.message);
    });

    verUsuarios();
}

/*Mostrar en formulario el usuario para ser modificado */
function mostrarUsuario(dni){
    //Borramos campos informativos
    limpiarCamposInformativos();

    //Hacemos visible el formulario
    let formModificarUsuarios=document.getElementById("formModificarUsuario");
    formModificarUsuarios.style.display="block";

    //Elemento para mostrar información
    let parrafoInfo=document.getElementById("informacion");

    let configFetch={
        method : "POST",
        body : "modificarUsuario="+dni,
        headers : {'Content-Type':'application/x-www-form-urlencoded'}
    }

    let promesa=fetch("./controlador/admin.php", configFetch);

    promesa.then(
        (respuesta)=>{
            if(!respuesta.ok){
                console.log("Respuesta no recibida");
                throw new Error('Error en la solicitud' + respuesta.status);
            }else{
                //console.log("Respuesta recibida para mostrat usuario en formulario");
            }
            
            respuesta.json().then(
                (usuario)=>{
                    //Tratar error
                    if (usuario.error) {
                        parrafoInfo.innerHTML=usuario.error;
                    }

                    //Tratar datos de respuesta
                    //Poner como vacío los campos que pueden ser null
                    if(usuario.apellidos==null){
                        usuario.apellidos="";
                    }
                    if(usuario.telefono==null){
                        usuario.telefono="";
                    }
                    if(usuario.numero==null){
                        usuario.numero="";
                    }
                    if(usuario.piso==null){
                        usuario.piso="";
                    }
                    if(usuario.letra==null){
                        usuario.letra="";
                    }
                    if(usuario.otros==null){
                        usuario.otros="";
                    }
                    if(usuario.calle==null){
                        usuario.calle="";
                    }
                    if(usuario.numero==null){
                        usuario.numero="";
                    }
                    if(usuario.piso==null){
                        usuario.piso="";
                    }
                    if(usuario.letra==null){
                        usuario.letra="";
                    }
                    if(usuario.municipio==null){
                        usuario.municipio="";
                    }
                    if(usuario.provincia==null){
                        usuario.provincia="";
                    }
                    if(usuario.codigo_postal==null){
                        usuario.codigo_postal="";
                    }
                    
                    //Añadir formularios para modificar usuario y dirección
                    formModificarUsuarios.innerHTML="";

                    formModificarUsuarios.innerHTML+=`
                    <h5 class="mt-4 text-center">Datos de usuario</h5>
                    <form id="formRegistro class="row">
                        <div class="btn-cerrar d-flex justify-content-end">
                            <button class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                        </div>
                        <div class="row my-4 d-flex justify-content-center align-items-center">
                            <div class="col-4">
                                <label class="row d-block" for="usuario">Usuario 
                                    <div class="d-flex justify-content-center p-0">
                                        <input class="d-block col-12" type="text" name="usuario" id="usuario" placeholder="`+usuario.usuario+`" value="`+usuario.usuario+`" readonly>
                                        <div class="invalid-feedback d-block" id="errorRegistroUsuario"></div>  
                                    </div>
                                </label>  
                            </div>
                        </div>

                        <div class="row my-4 d-flex justify-content-between align-items-center">
                            <div class="col-4">
                                <label class="row d-block" for="dni">DNI/CIF
                                    <input class="d-block col-5" type="text" name="dni" id="dni" placeholder="`+usuario.dni+`" value="`+usuario.dni+`" readonly>
                                    <div class="invalid-feedback d-block" id="errorRegistroDni"></div>
                                </label>
                            </div>
                            <div class="col-4">
                                <label class=" row d-block" for="nombre">Nombre 
                                    <input class="d-block col-8" type="text" name="nombre" id="nombre" placeholder="`+usuario.nombre+`" value="`+usuario.nombre+`">
                                    <div class="invalid-feedback d-block" id="errorRegistroNombre"></div>
                                </label>
                            </div>
                            <div class="col-4">
                                <label class="mx-4 row d-block" for="apellidos">Apellidos 
                                    <input class="d-block col-12" type="text" name="apellidos" id="apellidos" placeholder="`+usuario.apellidos+`" value="`+usuario.apellidos+`">
                                    <div class="invalid-feedback d-block" id="errorRegistroApellidos"></div>
                                </label>
                            </div>
                        </div>

                        <div class="row my-4 d-flex justify-content-start align-items-center">
                            <div class="col-4">
                                <label class="row d-block" for="telefono">Teléfono
                                    <input class="d-block col-5" type="tel" name="telefono" id="telefono" placeholder="`+usuario.telefono+`" value=`+usuario.telefono+`>
                                    <div class="invalid-feedback d-block" id="errorRegistroTelefono"></div>
                                </label>
                            </div>
                            <div class="col-4 my-4">
                                <label class="row d-block" for="correo">Correo electrónico 
                                    <input class="d-block col-12" type="email" name="correo" id="correo" placeholder="`+usuario.correo+`" value="`+usuario.correo+`">
                                    <div class="invalid-feedback d-block" id="errorRegistroCorreo"></div>
                                </label>
                            </div>
                        </div>
                    </form>

                    <hr>

                    <h5 class="mt-5 text-center">Dirección de usuario</h5>
                    <form id="formDireccionUsuario">
                        <div class="row row my-4 d-flex justify-content-center align-items-center">
                            <input type="hidden" name="id_direccion" id="id_direccion" value="`+usuario.id_direccion+`">
                            <div class="col-6">
                                <label class="row d-block" for="calle">Calle 
                                    <input class="d-block col-10" type="text" name="calle" id="calle" placeholder="`+usuario.calle+`" value="`+usuario.calle+`">
                                    <div class="invalid-feedback d-block" id="errorRegistroCalle"></div>
                                </label>
                            </div>
                            <div class="col-2">
                                <label class="row d-block" for="numero">Número
                                    <input class="d-block col-5 p-0" type="number" name="numero" id="numero" placeholder="`+usuario.numero+`" value=`+usuario.numero+`>
                                    <div class="invalid-feedback d-block" id="errorRegistroNumero"></div>
                                </label>
                            </div>
                            <div class="col-2">
                                <label class="row d-block" for="piso">Piso 
                                    <input class="d-block col-5 p-0" type="number" name="piso" id="piso" placeholder="`+usuario.piso+`" value=`+usuario.piso+`>
                                    <div class="invalid-feedback d-block" id="errorRegistroPiso"></div>
                                </label>
                            </div>
                            <div class="col-2">
                                <label class="row d-block" for="letra">Letra
                                    <input class="d-block col-5" type="text" name="letra" id="letra" placeholder="`+usuario.letra+`" value="`+usuario.letra+`">
                                    <div class="invalid-feedback d-block" id="errorRegistroLetra"></div>
                                </label>
                            </div>
                        </div>

                        <div class="row my-4 d-flex justify-content-center align-items-center">
                            <div class="col-4">
                                <label class="row d-block" for="municipio">Municipio 
                                    <input class="d-block col-8" type="text" name="municipio" id="municipio" placeholder="`+usuario.municipio+`" value="`+usuario.municipio+`">
                                    <div class="invalid-feedback d-block" id="errorRegistroMunicipio"></div>
                                </label>
                            </div>
                            <div class="col-4">
                                <label class="row d-block" for="provincia">Provincia
                                    <input class="d-block col-8" type="text" name="provincia" id="provincia" placeholder="`+usuario.provincia+`" value="`+usuario.provincia+`">
                                    <div class="invalid-feedback d-block" id="errorRegistroProvincia"></div>
                                </label>
                            </div>
                            <div class="col-4">
                                <label class="row d-block" for="codigoPostal">Código postal 
                                    <input class="d-block col-4 p-0" type="number" name="codigoPostal" id="codigoPostal" placeholder="`+usuario.codigo_postal+`" value=`+usuario.codigo_postal+`>
                                    <div class="invalid-feedback d-block" id="errorRegistroCodigoPostal"></div>
                                </label>
                            </div>
                        </div>

                        <div class="row my-4 d-flex justify-content-center align-items-center">
                            <div class="col-12">
                                <label class="row d-block" for="otros">Otros
                                    <input class="d-block col-5" type="text" name="otros" id="otros" placeholder="`+usuario.otros+`" value="`+usuario.otros+`">
                                </label>
                            </div>
                        </div>

                        
                        <div class="row my-4 mt-4 justify-content-center">
                            <button class="btn btn-actualizar-usuario col-3 bg-success text-white" name="btn-actualizar-usuario" id="actualizar-usuario" type="button" onclick="actualizarUsuario()">Actualizar usuario</button>
                        </div>
                    </form>
                    <hr>
                    `;
                    //Agregar eventos para validación
                    agregarEventos();
                });
    }).catch(
        (error)=>{
            console.log("Error: " + error.message);
    });
}


/*Mostrar usuarios */
function verUsuarios(){
    let cuerpoUsuarios=document.getElementById("cuerpoUsuarios");

    //Elemento para mostrar información
    let parrafoInfo=document.getElementById("informacion");

    //Hacemos petición a controlador para recibir usuarios*/
    //Configuramos petición
    let configFetch= {
        method: "POST",
        body: "pedirInfoUsuarios=''",
        headers: {'Content-Type':'application/x-www-form-urlencoded'}
    }

    //Lanzamos petición
    let promesa=fetch("./controlador/admin.php", configFetch);

    //Configuramos respuesta
    promesa.then(
        (respuesta)=>{
        if(!respuesta.ok){
            console.log("Respuesta no recibida");
            throw new Error('Error en la solicitud' + respuesta.status);
        }
        respuesta.json().then(
            (usuarioJSON)=>{
                //Tratar error
                if (usuarioJSON.error) {
                    parrafoInfo.innerHTML=usuario.error;
                }

                //Tratar datos de respuesta
                cuerpoUsuarios.innerHTML="";

                let numfila=0;

                //Mostramos datos de usuarios
                usuarioJSON.forEach((usuario) => {
                    if(usuario.tipo==0){
                        usuario.tipo="administrador"
                    }else{
                        usuario.tipo="usuario"
                    }

                    if(usuario.fecha_nacimiento==null){
                        usuario.fecha_nacimiento="Sin registro";
                    }
                    if(usuario.telefono==null){
                        usuario.telefono="Sin registro";
                    }
                    if(usuario.calle==null){
                        usuario.calle="Sin registro";
                    }
                    
                    //Filas pares
                    if(numfila%2==0){
                        cuerpoUsuarios.innerHTML+=`
                        <tr class="fila-tabla-par">
                            <td>`+ usuario.dni +`</td>
                            <td>`+ usuario.tipo +`</td>
                            <td>`+ usuario.nombre +`</td>
                            <td>`+ usuario.apellidos +`</td>
                            <td>`+ usuario.usuario +`</td>
                            <td>`+ usuario.telefono +`</td>
                            <td>`+ usuario.correo +`</td>
                            <td>`+ usuario.fecha_nacimiento +`</td>
                            <td>`+ usuario.calle +`</td>
                            <td>
                                <button type="button" class="btn-icon" id="`+ usuario.dni +`" onclick="eliminarUsuario('`+ usuario.dni +`')">
                                    <i class="bi bi-trash" ></i>
                                </button>
                            </td>
                            <td>
                                <button type="button" class="btn-icon" id="`+ usuario.dni +`" onclick="mostrarUsuario('`+ usuario.dni +`')">
                                    <i class="fas fa-pencil-alt" ></i> 
                                </button>
                            </td>
                        </tr>
                    `;
                    //Filas impares
                    }else{
                        cuerpoUsuarios.innerHTML+=`
                        <tr class="fila-tabla-impar">
                            <td>`+ usuario.dni +`</td>
                            <td>`+ usuario.tipo +`</td>
                            <td>`+ usuario.nombre +`</td>
                            <td>`+ usuario.apellidos +`</td>
                            <td>`+ usuario.usuario +`</td>
                            <td>`+ usuario.telefono +`</td>
                            <td>`+ usuario.correo +`</td>
                            <td>`+ usuario.fecha_nacimiento +`</td>
                            <td>`+ usuario.calle +`</td>
                            <td>
                                <button type="button" class="btn-icon" id="`+ usuario.dni +`" onclick="eliminarUsuario('`+ usuario.dni +`')">
                                    <i class="bi bi-trash"></i>
                                </button>
                            </td>
                            <td>
                                <button type="button" class="btn-icon" id="`+ usuario.dni +`" onclick="mostrarUsuario('`+ usuario.dni +`')">
                                    <i class="fas fa-pencil-alt"></i> 
                                </button>
                            </td>
                        </tr>
                    `;
                    }

                    numfila++;
                });
            });
    }).catch(error=>{
        console.log("Error: " + error.message);
    });
}

/*Mostrar usuario por dni*/
function mostrarUsuarioPorDni() {
    /*Valor del buscador*/
    let dniBuscar=document.getElementById("dniBuscar").value;

    /*Limpiar tabla de usuarios */
    let cuerpoUsuarios=document.getElementById("cuerpoUsuarios");
    cuerpoUsuarios.innerHTML="";

    //Elemento para mostrar información
    let parrafoInfo=document.getElementById("informacion");

    //Hacemos petición a controlador para recibir usuarios
    //Configuramos petición
    let configFetch= {
        method: "POST",
        body: "usuarioPorDni="+dniBuscar,
        headers: {'Content-Type':'application/x-www-form-urlencoded'}
    }

    //Lanzamos petición
    let promesa=fetch("./controlador/admin.php", configFetch);

    //Configuramos respuesta
    promesa.then(
        (respuesta)=>{
        if(!respuesta.ok){
            console.log("Respuesta no recibida");
            throw new Error('Error en la solicitud' + respuesta.status);
        }
        respuesta.json().then(
            (usuario)=>{
                //Tratar error
                if (usuario.error) {
                    parrafoInfo.innerHTML=usuario.error;
                }

                //Tratar datos de respuesta
                cuerpoUsuarios.innerHTML="";

                //Mostramos datos de usuarios
                
                if(usuario.tipo==0){
                    usuario.tipo="administrador";
                }else{
                    usuario.tipo="usuario";
                }
                if(usuario.fecha_nacimiento==null){
                    usuario.fecha_nacimiento="Sin registro";
                }
                
                cuerpoUsuarios.innerHTML+=`
                <tr class="fila-tabla-par">
                    <td>`+ usuario.dni +`</td>
                    <td>`+ usuario.tipo +`</td>
                    <td>`+ usuario.nombre +`</td>
                    <td>`+ usuario.apellidos +`</td>
                    <td>`+ usuario.usuario +`</td>
                    <td>`+ usuario.telefono +`</td>
                    <td>`+ usuario.correo +`</td>
                    <td>`+ usuario.fecha_nacimiento +`</td>
                    <td>`+ usuario.calle +`</td>
                    <td>
                        <button type="button" class="btn-icon" id="`+ usuario.dni +`" onclick="eliminarUsuario('`+ usuario.dni +`')">
                            <i class="bi bi-trash" ></i>
                        </button>
                    </td>
                    <td>
                        <button type="button" class="btn-icon" id="`+ usuario.dni +`" onclick="mostrarUsuario('`+ usuario.dni +`')">
                            <i class="fas fa-pencil-alt" ></i> 
                        </button>
                    </td>
                </tr>
                `;
            });
    }).catch(error=>{
        console.log("Error: " + error.message);
    });
}

/*Modificar usuario*/
function actualizarUsuario(){
    //Borramos campos informativos
    limpiarCamposInformativos();

    //div formulario y párrafo para mensaje de éxito
    let formModificarUsuarios=document.getElementById("formModificarUsuario");
    let infoActualizarUsuario=document.getElementById("infoActualizarUsuario");
    
    //Borramos párrafo sobre mensaje de actualizar usuario
    infoActualizarUsuario.innerHTML="";

    //Datos usuario
    let dni=document.getElementById("dni").value; 
    let nombre=document.getElementById("nombre").value;
    let apellidos=document.getElementById("apellidos").value;
    let telefono=document.getElementById("telefono").value;
    let correo=document.getElementById("correo").value;

    //Datos dirección
    let id_direccion=document.getElementById("id_direccion").value;
    let calle=document.getElementById("calle").value; 
    let numero=document.getElementById("numero").value;
    let piso=document.getElementById("piso").value;
    let letra=document.getElementById("letra").value;
    let municipio=document.getElementById("municipio").value;
    let provincia=document.getElementById("provincia").value;
    let otros=document.getElementById("otros").value;
    let codigoPostal=document.getElementById("codigoPostal").value;

    //Configuramos petición
    let configFetch= {
        method: "POST",
        body: "actualizarUsuario=''&dni="+dni+"&nombre="+nombre+"&apellidos="+apellidos+"&telefono="+telefono+"&correo="+correo+"&calle="+calle+"&numero="+numero+"&piso="+piso+"&letra="+letra+"&municipio="+municipio+"&provincia="+provincia+"&otros="+otros+"&codigoPostal="+codigoPostal+"&id_direccion="+id_direccion,
        headers: {'Content-Type':'application/x-www-form-urlencoded'}
    }

    //Lanzamos petición
    let promesa=fetch("./controlador/admin.php", configFetch);

    //Configuramos respuesta
    promesa.then(
        (respuesta)=>{
        if(!respuesta.ok){
            console.log("Respuesta no recibida");
            throw new Error('Error en la solicitud' + respuesta.status);
        }

        respuesta.json().then(
            (mensajeActualizar)=>{
                //Tratar error
                if (mensajeActualizar.error) {
                    parrafoInfo.innerHTML=usuario.error;
                }
                //Tratar datos de respuesta
                if(mensajeActualizar.mensaje){
                    infoActualizarUsuario.innerHTML=mensajeActualizar.mensaje;
                }
                formModificarUsuarios.style.display="none";
            });
    }).catch(error=>{
        console.log("Error: " + error.message);
    });

    verUsuarios();
}

/*Validar formularios*/
function validarFormularios(evt) {
    
    /*Campos de usuario para mostrar errores*/
    let errorRegistroNombre=document.getElementById("errorRegistroNombre");
    let errorRegistroApellidos=document.getElementById("errorRegistroApellidos");
    let errorRegistroTelefono=document.getElementById("errorRegistroTelefono");
    let errorRegistroCorreo=document.getElementById("errorRegistroCorreo");

    /*Campos de direccion para mostrar errores*/
    let errorRegistroCalle=document.getElementById("errorRegistroCalle");
    let errorRegistroPiso=document.getElementById("errorRegistroPiso");
    let errorRegistroNumero=document.getElementById("errorRegistroNumero");
    let errorRegistroLetra=document.getElementById("errorRegistroLetra");
    let errorRegistroMunicipio=document.getElementById("errorRegistroMunicipio");
    let errorRegistroProvincia=document.getElementById("errorRegistroProvincia");
    let errorRegistroCodigoPostal=document.getElementById("errorRegistroCodigoPostal");

    /*Expresiones regulares*/
    let exRegNombreApellidos=/^[A-z]{2,}$/; // solo letras y mínimo 2
    let exRegTelef=/^(?:[0-9]{9})?$/; // solo números y exactamente 9
    let exRegCorreo=/^[A-z0-9]+@[A-z0-9]+\.[A-z0-9]{2,3}$/; // formato válido: nombre@dominio.extension
    let exRegCalle=/^[A-z]*$/; // Solo letras. Una o más
    let exRegPiso=/^[0-9]*$/; // Solo números.
    let exRegNumero=/^[0-9]*$/; // Solo números
    let exRegLetra=/^(?:[A-z]|[0-9]{1,3})?$/; // Solo una letra o números
    let exRegMunicipio=/^[A-z]*$/; // Solo letras
    let exRegProvincia=/^[A-z]*$/; // Solo letras
    let exRegCodigoPostal=/^(?:[0-9]{5})?$/; // Cinco números

    var campo=evt.target;

    switch (campo) {
        case nombre:
            if(!exRegNombreApellidos.test(campo.value)){
                errorRegistroNombre.innerHTML="Mínimo dos letras y sin números";
            }
            break;
        case apellidos:
            if(!exRegNombreApellidos.test(campo.value)){
                errorRegistroApellidos.innerHTML="Mínimo dos letras y sin números";
            }
            break;
        case telefono:
            if(!exRegTelef.test(campo.value)){
                errorRegistroTelefono.innerHTML="Nueve números";
            }
            break;
        case correo:
            if(!exRegCorreo.test(campo.value)){
                errorRegistroCorreo.innerHTML="nombre@dominio.extension";
            }
            break;
        case calle:
            if(!exRegCalle.test(campo.value)){
                errorRegistroCalle.innerHTML="Solo puede contener letras";
            }
            break;
        case numero:
            if(!exRegNumero.test(campo.value)){
                errorRegistroNumero.innerHTML="Solo números";
            }
            break;
        case piso:
            if(!exRegPiso.test(campo.value)){
                errorRegistroPiso.innerHTML="Solo números";
            }
            break;
        case letra:
            if(!exRegLetra.test(campo.value)){
                errorRegistroLetra.innerHTML="Solo una letra o números hasta el 999";
            }
            break;
        case municipio:
            if(!exRegMunicipio.test(campo.value)){
                errorRegistroMunicipio.innerHTML="Solo puede contener letras";
            }
            break;
        case provincia:
            if(!exRegProvincia.test(campo.value)){
                errorRegistroProvincia.innerHTML="Solo puede contener letras";
            }
            break;
        case codigoPostal:
            if(!exRegCodigoPostal.test(campo.value)){
                errorRegistroCodigoPostal.innerHTML="Cinco números";
            }
            break;
    }
}

/*Limpiar errores de validación al entrar al campo */
function limpiarErrores(evt) {
    let campoError=evt.target.nextElementSibling;
    campoError.innerHTML="";
}

/*Agregar evento al documento una vez se haya cargado */
function agregarEventos(){

    /*Inputs de usuario*/ 
    let nombre=document.getElementById("nombre");
    let apellidos=document.getElementById("apellidos");
    let telefono=document.getElementById("telefono");
    let correo=document.getElementById("correo");

    /*Inputs de dirección*/
    let calle=document.getElementById("calle"); 
    let numero=document.getElementById("numero");
    let piso=document.getElementById("piso");
    let letra=document.getElementById("letra");
    let municipio=document.getElementById("municipio");
    let provincia=document.getElementById("provincia");
    let codigoPostal=document.getElementById("codigoPostal");

    /*Input buscador por dni*/
    let textoBuscador=document.getElementById("dniBuscar");
    
    // Obtener todos los campos del formulario
    const camposFormulario=[nombre, apellidos, telefono, correo, calle, numero, piso, letra, provincia, municipio, codigoPostal, textoBuscador];
    
    // Agregar evento blur a cada campo
    camposFormulario.forEach(campo => {
        campo.addEventListener('blur', validarFormularios);
    });

    camposFormulario.forEach(campo => {
        campo.addEventListener('focus', limpiarErrores);
    });
}

/*Evento pierde foco para el buscador por DNI */
function buscadorPierdeFoco(evt) {
    /*Campo de buscador por DNI para mostrar errores*/
    let errorBuscarDni=document.getElementById("errorBuscarDni");
    let ExRegDni = /^[0-9]{8}[A-Z]{1}$/;

    let campoBuscar=evt.target

    if(!ExRegDni.test(campoBuscar.value)){
        errorBuscarDni.innerHTML="8 números y 1 letra";
    } 
}

/*Evento para limpiar errores de validación al entrar al campo */
function limpiarErrorBuscador() {
    let campoError=document.getElementById("errorBuscarDni");
    campoError.innerHTML="";
}

/*Agregar eventos de expresiones regulares al buscador por DNI*/
document.addEventListener("DOMContentLoaded", function() {
    let textoBuscador = document.getElementById("dniBuscar");

    textoBuscador.addEventListener('blur', buscadorPierdeFoco);
    textoBuscador.addEventListener('focus', limpiarErrorBuscador);
});





