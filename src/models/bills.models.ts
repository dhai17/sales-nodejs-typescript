import mongoose from 'mongoose';
import { v1 } from 'uuid';
import { EnumBill } from '~/contant/status.bill';
import { IBill } from '~/interface/models';

export const bills = new mongoose.Schema({
     id: {
          type: String,
          required: true,
          default: v1(),
     },

     status: {
          type: String,
          require: false,
          default: EnumBill.CGH,
     },

     type: {
          type: Number,
          required: false,
          default: EnumBill.ONLINE,
     },

     createDate: {
          type: Date,
          require: false,
          default: new Date(),
     },

     updatedDate: {
          type: Date,
          require: false,
          default: new Date(),
     },
     is_deleted: {
          type: Boolean,
          required: false,
          default: false,
     },
     billDetails: [
          {
               id: {
                    type: String,
                    required: true,
                    default: v1(),
               },

               productDetails: {
                    id: {
                         type: String,
                         required: false,
                    },
                    name: {
                         type: String,
                         require: false,
                    },
                    price: {
                         type: Number,
                         required: false,
                    },
                    size: {
                         type: String,
                         require: false,
                    },
                    color: {
                         type: String,
                         require: false,
                    },
                    money: {
                         type: Number,
                         required: false,
                    },
               },
          },
     ],

     money: {
          type: Number,
          required: false,
     },

     moneyBill: {
          type: Number,
          required: false,
     },

     moneyShip: {
          type: Number,
          required: false,
     },
});

const billModel = mongoose.model<IBill>('Bill', bills);
export default billModel;
