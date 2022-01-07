import { Router } from 'express';
import { CartController } from '../controllers/carts';
import { isLoggedIn } from '../middleware/admin';
// import asyncHandler from 'express-async-handler';

const router = Router();

router.get(
  '/listar/:id?',
  [isLoggedIn],
  CartController.getCartByUser
);

router.post('/agregar', [isLoggedIn], CartController.addProduct);

router.delete(
  '/borrar/:id_carrito',
  [isLoggedIn],
  CartController.deleteProduct
);

router.post('/submit', [isLoggedIn], CartController.submit);

export default router;
