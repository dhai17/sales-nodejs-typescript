export type UserBodyReq = {
     id?: string;

     email: string;

     name: string;

     password: string;

     age: number;

     adress: string;

     avatar: string;

     roles: string;

     is_deleted?: boolean;
};
