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

    let infoFormProducto=document.getElementById("infoFormProducto");
    infoFormProducto.innerHTML="";
}

/*Mostrar productos */
function verProductos(){
    let cuerpoProductos=document.getElementById("cuerpoProductos");
    let infoProductos=document.getElementById("infoProductos");

    //Hacemos petición a controlador para recibir productos*/
    //Configuramos petición
    let configFetch= {
        method: "POST",
        body: "pedirInfoProductos=''",
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
            (productos)=>{
                //Tratar error
                if (productos.error) {
                    infoProductos.innerHTML=productos.error;
                }

                //Tratar datos de respuesta
                cuerpoProductos.innerHTML="";

                let numfila=0;

                //Mostramos datos de productos
                productos.forEach((producto) => {
                    if(producto.categoria==null){
                        producto.categoria="Sin registro"
                    }
                    if(producto.id_marca==null){
                        producto.nombre_marca="Sin registro";
                    }
                    if(producto.id_categoria==null){
                        producto.nombre_categoria="Sin registro";
                    }
                    if(producto.num_ventas==null){
                        producto.num_ventas="Sin registro";
                    }
                    
                    //Filas pares
                    if(numfila%2==0){
                        cuerpoProductos.innerHTML+=`
                        <tr class="fila-tabla-par">
                            <td>`+ producto.id_articulo +`</td>
                            <td>`+ producto.modelo +`</td>
                            <td>`+ producto.nombre_categoria +`</td>
                            <td>`+ producto.nombre_marca +`</td>
                            <td>`+ producto.precio +`</td>
                            <td>`+ producto.stock +`</td>
                            <td>`+ producto.num_ventas +`</td>
                            <td>
                                <button type="button" class="btn-icon" id="`+ producto.id_articulo +`" onclick="eliminarProducto('`+ producto.id_articulo +`')">
                                    <i class="bi bi-trash" ></i>
                                </button>
                            </td>
                            <td>
                                <button type="button" class="btn-icon" id="`+ producto.id_articulo +`" onclick="mostrarFormProducto('`+ producto.id_articulo +`')">
                                    <i class="fas fa-pencil-alt" ></i> 
                                </button>
                            </td>
                        </tr>
                    `;
                    //Filas impares
                    }else{
                        cuerpoProductos.innerHTML+=`
                        <tr class="fila-tabla-impar">
                            <td>`+ producto.id_articulo +`</td>
                            <td>`+ producto.modelo +`</td>
                            <td>`+ producto.nombre_categoria +`</td>
                            <td>`+ producto.nombre_marca +`</td>
                            <td>`+ producto.precio +`</td>
                            <td>`+ producto.stock +`</td>
                            <td>`+ producto.num_ventas +`</td>
                            <td>
                                <button type="button" class="btn-icon" id="`+ producto.id_articulo +`" onclick="eliminarProducto('`+ producto.id_articulo +`')">
                                    <i class="bi bi-trash" ></i>
                                </button>
                            </td>
                            <td>
                                <button type="button" class="btn-icon" id="`+ producto.id_articulo +`" onclick="mostrarFormProducto('`+ producto.id_articulo +`')">
                                    <i class="fas fa-pencil-alt" ></i> 
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


/*Eliminar producto*/
function eliminarProducto(id_producto){
    //Borramos campos informativos
    limpiarCamposInformativos();

    //Párrafo para mostrar información
    let parrafoInfo = document.getElementById("infoProductos");

    let configFetch={
        method : "POST",
        body : "eliminarProducto="+id_producto,
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
                    console.log(resultado);
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

    verProductos();
}

/*Mostrar en formulario el artículo para ser modificado*/
function mostrarFormProducto(id_producto){
    //Borramos campos informativos
    limpiarCamposInformativos();

    //Hacemos visible el formulario de actualizar producto
    var formModificarProducto=document.getElementById("formModificarProducto");
    formModificarProducto.style.display="block";

    formModificarProducto.innerHTML="";

    //Hacemos invisible el formulario de añadir producto
    var formAñadirProducto=document.getElementById("formAñadirProducto");
    formAñadirProducto.style.display="none";

    //Obtener elemento para mostrar información
    let infoFormProducto=document.getElementById("infoFormProducto");

    let configFetch={
        method : "POST",
        body : "mostrarFormModificarProducto="+id_producto,
        headers : {'Content-Type':'application/x-www-form-urlencoded'}
    }

    let promesa=fetch("./controlador/admin.php", configFetch);

    promesa.then(
        (respuesta)=>{
            if(!respuesta.ok){
                console.log("Respuesta no recibida");
                throw new Error('Error en la solicitud' + respuesta.status);
            }
            
            respuesta.json().then(
                (datosProducto)=>{
                    console.log(datosProducto);
                    //Obtener marcas
                    var marcas=datosProducto.marcas;

                    //Obtener categorías
                    var categorias=datosProducto.categorias;

                    //Obtener producto
                    var producto=datosProducto.articulo;

                    //Tratar error
                    if (producto.error) {
                        infoFormProducto.innerHTML=producto.error;
                    }

                    //Tratar datos de respuesta
                    //Poner como vacío los campos que pueden ser null
                    if(producto.num_ventas===null){
                        producto.num_ventas="";
                    }
                    if(producto.id_categoria===null){
                        producto.id_categoria="";
                    }
                    if(producto.id_marca===null){
                        producto.id_marca="";
                    }

                    formModificarProducto.innerHTML+=`
                    <h5 class="mt-4 text-center">Datos de producto</h5>
                    <form id="form-producto" class="row">
                        <div class="btn-cerrar d-flex justify-content-end">
                            <button class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                        </div>
                        <div class="row my-4 d-flex justify-content-center">
                            <div class="col-8">
                                <label class="row d-block" for="modeloModificar">Modelo 
                                    <div class="d-block p-0 col-12">
                                        <input class="d-block col-12" type="text" name="modeloModificar" id="modeloModificar" value="`+producto.modelo+`" >
                                        <div class="invalid-feedback d-block col-12" id="errorRegistroModeloModificar"></div>  
                                    </div>
                                </label>  
                            </div>
                        </div>

                        <div class="row my-4 d-flex justify-content-center">
                            <div class="col-3 d-flex justify-content-start">
                                <label class="row d-block col-8" for="idModificar">Id
                                    <input class="d-block px-0" type="number" name="idModificar" id="idModificar" value="`+producto.id_articulo+`" readonly>
                                    <div class="invalid-feedback d-block" id="errorRegistroId"></div>
                                </label>
                            </div>
                            <div class="col-3 d-flex justify-content-center">
                                <label class="row d-block col-8" for="categoriasModificar">Categoria 
                                    <select class="d-block" name="categoriasModificar" id="categoriasModificar">
                                        <option value="">Seleccione categoria</option>
                                    </select>
                                    <div class="invalid-feedback d-block" id="errorRegistroCategoriaModificar"></div>
                                </label>
                            </div>
                            <div class="col-3 d-flex justify-content-end">
                                <label class="row d-block col-8" for="marcasModificar">Marca 
                                    <select class="d-block" name="marcasModificar" id="marcasModificar">
                                        <option value="">Seleccione marca</option>
                                    </select>
                                    <div class="invalid-feedback d-block" id="errorRegistroMarcaModificar"></div>
                                </label>
                            </div>
                        </div>
                        
                        <div class="row my-4 d-flex justify-content-center">
                            <div class="col-3 d-flex justify-content-start">
                                <label class="row" for="precioModificar">Precio
                                    <div class="p-0 col-12">
                                        <input class="d-block px-0" type="number" step="any" name="precioModificar" id="precioModificar" value=`+producto.precio+` >
                                        <div class="invalid-feedback d-block col-12" id="errorRegistroPrecioModificar"></div>
                                    </div>
                                </label>
                            </div>
                            <div class="col-3 d-flex justify-content-center">
                                <label class="row" for="stockModificar">Stock 
                                    <div class="p-0 col-12">
                                        <input class="d-block px-0" type="number" name="stockModificar" id="stockModificar" value="`+producto.stock+`" >
                                        <div class="invalid-feedback d-block col-12" id="errorRegistroStockModificar"></div>
                                    </div>
                                </label>
                            </div>
                            <div class="col-3 d-flex justify-content-end">
                                <label class="row" for="ventasModificar">Ventas 
                                    <div class="p-0 col-12">
                                        <input class="d-block px-0" type="number" name="ventasModificar" id="ventasModificar" value="`+producto.num_ventas+`" readonly>
                                        <div class="invalid-feedback d-block col-12" id="errorRegistroVentasModificar"></div>
                                    </div>
                                </label>
                            </div>
                        </div>
                        <div class="row my-4 mt-4 justify-content-center">
                            <button class="btn btn-actualizar-producto col-3 bg-success text-white" name="btn-actualizar-producto" id="actualizar-producto" type="button" onclick="actualizarProducto()">Actualizar producto</button>
                        </div>
                    </form>
                    `;

                     /*Añadir opciones al select categorías*/
                     let selectCategoriasModificar=document.getElementById("categoriasModificar");
                     categorias.forEach(categoria => {
                         let option=document.createElement("option");
                         option.value=categoria.id_categoria;
                         option.id="cat"+categoria.id_categoria;
                         option.textContent=categoria.nombre_categoria;
                         if(categoria.id_categoria==producto.id_categoria){
                            option.selected=true;
                         }
                         selectCategoriasModificar.appendChild(option);
                     });
 
                     /*Añadir opciones al select marcas*/
                     let selectMarcasModificar=document.getElementById("marcasModificar");
                     marcas.forEach(marca => {
                         let option=document.createElement("option");
                         option.value=marca.id_marca;
                         option.id="marca"+marca.id_marca;
                         option.textContent=marca.nombre_marca;
                         if(marca.id_marca==producto.id_marca){
                            option.selected=true;
                         }
                         selectMarcasModificar.appendChild(option);
                     });

                    //Agregar eventos para validación
                    agregarEventosModificarProducto();
                });
    }).catch(
        (error)=>{
            console.log("Error: " + error.message);
    });
}

/*Mostrar producto por id*/
function mostrarProductoPorId() {
    //Borramos campos informativos
    limpiarCamposInformativos();

    //Elemento para mostrar información
    let infoProductos=document.getElementById("infoProductos");

    let cuerpoProducto=document.getElementById("cuerpoProductos");

    //texto del input buscar producto
    let idBuscar=document.getElementById("producto").value;

    //Hacemos petición a controlador para recibir usuarios
    //Configuramos petición
    let configFetch= {
        method: "POST",
        body: "productoPorId="+idBuscar,
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
            (producto)=>{
                //Tratar error
                if (producto.error) {
                    infoProductos.innerHTML=producto.error;
                }

                //Tratar datos de respuesta
                cuerpoProducto.innerHTML="";

                //Mostramos datos de usuarios
                if(producto.categoria=null){
                    producto.categoria="Sin registro"
                }
                if(producto.id_marca==null){
                    producto.nombre_marca="Sin registro";
                }
                if(producto.id_categoria==null){
                    producto.nombre_categoria="Sin registro";
                }
                if(producto.num_ventas==null){
                    producto.num_ventas="Sin registro";
                }
                
                cuerpoProductos.innerHTML+=`
                    <tr class="fila-tabla-impar">
                        <td>`+ producto.id_articulo +`</td>
                        <td>`+ producto.modelo +`</td>
                        <td>`+ producto.nombre_categoria +`</td>
                        <td>`+ producto.nombre_marca +`</td>
                        <td>`+ producto.precio +`</td>
                        <td>`+ producto.stock +`</td>
                        <td>`+ producto.num_ventas +`</td>
                        <td>
                            <button type="button" class="btn-icon" id="`+ producto.id_articulo +`" onclick="eliminarProducto('`+ producto.id_articulo +`')">
                                <i class="bi bi-trash" ></i>
                            </button>
                        </td>
                        <td>
                            <button type="button" class="btn-icon" id="`+ producto.id_articulo +`" onclick="mostrarFormProducto('`+ producto.id_articulo +`')">
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

/*Actualizar producto */
function actualizarProducto(){
    //Borramos campos informativos
    limpiarCamposInformativos();

    //div formulario y párrafo para mensaje de éxito
    let formModificarProducto=document.getElementById("formModificarProducto");
    let infoFormProducto=document.getElementById("infoFormProducto");

    //Valores del producto
    let id_articulo=document.getElementById("idModificar").value; 
    let modelo=document.getElementById("modeloModificar").value;
    let precio=document.getElementById("precioModificar").value;
    let stock=document.getElementById("stockModificar").value;
    let num_ventas=document.getElementById("ventasModificar").value;
    let id_categoria=document.getElementById("categoriasModificar").value;
    let id_marca=document.getElementById("marcasModificar").value;
  
    //Configurar petición
    let configFetch= {
        method: "POST",
        body: "actualizarProducto=''&id_articulo="+id_articulo+"&modelo="+modelo+"&id_categoria="+id_categoria+"&id_marca="+id_marca+"&precio="+precio+"&stock="+stock+"&num_ventas="+num_ventas,
        headers: {'Content-Type':'application/x-www-form-urlencoded'}
    }

    //Lanzar petición
    let promesa=fetch("./controlador/admin.php", configFetch);

    //Configurar respuesta
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
                    infoFormProducto.innerHTML=mensajeActualizar.error;
                }
                //Tratar datos de respuesta
                if(mensajeActualizar.mensaje){
                    infoFormProducto.innerHTML=mensajeActualizar.mensaje;
                }
                formModificarProducto.style.display="none";
            });
    }).catch(error=>{
        console.log("Error: " + error.message);
    });

    verProductos();
}

/*Añadir producto*/
function formAñadirProducto(){
    //Borramos campos informativos
    limpiarCamposInformativos();

    //Hacemos invisible el formulario de actualizar
    let formModificarProducto=document.getElementById("formModificarProducto");
    formModificarProducto.style.display="none";
    //formModificarProducto.style.display="none";

    //Hacemos visible el formulario de añadir
    let formAñadirProducto=document.getElementById("formAñadirProducto");
    formAñadirProducto.style.display="block";

    //Elemento para mostrar información
    let infoFormProducto=document.getElementById("InfoFormProducto");

    let configFetch={
        method: "POST",
        body: "mostrarFormAñadirProducto=",
        headers: {'Content-Type':'application/x-www-form-urlencoded'}
    }

    let promesa=fetch("./controlador/admin.php", configFetch);

    promesa.then(
        (respuesta)=>{
            if(!respuesta.ok){
                console.log("Respuesta no recibida");
                throw new Error('Error en la solicitud' + respuesta.status);
            }

            respuesta.json().then(
                (datos)=>{

                    //Obtener marcas
                    let marcas=datos.marcas;

                    //Obtener categorías
                    let categorias=datos.categorias;

                    //Tratar error
                    if (marcas.error) {
                        infoFormProducto.innerHTML=producto.error;
                    }
                    if (categorias.error) {
                        infoFormProducto.innerHTML+=producto.error;
                    }

                    //Tratar datos de respuesta

                    //Añadir formularios para modificar usuario y dirección
                    formAñadirProducto.innerHTML="";

                    formAñadirProducto.innerHTML+=`
                    <h5 class="mt-4 text-center">Añadir producto</h5>
                    <form id="form-añadir" class="row">
                        <div class="btn-cerrar d-flex justify-content-end col-12">
                            <button class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                        </div>
                        <div class="row my-4 d-flex justify-content-center">
                            <div class="col-8">
                                <label class="row d-block" for="modeloAñadir">Modelo
                                    <div class="d-block p-0 col-12">
                                        <input class="d-block col-12" type="text" name="modeloAñadir" id="modeloAñadir" value="" >
                                        <div class="invalid-feedback d-block col-12" id="errorRegistroModeloAñadir"></div>
                                    </div>
                                </label>  
                            </div>
                        </div>
                        <div class="row my-4 d-flex justify-content-center">
                            <div class="col-4 d-flex justify-content-start">
                                <label class="row d-block col-12" for="categoriasAñadir">Categorias
                                    <select name="categoriasAñadir" id="categoriasAñadir" class="d-block px-0">
                                        <option value="">Seleccione categoria</option>
                                    </select>
                                    <div class="invalid-feedback d-block" id="errorRegistroCategoriaAñadir"></div>
                                </label>
                            </div>
                            <div class="col-4 d-flex justify-content-end">
                                <label class="row d-block col-12" for="marcasAñadir">Marcas
                                    <select name="marcasAñadir" id="marcasAñadir" class="d-block px-0">
                                        <option value="">Seleccione marca</option>
                                    </select>
                                    <div class="invalid-feedback d-block" id="errorRegistroMarcaAñadir"></div>
                                </label>
                            </div>
                        </div>
                        <div class="row my-4 d-flex justify-content-center">
                            <div class="col-3 mx-4 d-flex justify-content-start">
                                <label class="row" for="precioAñadir">Precio
                                    <div class="p-0 col-12">
                                        <input class="d-block col-12 px-0" type="number" step="any" name="precioAñadir" id="precioAñadir" >
                                        <div class="invalid-feedback d-block col-12" id="errorRegistroPrecioAñadir"></div>
                                    </div>
                                </label>
                            </div>
                            <div class="col-3 mx-4 d-flex justify-content-end">
                                <label class="row" for="stockAñadir">Stock 
                                    <div class="p-0 col-12">
                                        <input class="d-block col-12 px-0" type="number" name="stockAñadir" id="stockAñadir" >
                                        <div class="invalid-feedback d-block col-12" id="errorRegistroStockAñadir"></div>
                                    </div>
                                </label>
                            </div>
                        </div>
                        <div class="row my-4 d-flex justify-content-center">
                            <div class="col-8">
                                <label class="row d-block" for="imagenAñadir">Ruta de la imagen
                                    <div class="d-flex justify-content-center p-0 col-12">
                                        <input class="d-block col-12" type="text" name="imagenAñadir" id="imagenAñadir" value="">
                                        <div class="invalid-feedback d-block" id="errorRegistroImagenAñadir"></div>
                                    </div>
                                </label>  
                            </div>
                        </div>
                        <div class="row my-4 mt-4 justify-content-center">
                            <button class="btn btn-añadir-producto col-3 bg-success text-white" name="btn-añadir-producto" id="añadir-producto" type="button" onclick="añadirProducto()">Añadir producto</button>
                        </div>
                    </form>
                    `;

                    /*Añadir opciones al select categorías*/
                    let selectCategoriasAñadir=document.getElementById("categoriasAñadir");
                    categorias.forEach(categoria => {
                        let option=document.createElement("option");
                        option.value=categoria.id_categoria;
                        option.id="cat"+categoria.id_categoria;
                        option.textContent=categoria.nombre_categoria;
                        selectCategoriasAñadir.appendChild(option);
                    });

                    /*Añadir opciones al select marcas*/
                    let selectMarcasAñadir=document.getElementById("marcasAñadir");
                    marcas.forEach(marca => {
                        let option=document.createElement("option");
                        option.value=marca.id_marca;
                        option.id="marca"+marca.id_marca;
                        option.textContent=marca.nombre_marca;
                        selectMarcasAñadir.appendChild(option);
                    });

                    //Agregar eventos para validación
                    agregarEventosAñadirProducto();
                });
    }).catch(
        (error)=>{
            console.log("Error: " + error.message);
    });
}

function añadirProducto(){
    //Borramos campos informativos
    limpiarCamposInformativos();

    //div formulario y párrafo para mensaje de éxito
    let formAñadirProducto=document.getElementById("formAñadirProducto");
    let infoAñadirProducto=document.getElementById("infoFormProducto");

    //Valores del producto
    let modelo=document.getElementById("modeloAñadir").value;
    let precio=document.getElementById("precioAñadir").value;
    let stock=document.getElementById("stockAñadir").value;
    let id_categoria=document.getElementById("categoriasAñadir").value;
    let id_marca=document.getElementById("marcasAñadir").value;
    let imagen=document.getElementById("imagenAñadir").value;
   
    //Configurar petición
    let configFetch= {
        method: "POST",
        body: "añadirProducto=''&modelo="+modelo+"&id_categoria="+id_categoria+"&id_marca="+id_marca+"&precio="+precio+"&stock="+stock+"&imagen="+imagen,
        headers: {'Content-Type':'application/x-www-form-urlencoded'}
    }

    //Lanzar petición
    let promesa=fetch("./controlador/admin.php", configFetch);

    //Configurar respuesta
    promesa.then(
        (respuesta)=>{
        if(!respuesta.ok){
            console.log("Respuesta no recibida");
            throw new Error('Error en la solicitud' + respuesta.status);
        }

        respuesta.json().then(
            (mensajeAñadir)=>{
                //Tratar error
                if (mensajeAñadir.error) {
                    infoAñadirProducto.innerHTML=mensajeAñadir.error;
                }
                //Tratar datos de respuesta
                if(mensajeAñadir.mensaje){
                    infoAñadirProducto.innerHTML=mensajeAñadir.mensaje;
                }
                formAñadirProducto.style.display="none";

                verProductos();
            });
    }).catch(error=>{
        console.log("Error: " + error.message);
    });
}

/*Validar formulario para modificar producto*/
function validarFormularioModificarProducto(evt) {
    
    /*Campos de producto para mostrar errores*/
    let errorRegistroModeloModificar=document.getElementById("errorRegistroModeloModificar");
    let errorRegistroPrecioModificar=document.getElementById("errorRegistroPrecioModificar");
    let errorRegistroStockModificar=document.getElementById("errorRegistroStockModificar");
    let errorRegistroImagenModificar=document.getElementById("errorRegistroImagenModificar");

    /*Expresiones regulares*/
    let exRegModelo=/^.{1,}$/; //Mínimo un caracter
    let exRegPrecio=/^\d+(?:\.\d{1,2})?$/; //Mínimo un dígito y opcional hasta 2 decimales
    let exRegStock=/^[0-9]+$/; // Mínimo un nº sin  decimales.
    let exRegImagen=/^[a-zA-Z0-9_/\-]*$/; //Solo caracteres necesarios para url
    
    var campo=evt.target;

    switch (campo) {
        case modeloModificar:
            if(!exRegModelo.test(campo.value)){
                errorRegistroModeloModificar.innerHTML="Campo obligatorio";
            }
            break;
        case precioModificar:
            if(!exRegPrecio.test(campo.value)){
                errorRegistroPrecioModificar.innerHTML="1 Dígito obligatorio. Opcional 1-2 decimales";
            }
            break;
        case stockModificar:
            if(!exRegStock.test(campo.value)){
                errorRegistroStockModificar.innerHTML="Obligatorio. Solo números sin decimales";
            }
            break;
        case imagenModificar:
            if(!exRegImagen.test(campo.value)){
                errorRegistroImagenModificar.innerHTML="Solo letras, números, _, \, /, -";
            }
            break;
    }
}

/*Validar formulario para añadir producto*/
function validarFormularioAñadirProducto(evt) {

    let errorRegistroModeloAñadir=document.getElementById("errorRegistroModeloAñadir");
    let errorRegistroPrecioAñadir=document.getElementById("errorRegistroPrecioAñadir");
    let errorRegistroStockAñadir=document.getElementById("errorRegistroStockAñadir");
    let errorRegistroImagenAñadir=document.getElementById("errorRegistroImagenAñadir");

    /*Expresiones regulares*/
    let exRegModelo=/^.{1,}$/; //Mínimo un caracter
    let exRegPrecio=/^\d+(?:\.\d{1,2})?$/; //Mínimo un dígito y opcional hasta 2 decimales
    let exRegStock=/^[0-9]+$/; // Mínimo un nº sin  decimales.
    let exRegImagen=/^[a-zA-Z0-9_/\-]*$/; //Solo caracteres necesarios para url
    
    var campo=evt.target;

    switch (campo) {
        case modeloAñadir:
            if(!exRegModelo.test(campo.value)){
                errorRegistroModeloAñadir.innerHTML="Campo obligatorio";
            }
            break;
        case precioAñadir:
            if(!exRegPrecio.test(campo.value)){
                errorRegistroPrecioAñadir.innerHTML="1 Dígito obligatorio. Opcional 1-2 decimales";
            }
            break;
        case stockAñadir:
            if(!exRegStock.test(campo.value)){
                errorRegistroStockAñadir.innerHTML="Obligatorio. Solo números sin decimales";
            }
            break;
        case imagenAñadir:
            if(!exRegImagen.test(campo.value)){
                errorRegistroImagenAñadir.innerHTML="Solo letras, números, _, \, /, -";
            }
            break;
    }
}

/*Limpiar errores de validación al entrar al campo */
function limpiarErroresProducto(evt) {
    let campoErrorProducto=evt.target.nextElementSibling;
    campoErrorProducto.innerHTML="";
}

/*Agregar evento al formulario modificar producto una vez se haya cargado */
function agregarEventosModificarProducto(){

    /*Inputs de formularios de producto*/ 
    let modeloModificar=document.getElementById("modeloModificar");
    let precioModificar=document.getElementById("precioModificar");
    let stockModificar=document.getElementById("stockModificar"); 
    let imagenModificar=document.getElementById("imagenModificar"); 

    // Obtener todos los campos del formulario
    let camposFormularioModificarProducto=[modeloModificar, precioModificar, stockModificar, imagenModificar];

    camposFormularioModificarProducto.forEach(campoProducto => {
        if (campoProducto !== null) {
            campoProducto.addEventListener('blur', validarFormularioModificarProducto);
            campoProducto.addEventListener('focus', limpiarErroresProducto);
        }
    }); 
}

/*Agregar evento al formulario añadir producto una vez se haya cargado */
function agregarEventosAñadirProducto(){

    /*Inputs de formularios de producto*/ 
    let modeloAñadir=document.getElementById("modeloAñadir");
    let precioAñadir=document.getElementById("precioAñadir");
    let stockAñadir=document.getElementById("stockAñadir"); 
    let imagenAñadir=document.getElementById("imagenAñadir"); 
    
    // Obtener todos los campos del formulario
    let camposFormularioAñadirProducto=[modeloAñadir, precioAñadir, stockAñadir, imagenAñadir];
  
    // Agregar evento blur a cada campo
    camposFormularioAñadirProducto.forEach(campoProducto => {
        if (campoProducto !== null) {
            campoProducto.addEventListener('blur', validarFormularioAñadirProducto);
            campoProducto.addEventListener('focus', limpiarErroresProducto);
        }
    }); 
}

/*Evento pierde foco para el buscador de producto por id*/
function buscadorProductoPierdeFoco() {
    /*Campo de buscador por DNI para mostrar errores*/
    let errorBuscarProducto=document.getElementById("errorBuscarProducto");
    let exRegBuscar=/^[0-9]*$/; // Solo números.

    if(!exRegBuscar.test(this.value)){
        errorBuscarProducto.innerHTML="Solo números sin decimales";
    }
}

/*Evento para limpiar errores de validación al entrar al campo*/
function limpiarErrorBuscadorProducto() {
    let campoError=document.getElementById("errorBuscarProducto");
    campoError.innerHTML="";
}

/*Agregar eventos de expresiones regulares al buscador de productos por id*/
document.addEventListener("DOMContentLoaded", function() {
    let textoBuscadorProducto = document.getElementById("producto");

    textoBuscadorProducto.addEventListener('blur', buscadorProductoPierdeFoco);
    textoBuscadorProducto.addEventListener('focus', limpiarErrorBuscadorProducto);
});
