import { EnumBill } from '~/contant/status.bill';

export interface ITimeLine {
     id: string;
     status?: EnumBill;
     idBill?: string;
     createDate?: Date;
     updatedDate?: Date;
     operation?: string;
}
