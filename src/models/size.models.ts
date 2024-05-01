import mongoose from 'mongoose';

const size = new mongoose.Schema({
     id: {
          type: String,
          required: true,
     },
     name: {
          type: Number,
          required: false,
     },
     is_deleted: {
          type: Boolean,
          required: false,
          default: false,
     },
});
const sizes = mongoose.model('Size', size);
export default sizes;
