import asyncHandler from 'express-async-handler';
import { Router } from 'express';
import { UserController } from '../controllers/users';
import { checkAuthToken } from '../middleware/auth';
import { checkAdmin } from '../middleware/admin';

const router = Router();

router.get('/:id?', checkAuthToken, asyncHandler(UserController.getUsers));

router.post(
  '/singup',
  UserController.validateUserInput,
  asyncHandler(UserController.addUser)
);

router.put('/:id', checkAdmin, asyncHandler(UserController.updateUser));

router.delete('/:id', checkAdmin, asyncHandler(UserController.deleteUser));

export default router;
