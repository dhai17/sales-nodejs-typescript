import mongoose from 'mongoose';
import { ICart } from '~/interface/models/cart';

export const cart = new mongoose.Schema({
     cart_id: {
          type: String,
          required: false,
     },
     user_id: {
          type: String,
          required: false,
     },
     created_by: {
          type: String,
          required: false,
     },
     Cart_Details: [
          {
               cart_detail_id: {
                    type: String,
                    required: false,
               },
               product_details: {
                    type: String,
                    required: false,
               },
               price: {
                    type: Number,
                    required: false,
               },
               money: {
                    type: Number,
                    required: false,
               },
               quantity: {
                    type: Number,
                    required: false,
               },
               is_deleted: {
                    type: Boolean,
                    required: false,
                    default: false,
               },
          },
     ],
});

const carts = mongoose.model<ICart>('Cart', cart);
export default carts;
