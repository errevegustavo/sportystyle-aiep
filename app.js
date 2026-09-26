// ========================================// AUTH0// ========================================let auth0Client = null;const AUTH0_DOMAIN = 'dev-jzeavo6w84aamibp.us.auth0.com';const AUTH0_CLIENT_ID = 's24aie9x3UXgoYRp91ofOa7kfobXYA8V';async function configurarAuth0() {    try {        auth0Client = await auth0.createAuth0Client({            domain: AUTH0_DOMAIN,            clientId: AUTH0_CLIENT_ID,            authorizationParams: {                redirect_uri: window.location.origin            }        });        // Revisar si Auth0 está devolviendo al usuario        if (            window.location.search.includes('state=') &&            (                window.location.search.includes('code=') ||                window.location.search.includes('error=')            )        ) {            await auth0Client.handleRedirectCallback();            window.history.replaceState(                {},                document.title,                window.location.pathname            );        }        const estaAutenticado = await auth0Client.isAuthenticated();        const btnLogin = document.getElementById('btn-login');        const btnLogout = document.getElementById('btn-logout');        const msjBienvenida = document.getElementById('mensaje-bienvenida');        if (estaAutenticado) {            const usuario = await auth0Client.getUser();            msjBienvenida.textContent =                'Hola, ' + (usuario.name || usuario.email) + ' | ';            btnLogin.style.display = 'none';            btnLogout.style.display = 'inline-block';        } else {            msjBienvenida.textContent = '';            btnLogin.style.display = 'inline-block';            btnLogout.style.display = 'none';        }    } catch (error) {        console.error('Error al configurar Auth0:', error);    }}// Botón iniciar sesiónconst btnLogin = document.getElementById('btn-login');if (btnLogin) {    btnLogin.addEventListener('click', async () => {        if (!auth0Client) {            console.error('Auth0 todavía no está configurado.');            return;        }        await auth0Client.loginWithRedirect();    });}// Botón cerrar sesiónconst btnLogout = document.getElementById('btn-logout');if (btnLogout) {    btnLogout.addEventListener('click', () => {        if (!auth0Client) {            return;        }        auth0Client.logout({            logoutParams: {                returnTo: window.location.origin            }        });    });}// ========================================// CARRITO// ========================================let carrito =    JSON.parse(sessionStorage.getItem('carrito_sportystyle')) || [];const listaCarrito = document.getElementById('lista-carrito');const totalCarrito = document.getElementById('total-carrito');// Actualizar carrito en pantallafunction actualizarInterfazCarrito() {    if (!listaCarrito || !totalCarrito) {        return;    }    listaCarrito.innerHTML = '';    let total = 0;    carrito.forEach((producto) => {        const li = document.createElement('li');        li.textContent =            producto.nombre +            ' - $' +            producto.precio.toLocaleString('es-CL') +            ' (Cantidad: ' +            producto.cantidad +            ')';        listaCarrito.appendChild(li);        total += producto.precio * producto.cantidad;    });    totalCarrito.textContent =        total.toLocaleString('es-CL');}// Agregar productofunction agregarAlCarrito(nombre, precio) {    const productoExistente =        carrito.find((item) => item.nombre === nombre);    if (productoExistente) {        productoExistente.cantidad += 1;    } else {        carrito.push({            nombre: nombre,            precio: parseInt(precio, 10),            cantidad: 1        });    }    sessionStorage.setItem(        'carrito_sportystyle',        JSON.stringify(carrito)    );    actualizarInterfazCarrito();}// Botones "Agregar al carrito"const botonesAgregar =    document.querySelectorAll('.btn-agregar');botonesAgregar.forEach((boton) => {    boton.addEventListener('click', (evento) => {        const nombre =            evento.currentTarget.getAttribute('data-nombre');        const precio =            evento.currentTarget.getAttribute('data-precio');        agregarAlCarrito(nombre, precio);    });});// Mostrar carrito al cargaractualizarInterfazCarrito();// ========================================// FORMULARIO DE COMPRA// ========================================const formularioPago =    document.getElementById('formulario-pago');if (formularioPago) {    formularioPago.addEventListener('submit', (evento) => {        evento.preventDefault();        // Verificar que haya productos        if (carrito.length === 0) {            alert(                'El carrito está vacío. ' +                'Agrega productos antes de comprar.'            );            return;        }        // Obtener datos del formulario        const nombre =            document.getElementById('input-nombre').value.trim();        const direccion =            document.getElementById('input-direccion').value.trim();        const correo =            document.getElementById('input-correo').value.trim();        const telefono =            document.getElementById('input-telefono').value.trim();        // Validar teléfono        if (!/^[0-9]{8}$/.test(telefono)) {            alert(                'Ingresa un número de teléfono válido de 8 dígitos.'            );            return;        }        // Calcular total        let totalPagado = 0;        carrito.forEach((producto) => {            totalPagado +=                producto.precio * producto.cantidad;        });        // Crear detalle del pedido        let detallesPedido = '';        carrito.forEach((producto) => {            detallesPedido +=                '- ' +                producto.cantidad +                'x ' +                producto.nombre +                ' ($' +                producto.precio.toLocaleString('es-CL') +                ')\n';        });        // Mostrar confirmación        alert(            '¡Gracias por tu compra, ' +            nombre +            '!\n\n' +            'Detalles del pedido:\n' +            detallesPedido +            '\nTotal pagado: $' +            totalPagado.toLocaleString('es-CL') +            '\n\nDespacho a: ' +            direccion +            '\n\nTe enviaremos la información a: ' +            correo +            '\n\nTeléfono: +569 ' +            telefono        );        // Vaciar carrito        sessionStorage.removeItem(            'carrito_sportystyle'        );        carrito = [];        actualizarInterfazCarrito();        // Limpiar formulario        formularioPago.reset();        // Mostrar mensaje de éxito        const mensajeExito =            document.getElementById('mensaje-exito');        if (mensajeExito) {            mensajeExito.textContent =                '¡Compra realizada correctamente!';            mensajeExito.style.display = 'block';        }    });}// ========================================// INICIAR AUTH0// ========================================window.addEventListener('load', async () => {    await configurarAuth0();});// ========================================
// AUTH0
// ========================================

let auth0Client = null;

const AUTH0_DOMAIN = 'dev-jzeavo6w84aamibp.us.auth0.com';
const AUTH0_CLIENT_ID = 's24aie9x3UXgoYRp91ofOa7kfobXYA8V';

async function configurarAuth0() {
    try {
        auth0Client = await auth0.createAuth0Client({
            domain: AUTH0_DOMAIN,
            clientId: AUTH0_CLIENT_ID,
            authorizationParams: {
                redirect_uri: window.location.origin
            }
        });

        // Revisar si Auth0 está devolviendo al usuario
        if (
            window.location.search.includes('state=') &&
            (
                window.location.search.includes('code=') ||
                window.location.search.includes('error=')
            )
        ) {
            await auth0Client.handleRedirectCallback();

            window.history.replaceState(
                {},
                document.title,
                window.location.pathname
            );
        }

        const estaAutenticado = await auth0Client.isAuthenticated();

        const btnLogin = document.getElementById('btn-login');
        const btnLogout = document.getElementById('btn-logout');
        const msjBienvenida = document.getElementById('mensaje-bienvenida');

        if (estaAutenticado) {
            const usuario = await auth0Client.getUser();

            msjBienvenida.textContent =
                'Hola, ' + (usuario.name || usuario.email) + ' | ';

            btnLogin.style.display = 'none';
            btnLogout.style.display = 'inline-block';

        } else {
            msjBienvenida.textContent = '';

            btnLogin.style.display = 'inline-block';
            btnLogout.style.display = 'none';
        }

    } catch (error) {
        console.error('Error al configurar Auth0:', error);
    }
}


// Botón iniciar sesión
const btnLogin = document.getElementById('btn-login');

if (btnLogin) {
    btnLogin.addEventListener('click', async () => {

        if (!auth0Client) {
            console.error('Auth0 todavía no está configurado.');
            return;
        }

        await auth0Client.loginWithRedirect();
    });
}


// Botón cerrar sesión
const btnLogout = document.getElementById('btn-logout');

if (btnLogout) {
    btnLogout.addEventListener('click', () => {

        if (!auth0Client) {
            return;
        }

        auth0Client.logout({
            logoutParams: {
                returnTo: window.location.origin
            }
        });
    });
}


// ========================================
// CARRITO
// ========================================

let carrito =
    JSON.parse(sessionStorage.getItem('carrito_sportystyle')) || [];

const listaCarrito = document.getElementById('lista-carrito');
const totalCarrito = document.getElementById('total-carrito');


// Actualizar carrito en pantalla
function actualizarInterfazCarrito() {

    if (!listaCarrito || !totalCarrito) {
        return;
    }

    listaCarrito.innerHTML = '';

    let total = 0;

    carrito.forEach((producto) => {

        const li = document.createElement('li');

        li.textContent =
            producto.nombre +
            ' - $' +
            producto.precio.toLocaleString('es-CL') +
            ' (Cantidad: ' +
            producto.cantidad +
            ')';

        listaCarrito.appendChild(li);

        total += producto.precio * producto.cantidad;
    });

    totalCarrito.textContent =
        total.toLocaleString('es-CL');
}


// Agregar producto
function agregarAlCarrito(nombre, precio) {

    const productoExistente =
        carrito.find((item) => item.nombre === nombre);

    if (productoExistente) {

        productoExistente.cantidad += 1;

    } else {

        carrito.push({
            nombre: nombre,
            precio: parseInt(precio, 10),
            cantidad: 1
        });
    }

    sessionStorage.setItem(
        'carrito_sportystyle',
        JSON.stringify(carrito)
    );

    actualizarInterfazCarrito();
}


// Botones "Agregar al carrito"
const botonesAgregar =
    document.querySelectorAll('.btn-agregar');

botonesAgregar.forEach((boton) => {

    boton.addEventListener('click', (evento) => {

        const nombre =
            evento.currentTarget.getAttribute('data-nombre');

        const precio =
            evento.currentTarget.getAttribute('data-precio');

        agregarAlCarrito(nombre, precio);
    });
});


// Mostrar carrito al cargar
actualizarInterfazCarrito();


// ========================================
// FORMULARIO DE COMPRA
// ========================================

const formularioPago =
    document.getElementById('formulario-pago');

if (formularioPago) {

    formularioPago.addEventListener('submit', (evento) => {

        evento.preventDefault();

        // Verificar que haya productos
        if (carrito.length === 0) {

            alert(
                'El carrito está vacío. ' +
                'Cómprame algo por favor.'
            );

            return;
        }


        // Obtener datos del formulario
        const nombre =
            document.getElementById('input-nombre').value.trim();

        const direccion =
            document.getElementById('input-direccion').value.trim();

        const correo =
            document.getElementById('input-correo').value.trim();

        const telefono =
            document.getElementById('input-telefono').value.trim();


        // Validar teléfono
        if (!/^[0-9]{8}$/.test(telefono)) {

            alert(
                'Ingresa un número de teléfono válido de 8 dígitos.'
            );

            return;
        }


        // Calcular total
        let totalPagado = 0;

        carrito.forEach((producto) => {

            totalPagado +=
                producto.precio * producto.cantidad;
        });


        // Crear detalle del pedido
        let detallesPedido = '';

        carrito.forEach((producto) => {

            detallesPedido +=
                '- ' +
                producto.cantidad +
                'x ' +
                producto.nombre +
                ' ($' +
                producto.precio.toLocaleString('es-CL') +
                ')\n';
        });


        // Mostrar confirmación
        alert(
            '¡Gracias por tu compra, ' +
            nombre +
            '!\n\n' +

            'Detalles del pedido:\n' +
            detallesPedido +

            '\nTotal pagado: $' +
            totalPagado.toLocaleString('es-CL') +

            '\n\nDespacho a: ' +
            direccion +

            '\n\nTe enviaremos la información a: ' +
            correo +

            '\n\nTeléfono: +569 ' +
            telefono
        );


        // Vaciar carrito
        sessionStorage.removeItem(
            'carrito_sportystyle'
        );

        carrito = [];

        actualizarInterfazCarrito();


        // Limpiar formulario
        formularioPago.reset();


        // Mostrar mensaje de éxito
        const mensajeExito =
            document.getElementById('mensaje-exito');

        if (mensajeExito) {

            mensajeExito.textContent =
                '¡Compra realizada correctamente!';

            mensajeExito.style.display = 'block';
        }
    });
}


// ========================================
// INICIAR AUTH0
// ========================================

window.addEventListener('load', async () => {
    await configurarAuth0();
});
