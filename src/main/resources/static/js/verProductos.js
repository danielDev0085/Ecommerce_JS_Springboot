var btnCategorias = document.getElementById("btn-categorias"); // boton para desplegar categorias
var listaCategorias = document.getElementById("lista-categorias"); // elemento ul para lista de categorias
var mostrarProductos = document.getElementById("mostrarProductos"); // seccion de mostrar productos
var seccionOfertas = document.getElementById("seccion-ofertas"); // seccion de mostrar ofertas

btnCategorias.addEventListener("click", () => {
    listaCategorias.innerHTML = "";

    let configFetch = {
        method: "post",
        body: "pedirCategorias=",
        headers: {"Content-Type" : "application/x-www-form-urlencoded"}
    }
    
    let promesa = fetch("./controlador/verProductos.php", configFetch);
    
    promesa.then((response) => {
        response.json().then((categoria) => {
            for (let i = 0; i < categoria.length; i++) {
                let li = document.createElement("li");
                listaCategorias.appendChild(li);
                li.innerHTML = `<div class="dropend">
                                    <button
                                        class="btn btn-outline-dark dropdown-toggle col-12"
                                        type="button"
                                        id="${categoria[i].id_categoria}"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                    ${categoria[i].nombre_categoria}
                                    </button>
                                    <ul class="dropdown-menu" aria-labelledby="dropend" id="${categoria[i].id_categoria}">
                                    </ul>
                                </div>`;
                
                
                            }

                let divListaCategorias = listaCategorias.querySelectorAll("div");
                for (let j = 0; j < divListaCategorias.length; j++) {
                    let ulListaCategorias = divListaCategorias[j].querySelectorAll("ul");
                    for (let k = 0; k < ulListaCategorias.length; k++) {
                        pedirMarcas(ulListaCategorias[k]);
                    }
                }
        });
    }).catch((error) => {
        console.log("No disponemos de categorías");
    });

});

function pedirMarcas(element) {
    var ul = document.createElement("ul");
    element.appendChild(ul);
    var idCategoria = element.id;

    let configFetch = {
        method: "post",
        body: "pedirMarcas=" + idCategoria,
        headers: {"Content-Type" : "application/x-www-form-urlencoded"}
    }

    let promesa = fetch("./controlador/verProductos.php", configFetch);

    promesa.then((response) => {

        response.json().then((marca) => {
            let liTodas = document.createElement("li");
            let aTodas = document.createElement("a");
            element.appendChild(liTodas);
            liTodas.appendChild(aTodas);
            aTodas.setAttribute('href', "#");
            aTodas.setAttribute('style', 'color:black');
            aTodas.setAttribute('class', 'dropdown-item text-center linksMarcas');
            aTodas.setAttribute('id', idCategoria);
            aTodas.innerHTML = 'Todas';
            for (let i = 0; i < marca.length; i++) {
                let li = document.createElement("li");
                element.appendChild(li);
                let a = document.createElement("a");
                li.appendChild(a);
                a.setAttribute('href', "#");
                a.setAttribute('class', "linksMarcas");
                a.setAttribute('style', 'color:black');
                a.setAttribute('class', 'dropdown-item text-center');
                a.setAttribute('id', idCategoria + ',' + marca[i].id_marca);
                a.innerHTML = marca[i].nombre;

                a.addEventListener('click', pedirProductos);
            }

            let linksMarcas = document.getElementsByClassName('linksMarcas');
            for (let j = 0; j < linksMarcas.length; j++) {
                linksMarcas[j].addEventListener('click', pedirProductos);
            }
        })
    }).catch((error) => {
        console.log("No disponemos de marcas");
    });
}

function pedirProductos(event) {
    let elemento = event.target;
    let idElemento = elemento.id;
    let arrayIds = idElemento.split(",");
    var id_categoria;
    var id_marca;

    if (arrayIds[1]) {
        // console.log(`el id_categoria es ${arrayIds[0]} y el id_marca es ${arrayIds[1]}`);
        id_categoria = arrayIds[0];
        id_marca = arrayIds[1];
    }
    else {
        // console.log(`el id_categoria para todas es ${idElemento}`);
        id_categoria = idElemento;
        id_marca = 0;
    }

    // console.log(id_categoria + "," + id_marca);

    let configFetch = {
        method: 'post',
        body: 'id_categoria=' + id_categoria + '&id_marca=' + id_marca,
        headers: {"Content-Type" : "application/x-www-form-urlencoded"}
    }

    let promesa = fetch('./controlador/verProductos.php', configFetch);

    promesa.then(function (response) {
        mostrarProductos.classList.remove("d-none");
        mostrarProductos.innerHTML = "";
        if (!response.ok) {
            //console.log("Error en respuesta");
        }
        else {
            response.json().then((articulo) => {
                if (articulo.error) {
                    console.log(articulo.error);
                }
                else {
                    // console.log(articulo);
                    seccionOfertas.setAttribute("class", "d-none");
                    let divRow = document.createElement("div");
                    let divCol = document.createElement("div");
                    divRow.setAttribute("class", "row justify-content-center");
                    divCol.setAttribute("class", "col-10 justify-content-center mt-5 d-flex flex-wrap");
                    mostrarProductos.appendChild(divRow);
                    divRow.appendChild(divCol);
                    for (let i = 0; i < articulo.length; i++) {
                        let divListGroup = document.createElement("div");
                        divListGroup.setAttribute("class", "list-group mx-2 my-2");
                        divCol.appendChild(divListGroup);
                        let aListGroup = document.createElement("a");
                        aListGroup.setAttribute("href", "#");
                        aListGroup.setAttribute("class", "list-group-item list-group-item-action p-4 articulo");
                        aListGroup.setAttribute("id", `${articulo[i].id_articulo}`);
                        divListGroup.appendChild(aListGroup);
                        aListGroup.innerHTML = `<div class="text-center">
                                                    <h5>${articulo[i].modelo}</h5>
                                                    <img src=${articulo[i].imagen}>
                                                    <p><b>Precio: </b>${articulo[i].precio} €</p>
                                                </div>`;
                    }
                    let enlacesArticulos = document.getElementsByClassName("articulo");
                    for (let j = 0; j < enlacesArticulos.length; j++) {
                        enlacesArticulos[j].addEventListener('click', mostrarInfoArticulo);
                    }
                }
            });
        }
    }).catch(function (error) {
        console.log('No tenemos productos ' + error);
    })
}

function mostrarInfoArticulo(event) {
    let elemento = event.currentTarget;
    let id_articulo = elemento.id;

    console.log("El id del articulo seleccionado es " + id_articulo);

    let configFetch = {
        method: 'post',
        body: 'id_articulo=' + id_articulo,
        headers: {"Content-Type" : "application/x-www-form-urlencoded"}
    }

    let promesa = fetch("./controlador/verProductos.php", configFetch);

    promesa.then((response) => {
        if (!response.ok) {
            console.log("Error en respuesta");
        }
        else {
            response.json().then((infoArticulo) => {
                if (infoArticulo.error) {
                    console.log(infoArticulo.error);
                }
                else {
                    console.log(infoArticulo);
                    // aqui obtenemos la respuesta de la info del articulo
                }
            });
        }
    }).catch((error) => {
        console.log('No hay informacion del articulo ' + error);
    });
}
