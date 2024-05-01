import { FilterQuery, PipelineStage } from 'mongoose';
import { v1 } from 'uuid';
import { IUser } from '~/interface/models';
import { UserBodyReq } from '~/interface/request';
import { Cart, Users } from '~/models';
import { error, success } from '~/result';
import bcrypt from 'bcrypt';
import { ICart } from '~/interface/models/cart';
import carts from '~/models/cart.models';

export async function get() {
     const match: FilterQuery<IUser> = {
          is_deleted: false,
     };

     const project = {
          _id: 0,
          id: 1,
          email: 1,
          name: 1,
          password: 1,
          age: 1,
          roles: 1,
          adress: 1,
     };

     const pipeline: PipelineStage[] = [
          { $match: match },
          { $project: project },
     ];

     const result = await Users.aggregate(pipeline);
     return success.ok(result);
}

export async function create(params: UserBodyReq) {
     const check = await Users.findOne({
          email: params.email,
          is_deleted: false,
     });
     if (check) {
          return error.baseError({
               location: 'body',
               message: `Email ${params.email} đã tồn tại`,
          });
     } else {
          const user = new Users({
               id: v1(),
               email: params.email,
               name: params.name,
               password: await bcrypt.hash(params.password.toString(), 10),
               age: params.age,
               adress: params.adress,
               roles: params.roles,
          });

          const newCart = new Cart({
               cart_id: v1(),
               user_id: user.id,
          });
          await newCart.save();
          await user.save();
          return success.created(user);
     }
}

export async function update(params: UserBodyReq) {
     let checkmail = await Users.findOne({
          email: params.email,
     });
     const check = await Users.findOne({
          id: params.id,
          is_deleted: false,
     });
     if (checkmail) {
          return error.baseError({
               location: 'body',
               message: `Email ${params.email} đã tồn tại`,
          });
     } else if (check) {
          const update = await Users.findOneAndUpdate(
               { id: params.id, is_deleted: false },
               {
                    $set: {
                         email: params.email,
                         name: params.name,
                         password: await bcrypt.hash(
                              params.password.toString(),
                              10,
                         ),
                         age: params.age,
                         adress: params.adress,
                         roles: params.roles,
                    },
               },
               { new: true },
          );
          return success.ok(update);
     }
}

export async function deleted(params: { ids: string[] }) {
     let id: string;
     for (id of params.ids) {
          await Users.findOneAndUpdate(
               { id: id, is_deleted: false },
               { $set: { is_deleted: false } },
          );
     }

     return success.ok({
          mess: 'delete successfuly',
     });
}
