<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="./bootstrap/js/bootstrap.bundle.min.js" defer></script>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.7.2/font/bootstrap-icons.min.css" rel="stylesheet">
    <!-- <script src="./vista/index.js" defer></script> -->
    <script src="./vista/panelUsuario.js" defer></script>
    <!-- <script src="./vista/login.js" defer></script> -->
    <link rel="stylesheet" href="./bootstrap/css/bootstrap.min.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,500;1,500&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,500;1,500&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/perfilUsuario.css">
    <link rel="stylesheet" href="css/index.css">
    <title>Perfil de Usuario</title>
</head>
<body>
    <!--CABECERA-->
    <header class="row col-12">
        <!--Cabecera principal, título, login...-->
        <div class="d-flex align-items-center justify-content-between" id="cabecera-principal">
            <!-- Inicio -->
            <div class="col-4 ms-2">
                <a href="./index.php" style="text-decoration:none;"><h5>Inicio</h5></a>
            </div>
            <!--Título-->
            <div class="col-4 d-flex justify-content-end">
                <h1 id="titulo-principal"><b>techno</b> store</h1>
                <img id="logo-cabecera" src="img/logo-2.png" alt="">
            </div>
            <!-- Cuenta -->
            <div class="col-6 col-md-4 col-sm-2">
                <nav>
                    <ul class="nav justify-content-end">
                        <?php
                            session_start();
                            if (isset($_SESSION['dniUsuario'])) { // si existe sesion con dni, entonces estamos logueados
                                $dni = $_SESSION['dniUsuario'];
                                $usuario = $_SESSION['usuario'];
                                echo '<div class="dropdown"><a 
                                            href="#" 
                                            id="usuario-logueado" 
                                            class="btn btn-outline-dark dropdown-toggle"
                                            type="button"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                            >'.$usuario.'</a>
                                            <ul class="dropdown-menu" aria-labelledby="usuario-logueado">
                                                <li><a href="#" style="color:black" class="dropdown-item text-center">Ver perfil</a></li>
                                                <li><a href="#" style="color:black" class="dropdown-item text-center">Ver pedidos</a></li>
                                                <li><a href="./controlador/logout.php" style="color:black" class="dropdown-item text-center">Cerrar sesión</a></li>
                                            </ul></div>';
                            }
                            else { // si no hay login mostramos enlace de login
                                header("location: ./index.php");
                                //echo '<li><a href="#" onclick="obtenerCookieLogin()" class="nav-link" data-bs-toggle="modal" data-bs-target="#modal-login">Login</a></li>';
                            }
                        ?>
                    </ul>
                </nav>
            </div>
            
        </div>
        <!--Cabecera secundaria donde se muestran categorías de productos-->
        <!-- <div class="row align-items-center" id="cabecera-secundaria">
            <div class="col-12 text-center col-md-2" id="div-categorias-principal">
                <div class="accordion accordion-flush" id="menu">
                    <div class="accordion-item">
                        <div class="accordion-header" id="header-categorias">
                            <a 
                            type="button"
                            data-bs-toggle="collapse"
                                data-bs-target="#categorias"
                                aria-expanded="true"
                                aria-controles="categorias"
                                id="btn-categorias"
                            >
                                ☰
                            </a>
                            <span>Categorías</span>
                        </div>
    
                        <div
                        id="categorias"
                        class="accordion-collapse collapse"
                        data-bs-parent="#menu"
                        >
                            <div class="accordion-body">
                                <ul id="lista-categorias">
                                </ul>
                            </div>
                        </div>
    
                    </div>
                </div>
            </div>
        </div> -->
    </header>

    <!--CUERPO DEL PERFIL DE USUARIO-->
    <div class="container my-3">
        <div class="row d-flex justify-content-between align-items-start panel-usuario">

            <!--SECCIÓN MI CUENTA Y MIS PEDIDOS (FIJA)-->
            <section class="col-3 border border-muted rounded my-3">
                <article class="row mi-cuenta mx-3">
                    <div class="d-block my-3 text-center">
                        <h4>Mi cuenta</h4>
                    </div>
                    <div class="datos-cuenta">
                        <div class="d-block my-3">
                            <a href="#" class="text-decoration-none" id="enlaceCuenta">Mis datos</a>
                        </div>
                        <div class="d-block">
                            <a href="#" class="text-decoration-none" id="enlaceDirecciones">Mis direcciones</a>
                        </div>
    
                        <div class="d-block my-3">
                            <a href="#" class="text-decoration-none" id="enlaceDeseos">Lista de deseos</a>
                        </div>
                    </div>
                </article>
                <hr>
                <article class="row mis-pedidos mx-3 my-4">
                    <div class="d-block text-center mb-3">
                        <h4>Pedidos</h4>
                    </div>
                    <div class="datos-pedidos">
                        <div class="d-block my-3">
                            <a href="#" class="text-decoration-none" id="enlacePedidos">Pedidos</a>
                        </div>
                        
                        <div class="d-block my-3">
                            <a href="#" class="text-decoration-none" id="enlaceCancelados">Pedidos cancelados</a>
                        </div>
                    </div>
                </article>
            </section>

            <!--SECCIONES VISIBLES SEGÚN ENLACE-->

            <!--SECCION DATOS DE LA CUENTA-->
            <section class="col-7 mx-5 my-3 border border-muted rounded mis-datos" id="seccionCuenta">

                <!-- obtenemos el usuario con sesion activa, guardamos en variable localStorage -->
                <script>
                    let user = "<?php echo $_SESSION['usuario']; ?>";
                    // console.log(usuario);
                    localStorage.setItem("usuario", user);
                </script>

                <div class="mt-3 text-center">
                    <h4>Datos de la cuenta</h4>
                </div>
                <article class="row my-3">
                    <form action="" class="form-nick border border-muted rounded py-3 px-3 mx-3 col-6 text-center mx-auto" id="formCuentaNick">
                        <label for="nick" class="d-block mb-3">Nick:</label>
                        <input type="text" disabled name="nick" id="nick">
                    </form>
                </article>
                <article class="row my-3">
                    <form action="" class="form-fecha border border-muted rounded py-3 px-3 mx-3 col-6 text-center mx-auto" id="formFechaNacimiento">
                        <label for="dia" class="d-block mb-3">Fecha de nacimiento:</label>
                        <div class="row inputs-fecha d-flex justify-content-center">
                            <input type="text" name="dia" placeholder="dia" class="fecha col-2 mx-3">
                            <select name="mes" id="mes" class="fecha col-3 mx-3">
                                <option value="">Mes</option>
                                <option value="">Enero</option>
                                <option value="">Febrero</option>
                                <option value="">Marzo</option>
                                <option value="">Abril</option>
                                <option value="">Mayo</option>
                                <option value="">Junio</option>
                                <option value="">Julio</option>
                                <option value="">Agosto</option>
                                <option value="">Septiembre</option>
                                <option value="">Octubre</option>
                                <option value="">Noviembre</option>
                                <option value="">Diciembre</option>
                            </select>
                            <input type="text" name="año" placeholder="año" class="fecha col-2 mx-3">
                        </div>
                        <button type="button" class="btn-nacimiento opacidad mt-3" id="btnNacimiento">Guardar</button>
                    </form>
                </article>
                <article class="row my-3">
                    <form action="" class="form-contraseña border border-muted rounded py-3 px-3 mx-3 col-6 text-center mx-auto" id="formContraseña">
                        <label for="contraseña" class="d-block mb-3">Contraseña:</label>
                        <div class="row inputs-fecha d-flex justify-content-center">
                            <input type="text" name="contraseña" placeholder="contraseña actual" class="contraseña col-8 mb-3">
                            <input type="text" name="contraseña-nueva" placeholder="nueva contraseña" class="contraseña col-8 mb-3">
                            <input type="text" name="repetir-contraseña" placeholder="repetir contraseña" class="contraseña col-8 mb-3">
                        </div>
                        <button type="button" class="btn-contraseña opacidad" id="btnContraseña">Guardar</button>
                    </form>
                </article>
                <article class="row my-3">
                    <form action="" class="form-telefono border border-muted rounded py-3 px-3 mx-3 col-6 text-center mx-auto">
                        <label for="telefono" class="d-block mb-3">Teléfono:</label>
                        <div class="row inputs-fecha d-flex justify-content-center">
                            <input type="text" name="contraseña" placeholder="teléfono" class="telefono col-8 mb-3">
                        </div>
                        <button type="button" class="btn-telefono opacidad">Guardar</button>
                    </form>
                </article>
            </section>

            <!--SECCIÓN LISTA DE DESEOS-->
            <section class="col-7 mx-5 my-3 border border-muted rounded mis-deseos d-none" id="seccionDeseos">
                <div class="mt-3 text-center">
                    <h4>lista de deseos</h4>
                </div>
                <article class="row my-4 d-flex justify-content-around">
                    <div class="card col-5">
                        <!--EJEMPLO DE DESCRIPCIÓN DE PRODUCTO-->
                        <div class="card-body">
                            <div class="btn-cerrar d-flex justify-content-end">
                                <button class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                            </div>
                            <div class="card-tittle d-flex justify-content-center text-align-center my-3">
                                <h5 class="d-block">Nombre producto</h5>
                            </div>
                            <div class="cont-imagen-producto border border-muted bg-white m-4">
                                <img src="./img/1137-samsung-tq65qn90catxxc-65-neo-qled-ultrahd-4k.png" alt="" class="img img-fluid">
                            </div>
                            <div class="card-footer text-center my-3">
                                <b><p>Aquí modelo producto</p></b>
                                <p>Aquí precio</p>
                            </div>
                            <div class="text-center">
                                <button type="button" class="btn-añadir-deseo opacidad">Añadir al carrito</button>
                            </div>
                        </div>
                    </div>
                        
                    <div class="card col-5">
                        <!--EJEMPLO DE DESCRIPCIÓN DE PRODUCTO-->
                        <div class="card-body">
                            <div class="btn-cerrar d-flex justify-content-end">
                                <button class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                            </div>
                            <div class="card-tittle d-flex justify-content-center text-align-center my-3">
                                <h5 class="d-block">Nombre producto</h5>
                            </div>
                            <div class="cont-imagen-producto border border-muted bg-white m-4">
                                <img src="./img/1137-samsung-tq65qn90catxxc-65-neo-qled-ultrahd-4k.png" alt="" class="img img-fluid">
                            </div>
                            <div class="card-footer text-center my-3">
                                <b><p>Aquí modelo producto</p></b>
                                <p>Aquí precio</p>
                            </div>
                            <div class="text-center">
                                <button type="button" class="btn-añadir-deseo opacidad">Añadir al carrito</button>
                            </div>
                        </div>
                    </div>
                </article>
            </section>

            <!--SECCIÓN MIS DIRECCIONES-->
            <section class="col-7 mx-5 my-3 border border-muted rounded mis-direcciones d-none" id="seccionDirecciones">
                <div class="mt-3 text-center">
                    <h4>Mis direcciones</h4>
                </div>
                <article class="row my-3">
                    <div class="direccion border border-muted rounded py-3 px-3 mx-auto col-10">
                        <section class="d-flex justify-content-end">
                        <button class="btn">
                            <i class="bi bi-trash"></i> <!--Ícono de papelera-->
                        </button>
                        </section>
                        <!--Aquí cargamos direcciones con botón checkbox (PONGO EJEMPLO DE PLANTILLA)-->
                        <section class="row">
                            <div class="col-12">
                                <p><b>Calle:</b> Datos</p> 
                            </div>
                        </section>
                        <section class="row">
                            <div class="col-3">
                                <p><b>Num:</b> 4</p> 
                            </div>
                            <div class="col-3">
                                <p><b>Piso:</b> 3</p> 
                            </div>
                            <div class="col-3">
                                <p><b>Letra:</b> A</p> 
                            </div>
                        </section>
                        <section class="row">
                            <div class="col-3">
                                <p><b>CP:</b> 22222</p> 
                            </div>
                            <div class="col-4">
                                <p><b>Municipio:</b> Teruel</p> 
                            </div>
                            <div class="col-4">
                                <p><b>Provincia:</b> Zaragoza</p> 
                            </div>
                        </section>
                        <section class="row">
                            <div class="col-11">
                                <p><b>Otros:</b> Datos</p> 
                            </div>
                        </section>
                    </div>

                    <div class="text-center">
                        <button type="button" class="btn-añadir-direccion opacidad my-3">Añadir otra dirección</button>
                    </div>               
                </article>
            </section>

            <!--SECCIÓN MIS PEDIDOS-->
            <section class="col-7 mx-5 my-3 border border-muted rounded d-none" id="seccionPedidos">
                <div class="mt-3 text-center">
                    <h4>Mis pedidos</h4>
                </div>
                
                <article class="row my-3">
                    <form action="" class="form-fecha border border-muted rounded py-3 px-3 mx-3 col-6 text-center mx-auto">
                        <label for="dia" class="d-block mb-3">Filtrar pedidos por fecha:</label>
                        <div class="row inputs-fecha d-flex justify-content-center">
                            <input type="text" name="dia" placeholder="dia" class="fecha col-2 mx-3">
                            <select name="mes" id="mes" class="fecha col-3 mx-3">
                                <option value="">Mes</option>
                                <option value="">Enero</option>
                                <option value="">Febrero</option>
                                <option value="">Marzo</option>
                                <option value="">Abril</option>
                                <option value="">Mayo</option>
                                <option value="">Junio</option>
                                <option value="">Julio</option>
                                <option value="">Agosto</option>
                                <option value="">Septiembre</option>
                                <option value="">Octubre</option>
                                <option value="">Noviembre</option>
                                <option value="">Diciembre</option>
                            </select>
                            <input type="text" name="año" placeholder="año" class="fecha col-2 mx-3">
                        </div>
                        <button type="button" class="btn-nacimiento opacidad mt-3">Buscar</button>
                    </form>
                </article>

                <div class="row fila-pedidos py-3 px-3 mx-2 text-center mx-auto d-flex justify-content-around">
                    <!--Aquí cargamos pedidos con bucle (PONGO EJEMPLO DE PLANTILLA)-->
                    <article class="col-5 my-3">
                        <div class="pedido border border-muted rounded py-3 px-3 mx-3 text-center mx-auto">
                            <div class="datos-pedido border border-muted rounded py-3 px-3 mx-3 mb-3 text-center bg-white mx-auto">
                                <p>Aquí datos del pedido</p>
                            </div>
                            <div class="productos-pedido border border-muted rounded py-3 px-3 mx-3 text-center bg-white mx-auto">
                                <p>Aquí productos del pedido</p>
                            </div>
                            <div class="text-center">
                                <button type="button" class="btn-comprar-de-nuevo opacidad my-3">Comprar de nuevo</button>
                            </div>
                        </div>             
                    </article>
                    <article class="col-5 my-3">
                        <div class="pedido border border-muted rounded py-3 px-3 mx-3 text-center mx-auto">
                            <div class="datos-pedido border border-muted rounded py-3 px-3 mx-3 mb-3 text-center bg-white mx-auto">
                                <p>Aquí datos del pedido</p>
                            </div>
                            <div class="productos-pedido border border-muted rounded py-3 px-3 mx-3 text-center bg-white mx-auto">
                                <p>Aquí productos del pedido</p>
                            </div>
                            <div class="text-center">
                                <button type="button" class="btn-comprar-de-nuevo opacidad my-3">Comprar de nuevo</button>
                            </div>
                        </div>             
                    </article>
                </div>
            </section>

            <!--SECCIÓN PEDIDOS CANCELADOS-->
            <section class="col-7 mx-5 my-3 border border-muted rounded d-none" id="seccionCancelados">
                <div class="mt-3 text-center">
                    <h4>Mis pedidos cancelados</h4>
                </div>
                
                <div class="row fila-pedidos py-3 px-3 mx-2 text-center mx-auto d-flex justify-content-around">
                    <!--Aquí cargamos pedidos con bucle (PONGO EJEMPLO DE PLANTILLA)-->
                    <article class="col-5 my-3">
                        <div class="pedido border border-muted rounded py-3 px-3 mx-3 text-center mx-auto">
                            <div class="datos-pedido border border-muted rounded py-3 px-3 mx-3 mb-3 text-center bg-white mx-auto">
                                <p>Aquí datos del pedido</p>
                            </div>
                            <div class="productos-pedido border border-muted rounded py-3 px-3 mx-3 text-center bg-white mx-auto">
                                <p>Aquí productos del pedido</p>
                            </div>
                            <div class="text-center">
                                <button type="button" class="btn-comprar-de-nuevo opacidad my-3">Comprar de nuevo</button>
                            </div>
                        </div>             
                    </article>
                    <article class="col-5 my-3">
                        <div class="pedido border border-muted rounded py-3 px-3 mx-3 text-center mx-auto">
                            <div class="datos-pedido border border-muted rounded py-3 px-3 mx-3 mb-3 text-center bg-white mx-auto">
                                <p>Aquí datos del pedido</p>
                            </div>
                            <div class="productos-pedido border border-muted rounded py-3 px-3 mx-3 text-center bg-white mx-auto">
                                <p>Aquí productos del pedido</p>
                            </div>
                            <div class="text-center">
                                <button type="button" class="btn-comprar-de-nuevo opacidad my-3">Comprar de nuevo</button>
                            </div>
                        </div>             
                    </article>
                </div>
            </section>
        </div>
    </div>

    
</body>
</html>