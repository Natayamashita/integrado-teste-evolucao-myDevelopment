import db from '../db/index.js'
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    email: {
      type: String,
      unique: true,
      required: true
    }
});

const UserModel = db.model('users', userSchema);

export default UserModel
  