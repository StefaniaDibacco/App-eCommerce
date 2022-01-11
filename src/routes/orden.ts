import { Router } from 'express';
import { OrdenController } from '../controllers/orden';
// import asyncHandler from 'express-async-handler';
import { checkAuthToken } from '../middleware/auth';

const router = Router();

router.get('/:orderId?', checkAuthToken, OrdenController.get);
router.post('/complete', checkAuthToken, OrdenController.complete);

export default router;
