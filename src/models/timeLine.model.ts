import mongoose from 'mongoose';
import { v1 } from 'uuid';
import { EnumBill } from '~/contant/status.bill';
import { IBill } from '~/interface/models';
import { ITimeLine } from '~/interface/models/timeLine';

export const timeLines = new mongoose.Schema({
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

     idBill: {
          type: String,
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

     operation: {
          type: String,
          required: false,
     },
});

const timeLineModel = mongoose.model<ITimeLine>('TimeLine', timeLines);
export default timeLineModel;
