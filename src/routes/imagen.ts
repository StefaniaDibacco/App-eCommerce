import asyncHandler from 'express-async-handler';
import { Router } from 'express';
import { ImagenController } from '../controllers/imagen';
import { checkAuthToken } from '../middleware/auth';

const router = Router();

router.post('/upload', checkAuthToken, asyncHandler(ImagenController.upload));
router.get('/:id', asyncHandler(ImagenController.getImagen));
router.delete('/:id', asyncHandler(ImagenController.deleteImagen));

export default router;
