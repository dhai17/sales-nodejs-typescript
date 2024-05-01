export type ICreatDiscount = {
     id: string;
     name?: string;
     start_date?: Date;
     end_date?: Date;
     percent?: number;
     maximum_discount?: number;
     is_deleted?: boolean;
};
export type IUpdateDiscount = {
     id: string;
     name?: string;
     start_date?: Date;
     end_date?: Date;
     percent?: number;
     maximum_discount?: number;
     is_deleted?: boolean;
};
