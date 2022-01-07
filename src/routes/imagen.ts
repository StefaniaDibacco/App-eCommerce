// import asyncHandler from 'express-async-handler';
import { Router } from 'express';
import { ImagenController } from '../controllers/imagen';
import { checkAuthToken } from '../middleware/auth';

const router = Router();

router.post('/upload', checkAuthToken, ImagenController.upload);
router.get('/:id', ImagenController.getImagen);
router.delete('/:id', ImagenController.deleteImagen);

export default router;
