import mongoose from 'mongoose';

const design = new mongoose.Schema({
     id: {
          type: String,
          required: true,
     },
     name: {
          type: String,
          required: false,
     },
     is_deleted: {
          type: Boolean,
          required: false,
          default: false,
     },
});
const designs = mongoose.model('Design', design);
export default designs;
