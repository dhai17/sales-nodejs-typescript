import { IProductDetail } from '../models';

export type CreateCartDetailsBody = {
     cart_id: string;

     item: {
          id_product: string;
          id_color: string;
          id_size: string;
          quantity: number;
     };
};

export type IUpdateCart = {
     cart_id: string;
     cart_details_id: string;
     id_product: string;
     price: number;
     quantity: number;
     money: number;
};
