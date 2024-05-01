export interface IProduct {
     id: string;
     name?: string;
     price: number;
     is_deleted?: boolean;
     product_details: IProductDetail[];
}

export interface IProductDetail {
     id: string;

     name?: string;

     color: string;

     size: string;

     design: string;

     quantity: number;

     colerCode?: string; // Có thể bạn muốn sửa thành "colorCode"
}
