import { NextFunction, Request, Response, Router } from 'express';
import { EnumBill } from '~/contant/status.bill';
import {
     deletedBill,
     getByID,
     getByStatus,
     updateStatus,
} from '~/controller/bill/online';
import { Result } from '~/result';

export const router: Router = Router();

router.get('/', async (req: Request, _: Response, next: NextFunction) => {
     const status = req.query.status as EnumBill;
     const result: Result = await getByStatus(status);
     next(result);
});

router.get('/id', async (req: Request, _: Response, next: NextFunction) => {
     const id = req.query.idBill as string;
     const result: Result = await getByID(id);
     next(result);
});

router.post('/', async (req: Request, _: Response, next: NextFunction) => {
     const body = req.body as {
          idBill: string;
          status: EnumBill;
     };
     const result = await updateStatus(body);
     next(result);
});

router.delete('/', async (req: Request, _: Response, next: NextFunction) => {
     const idBill = req.body as string;
     const result = await deletedBill(idBill);
     next(result);
});
