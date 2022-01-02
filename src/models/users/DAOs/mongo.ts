import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { NewUserI, UserI, UserBaseClass } from '../users.interface';
import { CartI, ProductCart, CartBaseClass } from '../../carts/cart.interface';
import Config from '../../../config';
import { EmailService } from '../../../services/email';

const usersSchema = new mongoose.Schema<UserI>({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: false,
  },
  cellphone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  admin: {
    type: Boolean,
    required: true,
  },
});

usersSchema.pre('save', async function (next) {
  const user = this;
  const hash = await bcrypt.hash(user.password, 10);

  this.password = hash;
  next();
});

export class UsuariosAtlasDAO implements UserBaseClass {
  private srv: string;
  private users;

  constructor(local: boolean = false) {
    if (local)
      this.srv = `mongodb://localhost:27017/${Config.MONGO_LOCAL_DBNAME}`;
    else this.srv = Config.MONGO_ATLAS_SRV;
    mongoose.connect(this.srv);
    console.log(this.srv, local);
    this.users = mongoose.model<UserI>('user', usersSchema);
  }

  async get(id?: string): Promise<UserI[]> {
    let output: UserI[] = [];
    try {
      if (id) {
        const document = await this.users.findById(id);
        if (document) output.push(document);
      } else {
        output = await this.users.find();
      }

      return output;
    } catch (err) {
      return output;
    }
  }

  // YA NO PIDE CREO MANDAR UN EMAL PARA NOTIFICAR USUARIO NUEVO
  async add(data: NewUserI): Promise<UserI> {
    // eslint-disable-next-line new-cap
    const newProduct = new this.users(data);
    const result: any = await newProduct.save();
    await EmailService.sendEmail(
      'stefania.dibacco@gmail.com.ar',
      'Nuevo Registro',
      JSON.stringify(result._doc)
    );
    return newProduct;
  }

  async update(id: string, data: NewUserI): Promise<UserI> {
    return this.users.findByIdAndUpdate(id, data);
  }

  async delete(id: string) {
    await this.users.findByIdAndDelete(id);
  }

  async query(query: any): Promise<UserI> {
    const result = await this.users.find(query);
    return result[0];
  }

  async validateUserPassword(
    username: string,
    password: string
  ): Promise<boolean> {
    const user = await this.users.findOne({ username });

    if (!user) return false;

    const compare = await bcrypt.compare(password, user.password);

    if (!compare) return false;
    return true;
  }
}
