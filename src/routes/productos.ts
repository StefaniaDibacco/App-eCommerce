import { Router } from 'express';
import { productsController } from '../controllers/productos';
import { checkAdmin } from '../middleware/admin';
import asyncHandler from 'express-async-handler';

const router = Router();

router.get('/', asyncHandler(productsController.getProducts));

router.get(
  '/:categoria',
  productsController.checkProductExists,
  asyncHandler(productsController.getProducts)
);

router.post(
  '/',
  checkAdmin,
  productsController.checkAddProducts,
  asyncHandler(productsController.addProducts)
);

router.patch(
  '/:id',
  checkAdmin,
  productsController.checkProductExists,
  asyncHandler(productsController.updateProducts)
);

router.delete(
  '/:id',
  checkAdmin,
  productsController.checkProductExists,
  asyncHandler(productsController.deleteProducts)
);

export default router;
