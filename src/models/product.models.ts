import { required } from 'joi';
import mongoose from 'mongoose';
import { v1 } from 'uuid';
import { IProduct } from '~/interface/models';

const product = new mongoose.Schema({
     id: {
          type: String,
          required: true,
     },
     name: {
          type: String,
          required: false,
     },
     price: {
          type: Number,
          required: false,
     },

     is_deleted: {
          type: Boolean,
          required: false,
          default: false,
     },
     product_details: [
          {
               id: {
                    type: String,
                    required: true,
                    default: v1(),
               },
               name: {
                    type: String,
                    required: false,
               },
               color: {
                    type: String,
                    required: false,
               },
               size: {
                    type: String,
                    required: false,
               },
               design: {
                    type: String,
                    required: false,
               },
               quantity: {
                    type: Number,
                    required: false,
               },
               colerCode: {
                    type: String,
                    required: false,
               },
          },
     ],
});

const products = mongoose.model<IProduct>('Products', product);
export default products;
