import { FilterQuery, PipelineStage } from 'mongoose';
import { v1 } from 'uuid';
import { IDiscount } from '~/interface/models';
import {
     ICreatDiscount,
     IUpdateDiscount,
} from '~/interface/request/discount.request';
import { discount } from '~/models';
import { success } from '~/result';

export async function getAllDiscount() {
     const match: FilterQuery<IDiscount> = {
          is_deleted: false,
     };
     const project = {
          _id: 0,
          id: 1,
          name: 1,
          start_date: 1,
          end_date: 1,
          percent: 1,
          maximum_discount: 1,
          is_deleted: 1,
     };
     const pipeline: PipelineStage[] = [
          { $match: match },
          { $project: project },
     ];
     const rerult = await discount.aggregate(pipeline);
     return success.ok(rerult);
}

export async function createDiscount(
     params: ICreatDiscount,
): Promise<void | unknown> {
     try {
          const filter: FilterQuery<IDiscount> = {
               name: {
                    $regex: `^${params.name}$`,
                    $options: 'i',
               },
               is_deleted: false,
          };
          const check = await discount.findOne(filter);
          if (check && check.id && params.id) {
               return {
                    mess: 'Khuyến mãi đã tồn tại',
               };
          } else {
               const new_discount = new discount({
                    id: v1(),
                    name: params.name,
                    start_date: params.start_date,
                    end_date: params.end_date,
                    percent: params.percent,
                    maximum_discount: params.maximum_discount,
               });
               await new_discount.save();
               return new_discount;
          }
     } catch (error) {
          return error;
     }
}
export async function updateDiscount(
     params: IUpdateDiscount,
): Promise<void | unknown> {
     try {
          const filter: FilterQuery<IDiscount> = {
               name: {
                    $regex: `^${params.name}$`,
                    $options: 'i',
               },
               is_deleted: false,
          };
          const check = await discount.findOne(filter);
          if (check && check.id && params.id) {
               return {
                    mess: 'Khuyến mãi đã tồn tại',
               };
          } else {
               const update_discount = await discount.findOneAndUpdate(
                    { id: params.id, is_deleted: false },
                    {
                         $set: {
                              name: params.name,
                              start_date: params.start_date,
                              end_date: params.end_date,
                              percent: params.percent,
                              maximum_discount: params.maximum_discount,
                         },
                    },
                    { new: true },
               );
               return success.ok(update_discount);
          }
     } catch (error) {
          return error;
     }
}

export async function deleteDiscount(params: { ids: string[] }) {
     let id: string;
     for (id of params.ids) {
          await discount.findOneAndUpdate(
               { id: id, is_deleted: false },
               { $set: { is_deleted: true } },
          );
     }
     return success.ok({
          mess: 'delete successfuly',
     });
}
