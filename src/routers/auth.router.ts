import { NextFunction, Request, Response, Router } from 'express';
import { sendMailCreateUser } from '~/Mails/send.mail';
import { login } from '~/controller/auth.controller';
import { LoginReq } from '~/interface/request/auth.body';

export const router: Router = Router();


router.post('/', async (req: Request, _: Response, next: NextFunction) => {
     const body = req.body as LoginReq;
     sendMailCreateUser('gftuftyydty')
     const rerult = await login(body);
     next(rerult);
});
