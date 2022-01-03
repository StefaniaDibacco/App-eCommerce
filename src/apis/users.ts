/* eslint-disable no-unused-vars */
import { NewUserI, UserI, UserQuery } from '../models/users/users.interface';
import {
  UserFactoryDAO,
  TipoPersistencia,
} from '../models/users/users.factory';

/**
 * Con esta variable elegimos el tipo de persistencia
 */
const tipo = TipoPersistencia.LocalMongo;

class User {
  private users;

  constructor() {
    this.users = UserFactoryDAO.get(tipo);
  }

  async getUsers(id?: string): Promise<UserI[]> {
    if (id) return await this.users.get(id);

    return await this.users.get();
  }

  async addUser(userData: NewUserI): Promise<UserI> {
    const newUser = await this.users.add(userData);
    return newUser;
  }

  async updateUser(id: string, userData: NewUserI) {
    const updatedUser = await this.users.update(id, userData);
    return updatedUser;
  }

  async deleteUser(id: string) {
    await this.users.delete(id);
    // Borrar carrito tambien
  }

  async query(email?: string): Promise<UserI> {
    const query = {
      $or: [] as UserQuery[],
    };

    if (email) query.$or.push({ email });

    return await this.users.query(query);
  }

  async ValidatePassword(email: string, password: string) {
    return await this.users.validateUserPassword(email, password);
  }
}

export const UserAPI = new User();
