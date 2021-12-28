# App-eCommerce
Aplicacion eCommerce, del curso de Backend de CoderHouse

Expectativas.

Base de Datos - Colecciones
Images

Cada documento va a representar una imagen guardada en la Base de datos
 
Usuarios
Cada documento va a representar un Usuario de la DB. Como minino, debera contener los siguientes campos
⦁	nombre completo del cliente
⦁	telefono
⦁	email
⦁	campo de password
⦁	admin (true/false)

Productos
Cada documento va a representar un Producto de la DB. Como minimo debera contener los siguientes campso
⦁	Nombre
⦁	Descripcion
⦁	Categoria
⦁	Precio 
⦁	Stock Disponible
⦁	Fotos

Donde Foto sera un Array con los Ids de los documentos imágenes

Carritos
Cada documento va a representar un carrito de la DB. Los campos que tendrá son los siguientes

⦁	UserId: Referencia al ObjectId del usuario. Debe ser único este campo. Es decir, solo puede existir un carrito por usuario
⦁	Productos: Array de objetos que contendrá la siguiente información
⦁	ObjectId del producto
⦁	Cantidad solicitada
⦁	TimeStamps correspondiente (Fecha de creación, fecha de update)
⦁	Dirección de Entrega: Objeto que tendrá la siguiente información
⦁	Calle (required)
⦁	Altura (required)
⦁	Codigo Postal (required)
⦁	Piso (opcional)
⦁	Departamento (opcional)

Ordenes
Cada documento va a representar una orden generada en DB. Los campos seran los siguientes
⦁	OrderId : Id autogenerado por la DB
⦁	UserId: Referencia al ObjectId del usuario.
⦁	Items: Array de objetos donde cada objeto estara compuesto por
⦁	Id del Producto
⦁	Cantidad del producto
⦁	Precio del producto
⦁	Timestamp para ver fecha de creacion
⦁	estado (por default en generado): 
⦁	4 opciones solamente (Generado, Pagado, Enviando, Finalizado)
⦁	total de la orden

Mensajes
Cada documento va a representar un mensaje que se envio en el canal de chat creado para el proyecto. Los campos van a ser los siguientes
⦁	UserId: Referencia al objectId del usuario involucrado
⦁	Tipo: solo dos opciones. 
⦁	Usuario: Para los mensajes que recibimos del cliente
⦁	Sistema: Para los mensajes que envia el server
⦁	Mensaje
Endpoints
Login y SignUp
A) POST api/user/signup
Descripción: Permite crear un nuevo usuario

Parámetros:
⦁	nombre completo del cliente, 
⦁	telefono (1168796652)
⦁	email
⦁	campo de password
⦁	campo de password Repetido
⦁	admin (true/false)
⦁	Datos de la direccion de entrega
⦁	Calle (required)
⦁	Altura (required)
⦁	Codigo Postal (required)
⦁	Piso (opcional)
⦁	Departamento (opcional)

Validaciones:
⦁	Si los dos campos de password no coinciden, responder con un 400 Bad Request e indicar en la respuesta cual fue el error
⦁	Si los formatos de los campos no son validos, responder con un 400 Bad Request e indicar en la respuesta cual fue el error. 
⦁	El unico campo que no es obligatorio, es el campo de admin. En caso de no enviarse dicho campo, se seteara por default en FALSE.

Expectativa de la función:
⦁	Guardar usuario en la colección Users en MongoDB
⦁	Encriptar la contraseña del usuarioç
⦁	Crear un documento Carrito para el usuario nuevo con los datos de la direccion de entrega
⦁	Devolver al usuario un codigo 201 y en la respuesta devolver los datos del usuario
B) POST api/user/login
Descripción: Permite obtener un token para acceder a las rutas segurizadas.

Parámetros:
⦁	email
⦁	campo de password

Expectativa de la función:
⦁	Si el usuario existe en la base de datos y la contraseña ingresada es la correcta, responder con un token cuyo tiempo de vida sea configurable por una variable de entorno llamada TOKEN_KEEP_ALIVE
⦁	Si el usuario no existe , devolver una respuesta 401 UnAthorized.
⦁	Si el usuario existe, pero se ingresa una contraseña incorrecta , devolver una respuesta 401 UnAthorized.
⦁	La Secret Key con la cual se genera el token se obtiene de una variable de entorno llamada JWT_SECRET_KEY

Images
A) POST api/image/upload

Descripción: Permite subir una imagen para un producto determinado

Seguridad:
⦁	Hay que pasarle un token de seguridad en el header bajo la estrategia Bearer Token
⦁	Solo un usuario admin puede subir la foto

Parámetros:
⦁	ProductId: ID Del producto al que corresponde la imagen
⦁	file: Archivo de la imagen

Validaciones:
⦁	Solo un usuario con rol de administrador puede subir una imagen. Caso contrario rechazar el pedido con código 401
⦁	No se debe guardar imagen si no se especifica el productId
⦁	No se debe guardar imagen si el archivo es distinto al tipo JPG o PNG

Expectativa de la función:
⦁	Guardar la imagen en la colección Images de la DB
⦁	Actualizar el Producto y agregar el id
⦁	devolver al usuario un codigo 201 y en la respuesta devolver el url de la imagen

B) GET api/image/{id}
Descripción: Permite acceder a la imagen

Validaciones: 
⦁	Cualquier usuario puede pedir la imagen
Expectativas de la funciona
⦁	retornar la imagen pedida o devolver un codigo 404 cuando no se encuentra

C) DELETE api/image/{id}

Seguridad:
⦁	Hay que pasarle un token de seguridad en el header bajo la estrategia Bearer Token

Descripcion: Elimina la imagen pedida

Validaciones:
⦁	Solo un usuario con rol de administrador puede subir una imagen. Caso contrario rechazar la operación con codigo 401

Expectativa de la función:
⦁	Eliminar la imagen de la colección Images de la DB y retornar un 200 con un mensaje indicando que se elimino la imagen
⦁	Eliminar del producto la referencia a la imagen

https://dev.to/jahangeer/how-to-upload-and-store-images-in-mongodb-database-c3f

Productos
A) GET api/products
⦁	no necesita autenticación previa
⦁	listara los productos como un array de objetos
⦁	cada objeto contendrá toda la información referida al productos
B) GET api/products/{:category}
⦁	no necesita autenticación previa
⦁	listara los productos como un array de objetos
⦁	Si no existe ningún documento con la categoría pedida, devolver el array vacio
⦁	cada objeto contendrá toda la información referida al productos
C) POST api/products
⦁	necesita autenticacion previa de un usuario con perfiles de administrador
⦁	Validara que todos los campos (salvo el campo Fotos, que se podrá subir posteriormente) estén presentes y cumplan con las especificaciones. Crear el atributo Foto de todas formas con el array vacio. Si falla alguna validación, devolver código 400
⦁	Devolver un 201 si el guardado en mongo fue exitoso
D) PATCH api/products/{:productId}
⦁	necesita autenticacion previa de un usuario con perfiles de administrador
⦁	En funcion del campo que reciba, debera validarlo antes de realizar la modificacion. SI falla alguna validacion devolver codigo 400.

E) DELETE api/products/{:productId}
⦁	necesita autenticacion previa de un usuario con perfiles de administrador
⦁	Si el Id del producto no existe devolver 404
⦁	Tras eliminar el producto, devolvera un 200
Carritos
Seguridad:
    • Hay que pasarle a todos estos endpoints un token de seguridad en el header bajo la estrategia Bearer Token
A) GET api/cart
⦁	listara el carrito del usuario

B) POST api/cart/add
⦁	Se pasará como body el id del producto que se desea agregar y la cantidad
⦁	Si el id del producto no existe, se devolverá un error 400
⦁	Si la cantidad no es valida, se devolverá un error 400
⦁	Se devolverá como respuesta el carrito completo con el nuevo producto agregado

Extra: 
⦁	Si se desea agregar una cantidad mayor al stock que posee el producto, devolver un error 400
⦁	Una vez agregado el item al carrito, decrementar el stock del producto por la cantidad solicitada

B) POST api/cart/delete
Se pasará como body el id del producto que se desea borrar y la cantidad
Si el carrito del usuario no existe, devolver un error 400
Si el id del producto no existe, se devolverá un error 400
Si la cantidad no es valida, se devolverá un error 400
Si se ingresa una cantidad mayor a la que actualmente existe de ese producto en el carrito, se devolverá un error 400
Se devolverá como respuesta el carrito completo con el nuevo producto agregado

Extra: 

⦁	Una vez eliminado el item al carrito (parcialmente o totalmente), incrementar el stock del producto por la cantidad solicitada



C) POST api/cart/submit
⦁	No se pasara ningun dato en el body
⦁	si el carrito del usuario esta vacio se devolvera un error 400
⦁	Se generara un documento nuevo en la colección “Orders” con la informacion del usuario y el carrito actual. Luego se procedera a limpiar los items del carrito del usuario
⦁	Se debera enviar un mail al usuario que genero la orden con la informacion de la orden

Ordenes
Seguridad:
    • Hay que pasarle a todos estos endpoints un token de seguridad en el header bajo la estrategia Bearer Token

A) GET api/orders
⦁	listara las ordenes del usuario en cuestion

B) GET api/orders/{:orderId}
        ◦ listara las ordenes con el id pedido del usuario en cuestion

C) POST api/orders/complete
⦁	Se pasara en el body el id de la orden que se desea completar
⦁	Si la orden no existe, se devolvera un error 400
⦁	Si la orden no esta en estado “generada”, devolvera un error 400
⦁	Se pasara el estado de la orden a “Completada” y se enviara un mail al usuario en cuestion para notificar que la orden fue completada


WEBSOCKET

Renderizar un HTML con un motor de plantilla de los vistos en clase (Pug Por ejemplo) donde aparezcan los siguientes campos
⦁	TextField para mostrar la conversación actual entre el usuario y el server
⦁	Text Field para ingresar el token del usuario
⦁	Text field para ingresar el mensaje que podemos enviars
⦁	Boton para enviar el mensaje

cuando se apriete el botón de “Enviar” se deberá enviar una señal llamada “new-message” con la información del usuario y el mensaje ingresada en los textFields

El server realizara las siguientes acciones al recibir ese evento
⦁	Chequeará que el token pertenezca a un usuario valido. 
⦁	Si no existe el usuario respondera con un socket indicando que el usuario es incorrecto
⦁	Si el usuario es correcto, toma su mensaje y lo guarda en un nuevo documento en la colección de mensaje

La lógica de respuesta es la siguiente.

Se enviara un socket con el nombre “resp-message” y la respuesta tendrá la siguiente lógica:

A) “Stock” => Se responderá con el stock actual de todos los productos
B) “Orden” => Se responderá con los datos de la ultima orden del usuario
C) “Carrito” => Se responderá con los datos del carrito del usuario.
D) Cualquier otro mensaje se deberá responder con el siguiente mensaje:

 
La respuesta, una vez enviada va a ser guardada en DB con el tipo Sistema

codigo base: https://medium.com/today-i-learned-chai/building-a-simple-chat-application-with-node-js-and-socket-io-a7d7b38fd028
