export interface IBill {
     id: string;
     status?: number;
     type?: number;
     createDate?: Date;
     updatedDate?: Date;
     billDetails: BillDetail[];
     money?: number;
     moneyBill?: number;
     moneyShip?: number;
     is_deleted: false;
}

export interface BillDetail {
     id: string;
     productDetails: {
          id?: string;
          name?: string;
          price?: number;
          size?: string;
          color?: string;
          money?: number;
     };
}
