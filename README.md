# Documentación: Tienda Virtual SportyStyle

## 1. Flujo de Autenticación con Auth0
El inicio de sesión es seguro porque no gestionamos contraseñas en nuestro código. Funciona así:
* Al hacer clic en "Iniciar Sesión", el usuario es enviado a la página segura de Auth0.
* El usuario ingresa sus datos (o usa Google/GitHub) directamente en los servidores de Auth0.
* Si el ingreso es correcto, Auth0 devuelve al usuario a nuestra tienda con un permiso de acceso.
* Nuestro código detecta ese regreso, oculta el botón de login y muestra un saludo con el nombre del usuario.

## 2. Proceso de Selección de Productos y Uso de Session Storage
El carrito de compras opera localmente en el navegador:
* Cada botón de "Agregar" tiene el nombre y precio del producto guardados en el código HTML.
* Al hacer clic, el sistema captura esos datos y revisa si el producto ya está en el carrito para sumar la cantidad, o lo agrega como uno nuevo.
* Esta lista de productos se convierte a formato de texto y se guarda en la memoria del navegador llamada `Session Storage`.
* Finalmente, el sistema lee esa memoria para actualizar la pantalla, mostrando la lista de compras y el total a pagar.

## 3. Cómo se mantiene la sesión activa
Para que el carrito no se vacíe por accidente, usamos `Session Storage`, que opera bajo estas reglas:
* **Persistencia:** Si el usuario recarga la página (F5), el código vuelve a leer el `Session Storage` y restaura los productos del carrito al instante.
* **Aislamiento:** Esta memoria vive únicamente en la pestaña actual. No afecta a otras páginas y no envía datos constantemente a un servidor.
* **Limpieza de seguridad:** La sesión del carrito se destruye y la memoria queda en blanco en dos situaciones: cuando el usuario cierra la pestaña del navegador, o de forma automática justo después de confirmar la compra en el formulario.