import mongoose from 'mongoose';
import { IUser } from '~/interface/models';

const User = new mongoose.Schema({
     id: {
          type: String,
          required: true,
     },

     email: {
          type: String,
          required: false,
     },

     name: {
          type: String,
          required: false,
     },

     password: {
          type: String,
          required: false,
     },

     age: {
          type: Number,
          required: false,
     },

     adress: {
          type: String,
          required: false,
     },

     avatar: {
          type: String,
          required: false,
     },

     roles: {
          type: String,
          required: false,
     },

     is_deleted: {
          type: Boolean,
          required: false,
          default: false,
     },
});

const Users = mongoose.model<IUser>('Users', User);
export default Users;
