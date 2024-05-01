import { FilterQuery, PipelineStage } from 'mongoose';
import { v1 } from 'uuid';
import { IProduct, IProductDetail } from '~/interface/models';
import { product } from '~/models';
import { error, success } from '~/result';
import {
     AddNewProductDetails,
     ICreatedProduct,
     IUpdateProduct,
     UpdatedProductDetails,
} from '~/interface/request';

export async function getAll() {
     const match: FilterQuery<IProduct> = {
          is_deleted: false,
     };
     const project = {
          _id: 0,
          id: 1,
          name: 1,
          price: 1,
          product_details: 1,
          is_deleted: 1,
     };
     const pipeline: PipelineStage[] = [
          { $match: match },
          { $project: project },
     ];
     const rerult = await product.aggregate(pipeline);
     return success.ok(rerult);
}

export async function creatProduct(
     params: ICreatedProduct,
): Promise<void | unknown> {
     try {
          const check = await product.findOne({
               name: params.name,
               is_deleted: false,
          });

          if (check) {
               return error.baseError({
                    location: 'body',
                    message: 'Sản phẩm đã tồn tại',
               });
          } else {
               const new_product = new product({
                    id: v1(),
                    name: params.name,
                    price: params.price,
                    product_details: params.items,
               });

               await new_product.save();
               return success.created(new_product);
          }
     } catch (error) {
          return error;
     }
}

export async function addNewProductDetails(params: AddNewProductDetails) {
     const pr = await product.findOne({
          id: params.idProduct,
          is_deleted: false,
     });

     let prdatails: IProductDetail[] = [];

     if (pr) {
          for (let i = 0; i < params.items.length; i++) {
               const prd = params.items[i];
               let detail = pr.product_details.find(
                    (item) =>
                         item.color === prd.color &&
                         item.size === prd.size &&
                         item.design === prd.design &&
                         item.quantity === prd.quantity,
               );

               if (detail) {
                    return error.baseError({
                         location: 'body',
                         message: `Sản phẩm đã có màu sắc: ${prd.color} kích cỡ: ${prd.size} nhà sản xuất: ${prd.design} và số lượng: ${prd.quantity} `,
                    });
               } else {
                    const new_prdetail: IProductDetail = {
                         id: v1(),
                         color: prd.color,
                         size: prd.size,
                         design: prd.design,
                         quantity: prd.quantity,
                    };

                    prdatails.push(new_prdetail);
               }
          }

          const updatePrdetail = await product.findOneAndUpdate(
               { id: params.idProduct, is_deleted: false },
               { $push: { product_datails: prdatails } },
               { new: true },
          );
          return success.ok(updatePrdetail);
     } else {
          return error.baseError({
               location: 'body',
               message: 'San pham khong ton tai',
          });
     }
}

export async function updateProduct(
     params: IUpdateProduct,
): Promise<void | unknown> {
     try {
          const filter: FilterQuery<IProduct> = {
               name: {
                    $regex: `${params.name}`,
                    $options: 'i',
               },
               is_deleted: false,
          };
          const check = await product.findOne(filter);
          if (check && check.name) {
               return {
                    mess: 'Sản Phẩm Đã Tồn Tại',
               };
          } else {
               const updates = await product.findOneAndUpdate(
                    { name: params.name, is_deleted: false }, // Điều kiện tìm kiếm
                    {
                         $set: {
                              name: params.name,
                              price: params.price,
                              product_datails: params.items,
                         },
                    },
                    { new: true }, // Tuỳ chọn
               );
               return success.ok(updates);
          }
     } catch (error) {
          return error;
     }
}
export async function deleteProduct(params: { ids: String[] }) {
     let id: String;
     for (id of params.ids) {
          await product.findOneAndDelete(
               { id: id, is_deleted: false },
               { $set: { is_deleted: true } },
          );
          return success.ok({
               mess: 'delete successfuly',
          });
     }
}

export async function updateDetails(params: UpdatedProductDetails) {
     const check = await product.findOne({
          id: params.idProduct,
          is_deleted: false,
     });
     let prdetails: IProductDetail[] = [];
     if (check) {
          for (let i = 0; i < params.items.length; i++) {
               const prd = params.items[i];
               let checkprd = check.product_details.find(
                    (items) =>
                         prd.color === items.color &&
                         prd.size === items.size &&
                         prd.design === items.design &&
                         prd.quantity === items.quantity,
               );
               if (checkprd) {
                    return error.baseError({
                         location: 'body',
                         message: `Sản phẩm không cập nhập được đã có màu sắc: ${prd.color} kích cỡ: ${prd.size} nhà sản xuất: ${prd.design} và số lượng: ${prd.quantity} `,
                    });
               } else {
                    const updatePrd = await product.findOneAndUpdate(
                         { id: params.idProduct, is_deleted: false },
                         {
                              $set: {
                                   product_datails: prdetails,
                              },
                         },
                         { new: true },
                    );
                    return success.ok(updatePrd);
               }
          }
     } else {
          return error.baseError({
               location: 'body',
               message: `Sản Phẩm đã tồn tại`,
          });
     }
}
