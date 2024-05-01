import { IProductDetail } from './product';

export interface ICart {
     cart_id?: string;
     user_id?: string;
     created_by?: string;
     Cart_Details?: ICartDetail[];
}

export interface ICartDetail {
     cart_details_id: string;
     product_detail: string;
     price: number;
     money: number;
     quantity: number;
}
