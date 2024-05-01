import mongoose from 'mongoose';
import { IDiscount } from '~/interface/models';

const discount = new mongoose.Schema({
     id: {
          type: String,
          required: true,
     },
     name: {
          type: String,
          required: false,
     },
     start_date: {
          type: Date,
          required: false,
     },
     end_date: {
          type: Date,
          required: false,
     },
     percent: {
          type: Number,
          required: false,
     },
     maximum_discount: {
          type: Number,
          required: false,
     },
     is_deleted: {
          type: Boolean,
          required: false,
          default: false,
     },
});
const discounts = mongoose.model<IDiscount>('discount', discount);
export default discounts;
