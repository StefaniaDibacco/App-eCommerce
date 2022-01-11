import { Router } from 'express';
import productsRouter from './productos';
import cartRouter from './carrito';
import userRouter from './user';
import AuthRouter from './auth';
import imagenRouter from './imagen';
import ordersRouter from './orden';

const router = Router();

router.use('/auth', AuthRouter);
router.use('/products', productsRouter);
router.use('/cart', cartRouter);
router.use('/user', userRouter);
router.use('/imagen', imagenRouter);
router.use('/orders', ordersRouter);

export default router;
