import mongoose from 'mongoose';

const color = new mongoose.Schema({
     id: {
          type: String,
          required: true,
     },
     name: {
          type: String,
          required: false,
     },

     colorCode: {
          type: String,
          required: false,
     },
     is_deleted: {
          type: Boolean,
          required: false,
          default: false,
     },
});

const colors = mongoose.model('Color', color);
export default colors;
