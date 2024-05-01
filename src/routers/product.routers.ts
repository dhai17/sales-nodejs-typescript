import { Router } from 'express';
import { NextFunction, Request, Response } from 'express-serve-static-core';
import {
     addNewProductDetails,
     creatProduct,
     deleteProduct,
     getAll,
     updateDetails,
     updateProduct,
} from '~/controller/product.controller';
import { UpdatedProductDetails } from '~/interface/request';
import {
     AddNewProductDetails,
     ICreatedProduct,
     IUpdateProduct,
} from '~/interface/request/product.request';

export const router: Router = Router();
router.get('/', async (req: Request, _: Response, next: NextFunction) => {
     const rerult = await getAll();
     next(rerult);
});
router.post('/', async (req: Request, _: Response, next: NextFunction) => {
     const body = req.body as ICreatedProduct;
     const rerult = await creatProduct(body);
     next(rerult);
});
router.put('/', async (req: Request, _: Response, next: NextFunction) => {
     const body = req.body as IUpdateProduct;
     const rerult = await updateProduct(body);
     next(rerult);
});

router.delete('/', async (req: Request, _: Response, next: NextFunction) => {
     const body = req.body as { ids: String[] };
     const rerult = await deleteProduct(body);
     next(rerult);
});

router.post(
     '/add-new-details',
     async (req: Request, _: Response, next: NextFunction) => {
          const body = req.body as AddNewProductDetails;
          const result = await addNewProductDetails({ ...body });
          next(result);
     },
);

router.put(
     '/update-details',
     async (req: Request, _: Response, next: NextFunction) => {
          const body = req.body as UpdatedProductDetails;

          const result = await updateDetails({ ...body });
          next(result);
     },
);
