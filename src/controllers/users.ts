// import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import { UserAPI } from '../apis/users';
import { userJoiSchema } from '../models/users/users.interface';

class User {
  async validateUserInput(req: Request, res: Response, next: NextFunction) {
    try {
      await userJoiSchema.validateAsync(req.body);

      const { email, password, password2 } = req.body;
      if (password !== password2)
        return res.status(400).json({ msg: 'invalid Password' });

      const user = await UserAPI.query(email);
      if (!user) next();
      else return res.status(400).json({ msg: 'invalid Email' });
    } catch (err) {
      if (err instanceof Error)
        return res.status(400).json({ msg: err.message });
    }
  }

  async getUsers(req: Request, res: Response) {
    const data = await UserAPI.getUsers(req.params.id);

    return res.json({ msg: 'GET USERS', data });
  }

  async addUser(req: Request, res: Response) {
    const newItem = await UserAPI.addUser(req.body);
    return res.status(201).json({ msg: 'ADD USER', newItem });
  }

  async updateUser(req: Request, res: Response) {
    return res.json({ msg: 'UPDATE USER' });
  }

  async deleteUser(req: Request, res: Response) {
    await UserAPI.deleteUser(req.params.id);
    return res.json({ msg: 'DELETE USER' });
  }
}

export const UserController = new User();
