export interface IDiscount {
     id: String;
     name: String;
     start_date: Date;
     end_date: Date;
     percent: Number;
     maximum_discount: Number;
     is_deleted: boolean;
}
