import { formatMessages, messageApi } from '../apis/messages';
import { productsAPI } from '../apis/productos';
import { OrdenApi } from '../apis/order';
import { CartAPI } from '../apis/carts';
import { validateToken } from '../middleware/auth';
import { Tipo } from '../models/mensages/messages.interface';

export const init = (io: any) => {
  io.on('connection', (socket: any) => {
    console.log('conectado');

    socket.on('inicio-messages', async () => {
      console.log('ME LLEGO DATA inicio de messages');
      const mensajes = await messageApi.get();

      socket.emit('message-update', mensajes);
    });

    socket.on('new-message', async (data: any) => {
      const message = {
        userId: 'sistema',
        firstName: 'sistema',
        tipo: Tipo.Sistema,
        mensaje: '',
      };
      try {
        // eslint-disable-next-line no-unused-vars
        const decoded: any = validateToken(data.token);
        data.tipo = Tipo.Usuario;
        data.userId = decoded.userId;
        const formatData = formatMessages(data);
        await messageApi.save(formatData);
        message.mensaje = await getMessage(data.mensaje, decoded.userId);
      } catch (error: any) {
        message.mensaje = error.message;
      }
      io.emit('message-update', [message]);
      await messageApi.save(message);
    });
  });

  return io;
};

const getMessage = async (text: string, userId: string) => {
  let message = '';
  switch (text) {
    case 'Stock':
      message = await getStock();
      break;
    case 'Orden':
      message = await getOrder(userId);
      break;
    case 'Carrito':
      message = await getCart(userId);
      break;

    default:
      message = `
        Hola! No he podido comprender tu mensaje. Por favor ingresa una de las siguientes opciones:\n
          - Stock: Para conocer nuestro stock actual.\n
          - Orden: Para concer la información de tu última orden.\n
          - Carrito: Para conocer el estado de tu carrito.\n
      `;
      break;
  }
  return message;
};

const getStock = async () => {
  const productos = await productsAPI.getProducts();
  const message = productos.map((p) => `${p.nombre} - ${p.stock}\n `).join();
  return message;
};

const getOrder = async (userId: string) => {
  const orders = await OrdenApi.get(userId);
  let message = 'no posee Ordenes';
  if (orders.length) {
    const order = orders[orders.length - 1];
    message = `orden ID: ${order._id}), estado ${order.estado} .productos: \n`;
    order.items.map(
      (item) =>
        (message += `- Cantidad: ${item.cantidad}, Producto: ${item.productId}, Precio: $${item.precio} \n`)
    );
    message += `Total: $${order.total}`;
  }
  return message;
};

const getCart = async (userId: string) => {
  const cart = await CartAPI.getCart(userId);
  let message = '';
  if (cart.productos.length === 0) {
    message = 'carrito vacío \n';
  } else {
    message = `orden ID: ${cart._id.toString()}),  direccion: ${
      cart.direccion.calle
    } ${cart.direccion.altura}  productos: \n`;
    const productos = cart.productos.map((item) => {
      return `- Cantidad: ${
        item.cantidad
      }, Producto: ${item._id.toString()}, Precio: $${item.precio} \n`;
    });
    message += productos.join();
  }
  return message;
};
