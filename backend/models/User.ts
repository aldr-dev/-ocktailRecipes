import mongoose, {HydratedDocument} from 'mongoose';
import bcrypt from 'bcrypt';
import {UserFields, UserMethods, UserModel} from '../types';
import {randomUUID} from 'crypto';

const SALT_WORK_FACTOR = 10;

const UserSchema = new mongoose.Schema<UserFields, UserModel, UserMethods>({
  email: {
    type: String,
    required: [true, 'Поле email обязательно!'],
    unique: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,5})+$/, 'Формат email неверный!'],
    validate: {
      validator: async function (value: string): Promise<boolean> {
        if (!(this as HydratedDocument<UserFields>).isModified('email')) {
          return true;
        }

        const user = await User.findOne({username: value});
        return !user;
      },
      message: 'Данный email уже зарегистрирован!',
    }
  },
  displayName: {
    type: String,
    required: [true, 'Поле displayName обязательно!'],
  },
  password: {
    type: String,
    required: [true, 'Поле password обязательно!'],
  },
  token: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    default: 'user',
    enum: ['user', 'admin'],
  },
  avatar: {
    type: String,
    required: [true, 'Поле avatar обязательно!'],
  },
  googleID: String,
});

UserSchema.methods.checkPassword = function (password) {
  return bcrypt.compare(password, this.password);
};

UserSchema.methods.generateToken = function () {
  this.token = randomUUID();
};

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

UserSchema.set('toJSON', {
  transform: (_doc, ret) => {
    delete ret.password;
    return ret;
  },
});

const User = mongoose.model<UserFields, UserModel>('User', UserSchema);
export default User;