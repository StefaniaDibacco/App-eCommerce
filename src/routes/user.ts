import { Router } from 'express';
import { UserController } from '../controllers/users';
import { checkAuthToken } from '../middleware/auth';
import { checkAdmin } from '../middleware/admin';

const router = Router();

router.get('/:id?', checkAuthToken, UserController.getUsers);

router.post(
  '/singup',
  UserController.validateUserInput,
  UserController.addUser
);

router.put('/:id', checkAdmin, UserController.updateUser);

router.delete('/:id', checkAdmin, UserController.deleteUser);

export default router;
