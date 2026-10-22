"use strict";

/* =========================================================
   LEGUMBRERÍA & DIETÉTICA R&A
   Catálogo online
========================================================= */


/* =========================================================
   1. CONFIGURACIÓN DE CATEGORÍAS
========================================================= */

const categorias = [

    {
        id: "aceites",
        nombre: "Aceites",
        imagen: "assets/categorias/categoria-aceites.png"
    },
    {
        id: "almacen",
        nombre: "Almacén",
        imagen: "assets/categorias/categoria-almacen.png"
    },
    {
        id: "bebidas",
        nombre: "Bebidas",
        imagen: "assets/categorias/categoria-bebidas.png"
    },
    {
        id: "cereales",
        nombre: "Cereales",
        imagen: "assets/categorias/categoria-cereales.png"
    },
    {
        id: "chocolates-postres",
        nombre: "Chocolates y Postres",
        imagen: "assets/categorias/categoria-chocolates.png"
    },
    {
        id: "condimentos",
        nombre: "Condimentos",
        imagen: "assets/categorias/categoria-condimentos.png"
    },
    {
        id: "frutas-verduras",
        nombre: "Frutas y Verduras",
        imagen: "assets/categorias/categoria-frutas-verduras.png"
    },
    {
        id: "frutos-secos",
        nombre: "Frutos Secos",
        imagen: "assets/categorias/categoria-frutos-secos.png"
    },
    {
        id: "galletas",
        nombre: "Galletas",
        imagen: "assets/categorias/categoria-galletas.png"
    },
    {
        id: "harinas",
        nombre: "Harinas",
        imagen: "assets/categorias/categoria-harinas.png"
    },
    {
        id: "infusiones",
        nombre: "Infusiones",
        imagen: "assets/categorias/categoria-infusiones.png"
    },
    {
        id: "lacteos",
        nombre: "Lácteos",
        imagen: "assets/categorias/categoria-lacteos.png"
    },
    {
        id: "legumbres",
        nombre: "Legumbres",
        imagen: "assets/categorias/categoria-legumbres.png"
    },
    {
        id: "maices",
        nombre: "Maíces",
        imagen: "assets/categorias/categoria-maices.png"
    },
    {
        id: "reposteria",
        nombre: "Repostería",
        imagen: "assets/categorias/categoria-reposteria.png"
    },

    {
        id: "semillas",
        nombre: "Semillas",
        imagen: "assets/categorias/categoria-semillas.png"
    },

    {
        id: "sin-tacc",
        nombre: "Sin TACC",
        imagen: "assets/categorias/categoria-sintacc.png",
        tipo: "caracteristica"
    },

    {
        id: "suplementos",
        nombre: "Suplementos",
        imagen: "assets/categorias/categoria-suplementos.png"
    }
];


/* =========================================================
   2. CONFIGURACIÓN GENERAL
========================================================= */

const nombresCaracteristicas = {
    "sin-tacc": "Sin TACC",
    "vegano": "Vegano",
    "vegetariano": "Vegetariano",
    "organico": "Orgánico",
    "apto-keto": "Apto Keto",
    "apto-paleo": "Apto Paleo",
    "fuente-de-fibra": "Fuente de fibra",
    "libre-de-soja": "Libre de soja",
    "sin-azucar-agregada": "Sin azúcar agregada",
    "sin-grasas-trans": "Sin grasas trans",
    "sin-lactosa": "Sin lactosa",
    "sin-sal-agregada": "Sin sal agregada"
};


const numeroWhatsApp = "542214281519";


/* =========================================================
   3. ESTADO DE LA APLICACIÓN
========================================================= */

let productos = [];

let productosCargados = false;

let categoriaActual = null;

let productosCategoriaActual = [];

let origenSeleccionado = "todos";

let caracteristicasSeleccionadas = [];

/* =========================================================
   4. REFERENCIAS AL DOM
========================================================= */

const vistaInicio =
    document.getElementById("vista-inicio");

const vistaCategorias =
    document.getElementById("vista-categorias");

const vistaCatalogo =
    document.getElementById("vista-catalogo");


const botonVerCatalogo =
    document.getElementById("boton-ver-catalogo");

const botonVolverInicio =
    document.getElementById("volver-inicio");

const botonVolverCategorias =
    document.getElementById("volver-categorias");


const grillaCategorias =
    document.getElementById("grilla-categorias");

const grillaProductos =
    document.getElementById("grilla-productos");

const buscadorProductos =
    document.getElementById("buscador-general");

const sugerenciasBuscador =
    document.getElementById("sugerencias-buscador");

const buscadorCategoria =
    document.getElementById(
        "buscador-categoria"
    );

const botonLimpiarBuscadorCategoria =
    document.getElementById(
        "limpiar-buscador-categoria"
    );

const filtrosOrigen =
    document.getElementById(
        "filtros-origen"
    );

const filtrosCaracteristicas =
    document.getElementById(
        "filtros-caracteristicas"
    );

const grupoFiltrosCaracteristicas =
    document.getElementById(
        "grupo-filtros-caracteristicas"
    );

const contenedorLimpiarFiltros =
    document.getElementById(
        "contenedor-limpiar-filtros"
    );

const botonLimpiarFiltrosCategoria =
    document.getElementById(
        "limpiar-filtros-categoria"
    );

const tituloCategoriaProductos =
    document.getElementById(
        "titulo-categoria-productos"
    );

const cantidadProductos =
    document.getElementById(
        "cantidad-productos"
    );

const estadoProductos =
    document.getElementById(
        "estado-productos"
    );

const anioActual =
    document.getElementById("anio-actual");


/* =========================================================
   5. UTILIDADES
========================================================= */

function normalizarTexto(texto) {

    return String(texto || "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim();
}

function irArriba() {

    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "auto"
    });
}


function ocultarVistas() {

    vistaInicio?.classList.add("oculto");

    vistaCategorias?.classList.add("oculto");

    vistaCatalogo?.classList.add("oculto");
}


function limpiarEstadoProductos() {

    if (!estadoProductos) {
        return;
    }

    estadoProductos.textContent = "";

    estadoProductos.classList.add(
        "oculto"
    );
}


function obtenerNombreCaracteristica(
    caracteristica
) {

    return nombresCaracteristicas[
        caracteristica
    ] || caracteristica;
}


/* =========================================================
   OBTENER BANDERA SEGÚN PAÍS DE ORIGEN
========================================================= */

function obtenerBanderaPais(origen) {

    const banderas = {
        "Argentina": "assets/banderas/argentina.svg",
        "Bolivia": "assets/banderas/bolivia.svg",
        "Brasil": "assets/banderas/brasil.svg",
        "Colombia": "assets/banderas/colombia.svg",
        "India": "assets/banderas/india.svg",
        "Italia": "assets/banderas/italia.svg",
        "Paraguay": "assets/banderas/paraguay.svg",
        "Perú": "assets/banderas/peru.svg",
        "Peru": "assets/banderas/peru.svg",
        "Turquía": "assets/banderas/turquia.svg",
        "Turquia": "assets/banderas/turquia.svg",
        "Venezuela": "assets/banderas/venezuela.svg"
    };

    return banderas[origen] || null;
}

/* =========================================================
   6. MOSTRAR VISTAS
========================================================= */

function mostrarInicio() {

    ocultarVistas();

    vistaInicio?.classList.remove(
        "oculto"
    );

    irArriba();
}


function mostrarVistaCategorias() {

    ocultarVistas();

    vistaCategorias?.classList.remove(
        "oculto"
    );

    irArriba();
}


function mostrarVistaProductos() {

    ocultarVistas();

    vistaCatalogo?.classList.remove(
        "oculto"
    );

    irArriba();
}


/* =========================================================
   7. CONSTRUCCIÓN DE URL
========================================================= */

function crearUrlInicio() {

    const url =
        new URL(window.location.href);

    url.searchParams.delete("vista");

    url.searchParams.delete("categoria");

    return url;
}


function crearUrlCategorias() {

    const url =
        new URL(window.location.href);

    url.searchParams.set(
        "vista",
        "catalogo"
    );

    url.searchParams.delete(
        "categoria"
    );

    return url;
}


function crearUrlCategoria(
    categoriaId
) {

    const url =
        new URL(window.location.href);

    url.searchParams.set(
        "vista",
        "productos"
    );

    url.searchParams.set(
        "categoria",
        categoriaId
    );

    return url;
}


/* =========================================================
   8. NAVEGACIÓN INTERNA
========================================================= */

function irACategorias() {

    history.pushState(
        {
            vista: "catalogo"
        },
        "",
        crearUrlCategorias()
    );

    mostrarVistaCategorias();
}


function irAInicio() {

    history.pushState(
        {
            vista: "inicio"
        },
        "",
        crearUrlInicio()
    );

    mostrarInicio();
}


function irACategoria(
    categoriaId
) {

    const categoria =
        obtenerCategoriaPorId(
            categoriaId
        );

    if (!categoria) {

        console.warn(
            `La categoría "${categoriaId}" no existe.`
        );

        return;
    }


    history.pushState(
        {
            vista: "productos",
            categoria: categoriaId
        },
        "",
        crearUrlCategoria(
            categoriaId
        )
    );


    mostrarCategoria(
        categoriaId
    );
}


function volverAInicio() {

    const parametros =
        new URLSearchParams(
            window.location.search
        );

    if (
        parametros.get("vista") ===
        "catalogo"
    ) {

        history.back();

        return;
    }

    irAInicio();
}


function volverACategorias() {

    const parametros =
        new URLSearchParams(
            window.location.search
        );

    if (
        parametros.get("vista") ===
        "productos"
    ) {

        history.back();

        return;
    }

    irACategorias();
}


/* =========================================================
   9. CARGAR PRODUCTOS.JSON
========================================================= */

async function cargarProductos() {

    if (productosCargados) {

        return productos;
    }


    try {

        const respuesta =
            await fetch(
                "data/productos.json"
            );


        if (!respuesta.ok) {

            throw new Error(
                `Error HTTP ${respuesta.status}`
            );
        }


        const datos =
            await respuesta.json();


        if (!Array.isArray(datos)) {

            throw new Error(
                "productos.json debe contener un arreglo de productos."
            );
        }


        productos = datos.sort(
            (a, b) =>
                String(a.nombre || "").localeCompare(
                    String(b.nombre || ""),
                    "es",
                    {
                        sensitivity: "base"
                    }
                )
        );

        productosCargados = true;


        console.info(
            `Productos cargados: ${productos.length}`
        );


        return productos;


    } catch (error) {

        productos = [];

        productosCargados = false;


        console.error(
            "Error al cargar productos.json:",
            error
        );


        throw error;
    }
}


/* =========================================================
   10. OBTENER CATEGORÍA
========================================================= */

function obtenerCategoriaPorId(
    categoriaId
) {

    return categorias.find(
        (categoria) =>
            categoria.id ===
            categoriaId
    );
}


/* =========================================================
   11. FILTRAR PRODUCTOS
========================================================= */

function obtenerProductosPorCategoria(
    categoria
) {

    if (!categoria) {

        return [];
    }


    /*
        SIN TACC

        Es una característica transversal.
    */

    if (
        categoria.tipo ===
        "caracteristica"
    ) {

        return productos.filter(
            (producto) => {

                if (
                    !Array.isArray(
                        producto.caracteristicas
                    )
                ) {

                    return false;
                }


                return producto
                    .caracteristicas
                    .includes(
                        categoria.id
                    );
            }
        );
    }


    /*
        CATEGORÍAS NORMALES
    */

    return productos.filter(
        (producto) =>
            producto.categoria ===
            categoria.id
    );
}


/* =========================================================
   12. CREAR CATEGORÍAS
========================================================= */

function mostrarCategorias() {

    if (!grillaCategorias) {

        console.error(
            "No se encontró #grilla-categorias."
        );

        return;
    }


    grillaCategorias.innerHTML = "";


    const fragmento =
        document.createDocumentFragment();


    categorias.forEach(
        (categoria) => {

            const tarjeta =
                document.createElement(
                    "button"
                );


            tarjeta.type =
                "button";


            tarjeta.className =
                "tarjeta-categoria";


            tarjeta.dataset.categoria =
                categoria.id;


            tarjeta.setAttribute(
                "aria-label",
                `Ver productos de ${categoria.nombre}`
            );


            const imagen =
                document.createElement(
                    "img"
                );


            imagen.src =
                categoria.imagen;


            imagen.alt =
                categoria.nombre;


            imagen.loading =
                "lazy";


            imagen.decoding =
                "async";


            tarjeta.addEventListener(
                "click",
                () => {

                    irACategoria(
                        categoria.id
                    );
                }
            );


            tarjeta.appendChild(
                imagen
            );


            fragmento.appendChild(
                tarjeta
            );
        }
    );


    grillaCategorias.appendChild(
        fragmento
    );
}

/* =========================================================
   BUSCADOR GENERAL DE PRODUCTOS
========================================================= */

async function buscarProductos(termino) {

    const textoBuscado =
        normalizarTexto(termino);


    if (!textoBuscado) {

        console.log("Buscador vacío");

        return [];
    }


    try {

        await cargarProductos();


        const resultados =
            productos.filter(
                (producto) => {

                    const nombre =
                        normalizarTexto(
                            producto.nombre
                        );


                    return nombre.includes(
                        textoBuscado
                    );
                }
            );


        console.log(
            `Búsqueda: "${termino}"`,
            resultados
        );


        return resultados;


    } catch (error) {

        console.error(
            "No se pudieron buscar productos:",
            error
        );


        return [];
    }
}

function mostrarSugerenciasBusqueda(
    resultados
) {

    if (!sugerenciasBuscador) {
        return;
    }


    sugerenciasBuscador.innerHTML = "";


    if (resultados.length === 0) {

        sugerenciasBuscador.classList.add(
            "oculto"
        );

        return;
    }


    const fragmento =
        document.createDocumentFragment();


    resultados
        .slice(0, 6)
        .forEach(
            (producto) => {

                const boton =
                    document.createElement(
                        "button"
                    );


                boton.type =
                    "button";


                boton.className =
                    "sugerencia-producto";


                boton.setAttribute(
                    "role",
                    "option"
                );

                boton.addEventListener(
                    "click",
                    () => {

                        seleccionarProductoBusqueda(
                            producto
                        );
                    }
                );


                const nombre =
                    document.createElement(
                        "span"
                    );


                nombre.className =
                    "sugerencia-producto-nombre";


                nombre.textContent =
                    producto.nombre;


                const detalle =
                    document.createElement(
                        "span"
                    );


                detalle.className =
                    "sugerencia-producto-detalle";


                detalle.textContent =
                    producto.origen || "";


                boton.append(
                    nombre,
                    detalle
                );


                fragmento.appendChild(
                    boton
                );
            }
        );


    sugerenciasBuscador.appendChild(
        fragmento
    );


    sugerenciasBuscador.classList.remove(
        "oculto"
    );
}

function seleccionarProductoBusqueda(
    producto
) {

    if (!producto) {
        return;
    }


    /* Limpiar el buscador */

    if (buscadorProductos) {

        buscadorProductos.value = "";
    }


    /* Cerrar sugerencias */

    if (sugerenciasBuscador) {

        sugerenciasBuscador.innerHTML = "";

        sugerenciasBuscador.classList.add(
            "oculto"
        );
    }


    /* Buscar la categoría correspondiente */

    const categoriaProducto =
        categorias.find(
            (categoria) =>
                categoria.id === producto.categoria
        );


    if (!categoriaProducto) {

        console.warn(
            "No se encontró la categoría del producto:",
            producto
        );

        return;
    }

    sessionStorage.setItem(
        "productoSeleccionado",
        String(producto.id)
    );

    /* Navegar utilizando el sistema actual */

    irACategoria(
        categoriaProducto.id
    );
}

/* =========================================================
   ENFOCAR PRODUCTO SELECCIONADO DESDE EL BUSCADOR
========================================================= */
function enfocarProductoSeleccionado() {

    const productoId =
        sessionStorage.getItem(
            "productoSeleccionado"
        );


    if (!productoId) {
        return;
    }


    const tarjetas =
        document.querySelectorAll(
            ".tarjeta-producto"
        );


    const tarjeta =
        Array.from(tarjetas).find(
            (elemento) =>
                elemento.dataset.productoId ===
                productoId
        );


    if (!tarjeta) {
        return;
    }


    sessionStorage.removeItem(
        "productoSeleccionado"
    );


    requestAnimationFrame(
        () => {

            tarjeta.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });


            tarjeta.classList.add(
                "tarjeta-producto-destacada"
            );


            setTimeout(
                () => {

                    tarjeta.classList.remove(
                        "tarjeta-producto-destacada"
                    );

                },
                1800
            );
        }
    );
}

/* =========================================================
   BUSCADOR INTERNO DE LA CATEGORÍA
========================================================= */

function filtrarProductosCategoria(
    termino
) {

    const textoBuscado =
        normalizarTexto(
            termino
        );

    return productosCategoriaActual.filter(
        (producto) => {

            /**
             * FILTRO POR ORIGEN
             */
            const coincideOrigen =
                origenSeleccionado === "todos" ||
                producto.origen === origenSeleccionado;


            /**
             * FILTRO POR NOMBRE
             */
            const nombre =
                normalizarTexto(
                    producto.nombre
                );

            const coincideBusqueda =
                !textoBuscado ||
                nombre.includes(
                    textoBuscado
                );


            /**
             * FILTRO POR CARACTERÍSTICAS
             *
             * Si no hay ninguna seleccionada,
             * todos los productos cumplen.
             *
             * Si hay varias seleccionadas,
             * el producto debe contener TODAS.
             */
            const caracteristicasProducto =
                Array.isArray(
                    producto.caracteristicas
                )
                    ? producto.caracteristicas
                    : [];


            const coincideCaracteristicas =
                caracteristicasSeleccionadas
                    .every(
                        (caracteristica) =>
                            caracteristicasProducto
                                .includes(
                                    caracteristica
                                )
                    );


            /**
             * El producto debe cumplir
             * simultáneamente los filtros activos.
             */
            return (
                coincideOrigen &&
                coincideBusqueda &&
                coincideCaracteristicas
            );
        }
    );
}

function actualizarBotonLimpiarFiltros() {

    if (!contenedorLimpiarFiltros) {
        return;
    }

    const hayBusqueda =
        buscadorCategoria &&
        buscadorCategoria.value.trim() !== "";

    const hayOrigen =
        origenSeleccionado !== "todos";

    const hayCaracteristicas =
        caracteristicasSeleccionadas.length > 0;


    const hayFiltrosActivos =
        hayBusqueda ||
        hayOrigen ||
        hayCaracteristicas;


    contenedorLimpiarFiltros
        .classList
        .toggle(
            "oculto",
            !hayFiltrosActivos
        );
}

function aplicarFiltrosCategoria() {

    const termino =
        buscadorCategoria
            ? buscadorCategoria.value
            : "";


    const resultados =
        filtrarProductosCategoria(
            termino
        );


    /*
        Actualizar contador.
    */

    if (cantidadProductos) {

        const cantidad =
            resultados.length;

        cantidadProductos.textContent =
            cantidad === 1
                ? "1 producto"
                : `${cantidad} productos`;
    }


    /*
        Mostrar los productos que cumplen
        búsqueda + origen.
    */

    renderizarProductos(
        resultados
    );

    actualizarBotonLimpiarFiltros();
}

/* =========================================================
   GENERAR FILTROS DE ORIGEN
========================================================= */

function renderizarFiltrosOrigen() {

    if (!filtrosOrigen) {
        return;
    }


    /*
        Limpiar filtros anteriores.
    */

    filtrosOrigen.innerHTML = "";


    /*
        Obtener solamente los países presentes
        en la categoría actual.

        Set evita países repetidos.
    */

    const origenes = [
        ...new Set(
            productosCategoriaActual
                .map(
                    (producto) =>
                        producto.origen
                )
                .filter(Boolean)
        )
    ];


    /*
        Orden alfabético.
    */

    origenes.sort(
        (a, b) =>
            a.localeCompare(
                b,
                "es",
                {
                    sensitivity: "base"
                }
            )
    );


    /*
        Botón "Todos".
    */

    const botonTodos =
        document.createElement(
            "button"
        );

    botonTodos.type = "button";

    botonTodos.className =
        "filtro-origen activo";

    botonTodos.textContent =
        "Todos";

    botonTodos.dataset.origen =
        "todos";

    botonTodos.addEventListener(
        "click",
        () => {

            origenSeleccionado =
                "todos";


            filtrosOrigen
                .querySelectorAll(
                    ".filtro-origen"
                )
                .forEach(
                    (botonFiltro) => {

                        botonFiltro
                            .classList
                            .remove(
                                "activo"
                            );
                    }
                );


            botonTodos.classList.add(
                "activo"
            );


            aplicarFiltrosCategoria();
        }
    );

    filtrosOrigen.appendChild(
        botonTodos
    );


    /*
        Crear un botón por cada país.
    */

    origenes.forEach(
        (origen) => {

            const boton =
                document.createElement(
                    "button"
                );

            boton.type = "button";

            boton.className =
                "filtro-origen";

            boton.dataset.origen =
                origen;


            /*
                Nombre del país.
                Las banderas las integraremos
                visualmente después.
            */

            boton.textContent =
                origen;

            boton.addEventListener(
                "click",
                () => {

                    origenSeleccionado =
                        origen;


                    /*
                        Quitar el estado activo
                        de todos los botones.
                    */

                    filtrosOrigen
                        .querySelectorAll(
                            ".filtro-origen"
                        )
                        .forEach(
                            (botonFiltro) => {

                                botonFiltro
                                    .classList
                                    .remove(
                                        "activo"
                                    );
                            }
                        );


                    /*
                        Activar el país seleccionado.
                    */

                    boton.classList.add(
                        "activo"
                    );


                    /*
                        Aplicar búsqueda + origen.
                    */

                    aplicarFiltrosCategoria();
                }
            );

            filtrosOrigen.appendChild(
                boton
            );
        }
    );
}

function renderizarFiltrosCaracteristicas() {

    if (
        !filtrosCaracteristicas ||
        !grupoFiltrosCaracteristicas
    ) {
        return;
    }


    /**
     * Limpiar los filtros de la
     * categoría anterior.
     */
    filtrosCaracteristicas.innerHTML = "";


    /**
     * Obtener todas las características
     * presentes en los productos de
     * la categoría actual.
     */
    const caracteristicas = [
        ...new Set(
            productosCategoriaActual
                .flatMap(
                    (producto) =>
                        Array.isArray(
                            producto.caracteristicas
                        )
                            ? producto.caracteristicas
                            : []
                )
                .filter(Boolean)
        )
    ];


    /**
     * Si ningún producto de la categoría
     * tiene características, ocultamos
     * completamente esta sección.
     */
    if (caracteristicas.length === 0) {

        grupoFiltrosCaracteristicas
            .classList
            .add("oculto");

        return;
    }


    /**
     * Si existen características,
     * mostramos la sección.
     */
    grupoFiltrosCaracteristicas
        .classList
        .remove("oculto");


    /**
     * Ordenarlas utilizando el nombre
     * que verá el usuario.
     */
    caracteristicas.sort(
        (a, b) =>
            obtenerNombreCaracteristica(a)
                .localeCompare(
                    obtenerNombreCaracteristica(b),
                    "es",
                    {
                        sensitivity: "base"
                    }
                )
    );


    /**
     * Crear un botón por característica.
     */
    caracteristicas.forEach(
        (caracteristica) => {

            const boton =
                document.createElement(
                    "button"
                );

            boton.type = "button";

            boton.className =
                "filtro-caracteristica";

            boton.dataset.caracteristica =
                caracteristica;

            boton.textContent =
                obtenerNombreCaracteristica(
                    caracteristica
                );


            boton.addEventListener(
                "click",
                () => {

                    const indice =
                        caracteristicasSeleccionadas
                            .indexOf(
                                caracteristica
                            );


                    /**
                     * Si ya estaba seleccionada,
                     * la quitamos.
                     */
                    if (indice !== -1) {

                        caracteristicasSeleccionadas
                            .splice(
                                indice,
                                1
                            );

                        boton.classList.remove(
                            "activo"
                        );

                    } else {

                        /**
                         * Si no estaba seleccionada,
                         * la agregamos.
                         */
                        caracteristicasSeleccionadas
                            .push(
                                caracteristica
                            );

                        boton.classList.add(
                            "activo"
                        );
                    }


                    aplicarFiltrosCategoria();
                }
            );


            filtrosCaracteristicas
                .appendChild(
                    boton
                );
        }
    );
}

/* =========================================================
   13. CREAR TARJETA DE PRODUCTO
========================================================= */

function crearTarjetaProducto(
    producto
) {

    const tarjeta =
        document.createElement(
            "article"
        );

    tarjeta.className =
        "tarjeta-producto";

    tarjeta.dataset.productoId =
        producto.id;

    /* =====================================================
       ORIGEN
    ===================================================== */

    const origen =
        document.createElement(
            "div"
        );

    origen.className =
        "tarjeta-producto-origen";

    const rutaBandera = obtenerBanderaPais(producto.origen);

    /* Bandera del país */
    if (rutaBandera) {

        const bandera = document.createElement("img");

        bandera.className = "tarjeta-producto-bandera";

        bandera.src = rutaBandera;

        bandera.alt = "";

        bandera.setAttribute(
            "aria-hidden",
            "true"
        );

        origen.appendChild(bandera);
    }


    /* Nombre del país */
    const nombreOrigen = document.createElement("span");

    nombreOrigen.textContent =
        producto.origen || "Origen no informado";

    origen.appendChild(nombreOrigen);

    /* =====================================================
       VARIANTES
    ===================================================== */

    const variantes =
        Array.isArray(
            producto.variantes
        )
            ? producto.variantes
            : [];


    let varianteActual =
        variantes[0] || null;


    let selectorVarianteUsaPresentacion =
        false;


    /* =====================================================
       IMAGEN
    ===================================================== */

    const contenedorImagen =
        document.createElement(
            "div"
        );

    contenedorImagen.className =
        "tarjeta-producto-imagen";


    const imagen =
        document.createElement(
            "img"
        );


    imagen.alt =
        producto.nombre ||
        "Producto";


    imagen.loading =
        "lazy";

    imagen.decoding =
        "async";


    imagen.addEventListener(
        "error",
        () => {

            imagen.style.display =
                "none";
        }
    );


    contenedorImagen.appendChild(
        imagen
    );


    /* =====================================================
       NOMBRE
    ===================================================== */

    const nombre =
        document.createElement(
            "h2"
        );


    nombre.textContent =
        producto.nombre ||
        "Producto";


    /* =====================================================
       SELECTOR DE VARIANTE
    ===================================================== */

    const contenedorSelectorVariante =
        document.createElement(
            "div"
        );

    contenedorSelectorVariante.className =
        "tarjeta-producto-selector";


    const etiquetaSelectorVariante =
        document.createElement(
            "label"
        );


    etiquetaSelectorVariante.textContent =
        "Variante";


    const selectorVariantes =
        document.createElement(
            "select"
        );


    selectorVariantes.setAttribute(
        "aria-label",
        `Elegir variante de ${producto.nombre || "producto"}`
    );


    /* =====================================================
       INFORMACIÓN
    ===================================================== */

    const informacion =
        document.createElement(
            "div"
        );

    informacion.className =
        "tarjeta-producto-informacion";


    /* =====================================================
       SABOR
    ===================================================== */

    const sabor =
        document.createElement(
            "p"
        );

    sabor.className =
        "tarjeta-producto-dato";


    const etiquetaSabor =
        document.createElement(
            "strong"
        );


    etiquetaSabor.textContent =
        "Sabor";


    const valorSabor =
        document.createElement(
            "span"
        );


    sabor.append(
        etiquetaSabor,
        valorSabor
    );


    /* =====================================================
       PRESENTACIONES
    ===================================================== */

    const bloquePresentaciones =
        document.createElement(
            "div"
        );

    bloquePresentaciones.className =
        "tarjeta-producto-presentaciones";


    const tituloPresentaciones =
        document.createElement(
            "strong"
        );


    tituloPresentaciones.className =
        "tarjeta-producto-presentaciones-titulo";


    tituloPresentaciones.textContent =
        "Presentación";


    const listaPresentaciones =
        document.createElement(
            "div"
        );


    listaPresentaciones.className =
        "tarjeta-producto-presentaciones-lista";


    bloquePresentaciones.append(
        tituloPresentaciones,
        listaPresentaciones
    );


    informacion.append(
        sabor,
        bloquePresentaciones
    );


    /* =====================================================
       CARACTERÍSTICAS
    ===================================================== */

    const bloqueCaracteristicas =
        document.createElement(
            "div"
        );

    bloqueCaracteristicas.className =
        "tarjeta-producto-caracteristicas";


    const tituloCaracteristicas =
        document.createElement(
            "strong"
        );

    tituloCaracteristicas.className =
        "tarjeta-producto-caracteristicas-titulo";

    tituloCaracteristicas.textContent =
        "Características";


    const listaCaracteristicas =
        document.createElement(
            "div"
        );

    listaCaracteristicas.className =
        "tarjeta-producto-caracteristicas-lista";


    const caracteristicas =
        Array.isArray(
            producto.caracteristicas
        )
            ? producto.caracteristicas
            : [];


    caracteristicas.forEach(
        (caracteristica) => {

            const etiqueta =
                document.createElement(
                    "span"
                );


            etiqueta.className =
                "tarjeta-producto-caracteristica";


            etiqueta.textContent =
                obtenerNombreCaracteristica(
                    caracteristica
                );


            listaCaracteristicas.appendChild(
                etiqueta
            );
        }
    );


    bloqueCaracteristicas.append(
        tituloCaracteristicas,
        listaCaracteristicas
    );


    if (
        caracteristicas.length === 0
    ) {

        bloqueCaracteristicas
            .classList
            .add(
                "oculto"
            );
    }


    /* =====================================================
       CONSULTAR POR WHATSAPP
    ===================================================== */

    const botonConsultar =
        document.createElement(
            "a"
        );


    botonConsultar.className =
        "tarjeta-producto-consultar";


    botonConsultar.textContent =
        "Consultar";


    botonConsultar.target =
        "_blank";


    botonConsultar.rel =
        "noopener noreferrer";


    botonConsultar.setAttribute(
        "aria-label",
        `Consultar por ${producto.nombre || "producto"} en WhatsApp`
    );


    botonConsultar.addEventListener(
        "click",
        () => {

            const partesMensaje = [];


            partesMensaje.push(
                `Hola 👋 Quería consultar por ${producto.nombre || "este producto"}.`
            );


            if (
                varianteActual?.sabor
            ) {

                partesMensaje.push(
                    `Sabor: ${varianteActual.sabor}`
                );
            }


            const presentacionesActuales =
                Array.isArray(
                    varianteActual?.presentaciones
                )
                    ? varianteActual.presentaciones
                    : [];


            if (
                presentacionesActuales.length === 1
            ) {

                partesMensaje.push(
                    `Presentación: ${presentacionesActuales[0]}`
                );

            } else if (
                presentacionesActuales.length > 1
            ) {

                partesMensaje.push(
                    `Presentaciones: ${presentacionesActuales.join(", ")}`
                );
            }


            const mensaje =
                partesMensaje.join(
                    "\n"
                );


            botonConsultar.href =
                `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
        }
    );


    /* =====================================================
       ACTUALIZAR PRESENTACIONES
    ===================================================== */

    function actualizarPresentaciones(
        variante
    ) {

        listaPresentaciones.innerHTML =
            "";


        const presentaciones =
            Array.isArray(
                variante?.presentaciones
            )
                ? variante.presentaciones
                : [];


        if (
            presentaciones.length === 0
        ) {

            bloquePresentaciones
                .classList
                .add(
                    "oculto"
                );


            return;
        }


        /*
            Si la presentación ya es utilizada
            para distinguir las variantes,
            evitamos repetirla debajo.
        */

        if (
            variantes.length > 1 &&
            selectorVarianteUsaPresentacion
        ) {

            bloquePresentaciones
                .classList
                .add(
                    "oculto"
                );


            return;
        }


        bloquePresentaciones
            .classList
            .remove(
                "oculto"
            );


        presentaciones.forEach(
            (presentacion) => {

                const etiqueta =
                    document.createElement(
                        "span"
                    );


                etiqueta.className =
                    "tarjeta-producto-presentacion";


                etiqueta.textContent =
                    presentacion;


                listaPresentaciones.appendChild(
                    etiqueta
                );
            }
        );
    }


    /* =====================================================
       ACTUALIZAR VARIANTE
    ===================================================== */

    function actualizarVariante(
        variante
    ) {

        if (!variante) {

            imagen.removeAttribute(
                "src"
            );

            imagen.style.display =
                "none";

            sabor.classList.add(
                "oculto"
            );

            bloquePresentaciones
                .classList
                .add(
                    "oculto"
                );

            return;
        }


        varianteActual =
            variante;


        /* -------------------------
           IMAGEN
        ------------------------- */

        if (variante.imagen) {

            imagen.style.display =
                "";

            imagen.src =
                variante.imagen;

        } else {

            imagen.removeAttribute(
                "src"
            );

            imagen.style.display =
                "none";
        }


        /* -------------------------
           SABOR
        ------------------------- */

        if (variante.sabor) {

            valorSabor.textContent =
                variante.sabor;


            sabor.classList.remove(
                "oculto"
            );

        } else {

            valorSabor.textContent =
                "";


            sabor.classList.add(
                "oculto"
            );
        }


        /* -------------------------
           PRESENTACIONES
        ------------------------- */

        actualizarPresentaciones(
            variante
        );
    }


    /* =====================================================
       CREAR OPCIONES DE VARIANTE
    ===================================================== */

    if (
        variantes.length > 1
    ) {

        const sabores =
            variantes
                .map(
                    (item) =>
                        item.sabor
                )
                .filter(Boolean);


        const saboresDistintos =
            new Set(
                sabores
            );


        /*
            Si todas las variantes comparten sabor
            o no tienen sabor, el selector utiliza
            la presentación para diferenciarlas.
        */

        selectorVarianteUsaPresentacion =
            saboresDistintos.size <= 1;


        variantes.forEach(
            (variante, indice) => {

                const opcion =
                    document.createElement(
                        "option"
                    );


                opcion.value =
                    String(indice);


                const primeraPresentacion =
                    Array.isArray(
                        variante.presentaciones
                    )
                        ? variante.presentaciones[0]
                        : null;


                if (
                    saboresDistintos.size > 1 &&
                    variante.sabor
                ) {

                    opcion.textContent =
                        variante.sabor;

                } else if (
                    primeraPresentacion
                ) {

                    opcion.textContent =
                        primeraPresentacion;

                } else if (
                    variante.sabor
                ) {

                    opcion.textContent =
                        variante.sabor;

                } else {

                    opcion.textContent =
                        `Opción ${indice + 1}`;
                }


                selectorVariantes
                    .appendChild(
                        opcion
                    );
            }
        );


        contenedorSelectorVariante.append(
            etiquetaSelectorVariante,
            selectorVariantes
        );


    } else {

        contenedorSelectorVariante
            .classList
            .add(
                "oculto"
            );
    }


    /* =====================================================
       CAMBIAR VARIANTE
    ===================================================== */

    selectorVariantes.addEventListener(
        "change",
        () => {

            const indice =
                Number(
                    selectorVariantes.value
                );


            const nuevaVariante =
                variantes[indice];


            actualizarVariante(
                nuevaVariante
            );
        }
    );


    /* =====================================================
       ENSAMBLAR TARJETA
    ===================================================== */

    tarjeta.append(
        origen,
        contenedorImagen,
        nombre,
        contenedorSelectorVariante,
        informacion,
        bloqueCaracteristicas,
        botonConsultar
    );


    /* =====================================================
       ESTADO INICIAL
    ===================================================== */

    actualizarVariante(
        varianteActual
    );


    return tarjeta;
}
/* =========================================================
   14. RENDERIZAR PRODUCTOS
========================================================= */

function renderizarProductos(
    listaProductos
) {

    if (!grillaProductos) {

        console.error(
            "No se encontró #grilla-productos."
        );

        return;
    }


    grillaProductos.innerHTML = "";


    limpiarEstadoProductos();


    /*
        SIN RESULTADOS
    */

    if (
        listaProductos.length === 0
    ) {

        if (estadoProductos) {

            estadoProductos.textContent =
                "No encontramos productos en esta categoría.";


            estadoProductos.classList.remove(
                "oculto"
            );
        }


        return;
    }


    /*
        RENDERIZADO
    */

    const fragmento =
        document.createDocumentFragment();


    listaProductos.forEach(
        (producto) => {

            fragmento.appendChild(
                crearTarjetaProducto(
                    producto
                )
            );
        }
    );


    grillaProductos.appendChild(
        fragmento
    );
}


/* =========================================================
   15. MOSTRAR UNA CATEGORÍA
========================================================= */

async function mostrarCategoria(
    categoriaId
) {

    const categoria =
        obtenerCategoriaPorId(
            categoriaId
        );


    /*
        Si alguien modifica manualmente la URL
        con una categoría inexistente,
        regresamos al listado.
    */

    if (!categoria) {

        console.warn(
            `Categoría inexistente: ${categoriaId}`
        );


        history.replaceState(
            {
                vista: "catalogo"
            },
            "",
            crearUrlCategorias()
        );


        mostrarVistaCategorias();


        return;
    }


    /*
        MOSTRAR VISTA
    */

    mostrarVistaProductos();

    if (buscadorCategoria) {

        buscadorCategoria.value = "";
    }


    if (botonLimpiarBuscadorCategoria) {

        botonLimpiarBuscadorCategoria
            .classList
            .add("oculto");
    }

    /*
        CABECERA
    */

    if (
        tituloCategoriaProductos
    ) {

        tituloCategoriaProductos
            .textContent =
            categoria.nombre;
    }


    if (cantidadProductos) {

        cantidadProductos.textContent =
            "Cargando productos...";
    }


    if (grillaProductos) {

        grillaProductos.innerHTML =
            "";
    }


    limpiarEstadoProductos();


    /*
        CARGAR Y FILTRAR
    */

    try {

        await cargarProductos();


        const productosFiltrados =
            obtenerProductosPorCategoria(
                categoria
            );

        categoriaActual = categoria;
        productosCategoriaActual = productosFiltrados;

        /**
         * Reiniciar los filtros cada vez
         * que se entra a una categoría.
         */
        origenSeleccionado = "todos";
        caracteristicasSeleccionadas = [];

        /**
         * Generar los filtros disponibles
         * para la categoría actual.
         */
        renderizarFiltrosOrigen();
        renderizarFiltrosCaracteristicas();

        /*
            CANTIDAD
        */

        if (cantidadProductos) {

            const cantidad =
                productosFiltrados.length;


            cantidadProductos.textContent =
                cantidad === 1
                    ? "1 producto"
                    : `${cantidad} productos`;
        }


        /*
            PRODUCTOS
        */

        renderizarProductos(
            productosFiltrados
        );

        enfocarProductoSeleccionado();

    } catch (error) {

        console.error(
            "No se pudo mostrar la categoría:",
            error
        );


        if (cantidadProductos) {

            cantidadProductos.textContent =
                "";
        }


        if (grillaProductos) {

            grillaProductos.innerHTML =
                "";
        }


        if (estadoProductos) {

            estadoProductos.textContent =
                "No pudimos cargar los productos. Intentá nuevamente.";


            estadoProductos.classList.remove(
                "oculto"
            );
        }
    }
}


/* =========================================================
   16. RESOLVER LA URL ACTUAL
========================================================= */

function resolverRutaActual() {

    const parametros =
        new URLSearchParams(
            window.location.search
        );


    const vista =
        parametros.get("vista");


    const categoriaId =
        parametros.get("categoria");


    switch (vista) {

        /*
            /?vista=catalogo
        */

        case "catalogo":

            mostrarVistaCategorias();

            break;


        /*
            /?vista=productos&categoria=almacen
        */

        case "productos":

            if (categoriaId) {

                mostrarCategoria(
                    categoriaId
                );

            } else {

                history.replaceState(
                    {
                        vista: "catalogo"
                    },
                    "",
                    crearUrlCategorias()
                );


                mostrarVistaCategorias();
            }

            break;


        /*
            /
        */

        default:

            mostrarInicio();

            break;
    }
}


/* =========================================================
   17. EVENTOS DE NAVEGACIÓN
========================================================= */

function configurarNavegacion() {

    /*
        PORTADA → CATÁLOGO
    */

    if (botonVerCatalogo) {

        botonVerCatalogo
            .addEventListener(
                "click",
                irACategorias
            );

    } else {

        console.error(
            "No se encontró #boton-ver-catalogo."
        );
    }


    /*
        CATEGORÍAS → INICIO
    */

    if (botonVolverInicio) {

        botonVolverInicio
            .addEventListener(
                "click",
                volverAInicio
            );
    }


    /*
        PRODUCTOS → CATEGORÍAS
    */

    if (botonVolverCategorias) {

        botonVolverCategorias
            .addEventListener(
                "click",
                volverACategorias
            );

    } else {

        console.warn(
            "No se encontró #volver-categorias."
        );
    }

    /*
        BUSCADOR GENERAL
    */

    if (buscadorProductos) {

        buscadorProductos.addEventListener(
            "input",
            async (evento) => {

                const termino =
                    evento.target.value;

                if (!termino.trim()) {

                    if (sugerenciasBuscador) {

                        sugerenciasBuscador.innerHTML =
                            "";

                        sugerenciasBuscador.classList.add(
                            "oculto"
                        );
                    }

                    return;
                }

                const resultados =
                    await buscarProductos(
                        termino
                    );

                mostrarSugerenciasBusqueda(
                    resultados
                );
            }
        );

    }

    /*
    BUSCADOR INTERNO DE LA CATEGORÍA
*/

    if (buscadorCategoria) {

        buscadorCategoria.addEventListener(
            "input",
            (evento) => {

                const termino =
                    evento.target.value;


                /*
                    Mostrar u ocultar
                    botón para limpiar.
                */

                if (
                    botonLimpiarBuscadorCategoria
                ) {

                    botonLimpiarBuscadorCategoria
                        .classList
                        .toggle(
                            "oculto",
                            !termino.trim()
                        );
                }


                /*
                    Aplicar búsqueda + origen.
                */

                aplicarFiltrosCategoria();
            }
        );
    }
    if (botonLimpiarFiltrosCategoria) {

        botonLimpiarFiltrosCategoria
            .addEventListener(
                "click",
                () => {

                    /**
                     * Limpiar búsqueda.
                     */
                    if (buscadorCategoria) {
                        buscadorCategoria.value = "";
                    }


                    /**
                     * Ocultar la X del buscador.
                     */
                    if (
                        botonLimpiarBuscadorCategoria
                    ) {
                        botonLimpiarBuscadorCategoria
                            .classList
                            .add(
                                "oculto"
                            );
                    }


                    /**
                     * Reiniciar origen.
                     */
                    origenSeleccionado =
                        "todos";


                    /**
                     * Reiniciar características.
                     */
                    caracteristicasSeleccionadas =
                        [];


                    /**
                     * Restaurar visualmente
                     * los botones de origen.
                     */
                    if (filtrosOrigen) {

                        filtrosOrigen
                            .querySelectorAll(
                                ".filtro-origen"
                            )
                            .forEach(
                                (boton) => {

                                    boton.classList.toggle(
                                        "activo",
                                        boton.dataset.origen ===
                                        "todos"
                                    );
                                }
                            );
                    }


                    /**
                     * Desactivar visualmente
                     * todas las características.
                     */
                    if (filtrosCaracteristicas) {

                        filtrosCaracteristicas
                            .querySelectorAll(
                                ".filtro-caracteristica"
                            )
                            .forEach(
                                (boton) => {

                                    boton.classList.remove(
                                        "activo"
                                    );
                                }
                            );
                    }


                    /**
                     * Volver a aplicar el estado
                     * inicial de la categoría.
                     */
                    aplicarFiltrosCategoria();
                }
            );
    }

    /*
    LIMPIAR BUSCADOR DE LA CATEGORÍA
*/

    if (botonLimpiarBuscadorCategoria) {

        botonLimpiarBuscadorCategoria
            .addEventListener(
                "click",
                () => {

                    if (!buscadorCategoria) {
                        return;
                    }


                    /**
                     * Limpiar solamente el texto
                     * del buscador.
                     */
                    buscadorCategoria.value = "";


                    /**
                     * Ocultar la X.
                     */
                    botonLimpiarBuscadorCategoria
                        .classList
                        .add(
                            "oculto"
                        );


                    /**
                     * Volver a calcular los productos
                     * respetando Origen y Características.
                     */
                    aplicarFiltrosCategoria();


                    /**
                     * Devolver el foco al buscador.
                     */
                    buscadorCategoria.focus();
                }
            );
    }
    /*
        BOTONES NATIVOS ATRÁS / ADELANTE
    */

    window.addEventListener(
        "popstate",
        resolverRutaActual
    );
}


/* =========================================================
   18. AÑO DEL PIE DE PÁGINA
========================================================= */

function establecerAnioActual() {

    if (!anioActual) {

        return;
    }


    anioActual.textContent =
        new Date().getFullYear();
}


/* =========================================================
   19. INICIALIZAR APLICACIÓN
========================================================= */

function iniciarAplicacion() {

    /*
        1. Crear categorías
    */

    mostrarCategorias();


    /*
        2. Pie de página
    */

    establecerAnioActual();


    /*
        3. Eventos
    */

    configurarNavegacion();


    /*
        4. Interpretar URL actual
    */

    resolverRutaActual();
}


/* =========================================================
   20. ARRANQUE
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    iniciarAplicacion
);