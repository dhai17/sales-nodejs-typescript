import { NextFunction, Request, Response, Router } from 'express';
import {
     addToCart,
     deleteCartDatails,
     updateCartDatails,
} from '~/controller/order/sale.controller';
import {
     CreateCartDetailsBody,
     IUpdateCart,
} from '~/interface/request/cart.request';

export const router: Router = Router();

router.post('/', async (req: Request, _: Response, next: NextFunction) => {
     const body = req.body as CreateCartDetailsBody;
     const result = await addToCart(body);
     next(result);
});

router.put('/', async (req: Request, _: Response, next: NextFunction) => {
     const body = req.body as IUpdateCart;
     const rerult = await updateCartDatails(body);
     next(rerult);
});

router.delete('/', async (req: Request, _: Response, next: NextFunction) => {
     const body = req.body as { ids: string[] };
     const rerult = await deleteCartDatails(body);
     next(rerult);
});
