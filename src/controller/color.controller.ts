import { PipelineStage } from 'mongoose';
import { FilterQuery } from 'mongoose';
import { v1 } from 'uuid';
import { IColor } from '~/interface/models';
import { ICreateColor, IUpdateColor } from '~/interface/request/color.request';
import { Color } from '~/models';
import { success } from '~/result';

export async function getAllColor() {
     const match: FilterQuery<IColor> = {
          is_deleted: false,
     };
     const project = {
          _id: 0,
          id: 1,
          name: 1,
          is_deleted: 1,
     };
     const pipeline: PipelineStage[] = [
          { $match: match },
          { $project: project },
     ];
     const rerult = await Color.aggregate(pipeline);

     return success.ok(rerult);
}
export async function creatColor(params: ICreateColor) {
     const color = new Color({
          id: v1(),
          name: params.name,
     });
     await color.save();
     return color;
}
export async function updateColor(
     params: IUpdateColor,
): Promise<void | unknown> {
     try {
          const filter: FilterQuery<IColor> = {
               $relax: `${params.name}`,
               $Options: 'i',
          };
          const check = await Color.findOne(filter);
          if (check && check.name) {
               return {
                    mess: 'Màu sắc đã tồn tại',
               };
          } else {
               const new_updatecolor = await Color.findOneAndUpdate(
                    { name: params.name },
                    {
                         $set: {
                              name: params.name,
                         },
                    },
                    { new: true },
               );
               return success.ok(new_updatecolor);
          }
     } catch (error) {
          return error;
     }
}
export async function deleteColor(params: { ids: String[] }) {
     let id: String;
     for (id of params.ids) {
          await Color.findOneAndUpdate(
               { id: id, is_deleted: false },
               { is_deleted: true },
          );
          return success.ok({
               mess: 'delete successfuly',
          });
     }
}
