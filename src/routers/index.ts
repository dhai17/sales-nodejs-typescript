import { Router } from 'express';
import { router as UserRouter } from './user.router';
import { router as productRouter } from './product.routers';
import { router as colorRouter } from './color.router';
import { router as sizeRouter } from './size.router';
import { router as designsRouter } from './designs.router';
import { router as discountRouter } from './discount.router';
import { router as AuthRouter } from './auth.router';
import { router as cartRouter } from './cart/cart.router';
import { router as billOnlineRouter } from './bills/online/billOnline';

import { configsApp } from '~/configs';

export const router: Router = Router();

router.use(`${configsApp.app.prefix}/user`, UserRouter);
router.use(`${configsApp.app.prefix}/product`, productRouter);
router.use(`${configsApp.app.prefix}/color`, colorRouter);
router.use(`${configsApp.app.prefix}/size`, sizeRouter);
router.use(`${configsApp.app.prefix}/designs`, designsRouter);
router.use(`${configsApp.app.prefix}/discount`, discountRouter);
router.use(`${configsApp.app.prefix}/auth`, AuthRouter);
router.use(`${configsApp.app.prefix}/cart`, cartRouter);
router.use(`${configsApp.app.prefix}/billOnline`, billOnlineRouter);
