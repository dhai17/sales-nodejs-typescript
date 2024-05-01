export type ICreatedProduct = {
     id: string;
     name: string;
     price: number;
     is_deleted?: boolean;
     items: [
          {
               color: string;
               size: string;
               design: string;
               quantity: number;
          },
     ];
};

export type IUpdateProduct = {
     id: string;
     name: string;
     price: number;
     is_deleted?: boolean;
     items: [
          {
               name: string;
               color: string;
               size: string;
               design: string;
               quantity: number;
          },
     ];
};

export type IDeleteProduct = {
     id: string;
     name: string;
     price: number;
     is_deleted?: boolean;
     items: [
          {
               name: string;
               color: string;
               size: string;
               design: string;
          },
     ];
};

export interface AddNewProductDetails {
     idProduct: string;
     items: [
          {
               color: string;
               size: string;
               design: string;
               quantity: number;
          },
     ];
}

export interface UpdatedProductDetails {
     idProduct: string;
     items: [
          {
               color: string;
               size: string;
               design: string;
               quantity: number;
          },
     ];
}
