import asyncHandler from 'express-async-handler';
import { Router } from 'express';
import { UserController } from '../controllers/users';

const router = Router();

router.get('/:id?', asyncHandler(UserController.getUsers));

router.post(
  '/singup',
  UserController.validateUserInput,
  asyncHandler(UserController.addUser)
);

router.put('/:id', asyncHandler(UserController.updateUser));

router.delete('/:id', asyncHandler(UserController.deleteUser));

export default router;
