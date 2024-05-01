import { EnumBill } from '~/contant/status.bill';
import { IBill } from '~/interface/models';
import { ITimeLine } from '~/interface/models/timeLine';
import { UpdateStatus } from '~/interface/request/bills.body';
import { billModel, timeLineModel, Users } from '~/models';
import { success } from '~/result';

export async function getByStatus(status: EnumBill) {
     const list: IBill[] = await billModel.find({ status: status });
     return success.ok(list);
}

export async function getByID(idBill: string) {
     const bill = await billModel.findOne({
          id: idBill,
     });

     const timeLine = await timeLineModel.findOne({
          idBill: bill?.id,
          status: bill?.status,
     });

     let data = {
          bill,
          timeLine,
     };

     return success.ok(data);
}

export async function updateStatus(params: {
     idBill: string;
     status: EnumBill;
}) {
     await billModel.updateOne(
          { id: params.idBill },
          { $set: { status: params.status } },
     );

     const newTimeLine: Partial<ITimeLine> = {
          status: params.status,
          idBill: params.idBill,
          operation: `Update status bill ${params.idBill} to status ${params.status}`,
     };

     await timeLineModel.create(newTimeLine);
     return success.ok('Update successfuly');
}

export async function deletedBill(idBill: string) {}
