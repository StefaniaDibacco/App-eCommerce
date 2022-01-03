import { Router } from 'express';
import { OrdenController } from '../controllers/orden';
import asyncHandler from 'express-async-handler';
import { checkAuthToken } from '../middleware/auth';

const router = Router();

router.get('/:orderId?', checkAuthToken, asyncHandler(OrdenController.get));
router.post('/', checkAuthToken, asyncHandler(OrdenController.complete));
