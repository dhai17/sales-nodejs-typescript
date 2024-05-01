import { EnumBill } from '~/contant/status.bill';
import { IBill } from '~/interface/models';
import { billModel } from '~/models';
import { success } from '~/result';

export async function getBillOffline(status: EnumBill, type: EnumBill) {
     const list: IBill[] = await billModel.find({
          status: status,
          type: EnumBill.OFFLINE,
          is_deleted: false,
     });
     return success.ok(list);
}

export async function getbillDetails(idBill: string) {
     const bill = await billModel.findOne({
          id: idBill,
     });
     return success.ok(bill);
}
