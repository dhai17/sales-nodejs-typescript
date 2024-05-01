import { v1 } from 'uuid';
import { IProduct, IProductDetail } from '~/interface/models';
import { ICartDetail } from '~/interface/models/cart';
import {
     CreateCartDetailsBody,
     IUpdateCart,
} from '~/interface/request/cart.request';
import { Cart, product } from '~/models';
import carts from '~/models/cart.models';
import { success } from '~/result';

export async function getListCartDetail(idCart: string) {}

export async function addToCart(params: CreateCartDetailsBody) {
     const products = (await product.findOne({
          id: params.item.id_product,
     })) as IProduct;

     const prdDetails = products?.product_details.find(
          (item) =>
               item.color === params.item.id_color &&
               item.size === params.item.id_size,
     ) as IProductDetail;

     const addToCart: ICartDetail = {
          cart_details_id: v1(),
          product_detail: prdDetails.id,
          price: products.price,
          quantity: params.item.quantity,
          money: products.price * params.item.quantity,
     };

     const cart = await Cart.findOneAndUpdate(
          { cart_id: params.cart_id },
          { $push: { Cart_Details: addToCart } },
          { new: true },
     );

     return success.ok(cart);
}

export async function updateCartDatails(params: IUpdateCart) {
     const products = (await product.findOne({
          id: params.cart_details_id,
     })) as IProduct;
     const cart_detail = await carts.findOneAndUpdate(
          { id: params.cart_details_id, is_deleted: false },
          {
               $set: {
                    price: products.price,
                    quantity: params.quantity,
                    money: products.price * params.quantity,
               },
          },
          { new: true },
     );
     return success.ok(cart_detail);
}

export async function deleteCartDatails(params: { ids: string[] }) {
     let cart_id: string;
     for (cart_id of params.ids) {
          await carts.findOneAndUpdate(
               { id: cart_id, is_deleted: false },
               { $set: { is_deleted: true } },
          );
     }
     return success.ok({
          mess: 'delete successfuly',
     });
}
