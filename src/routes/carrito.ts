import { Router } from 'express';
import { CartController } from '../controllers/carts';
import { isLoggedIn } from '../middleware/admin';
import asyncHandler from 'express-async-handler';

const router = Router();

router.get(
  '/listar/:id?',
  [isLoggedIn],
  asyncHandler(CartController.getCartByUser)
);

router.post('/agregar', [isLoggedIn], asyncHandler(CartController.addProduct));

router.delete(
  '/borrar/:id_carrito',
  [isLoggedIn],
  asyncHandler(CartController.deleteProduct)
);

export default router;
