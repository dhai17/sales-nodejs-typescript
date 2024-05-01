import { check } from 'express-validator';
import { FilterQuery, PipelineStage } from 'mongoose';
import { v1 } from 'uuid';
import { IDesigns } from '~/interface/models';
import { ICreateDesigns } from '~/interface/request';
import designs from '~/models/design.models';

export async function getAllDesigns() {
     const match: FilterQuery<IDesigns> = {
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
     const rerult = await designs.aggregate(pipeline);
     return rerult;
}

export async function creat(params: ICreateDesigns) {
     const new_designs = new designs({
          id: v1(),
          name: params.name,
     });
     await new_designs.save();
     return new_designs;
}
