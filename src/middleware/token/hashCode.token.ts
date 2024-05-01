import { NextFunction, Request, Response } from 'express';
import { Payload } from '~/request';
import { getPayload } from '~/token';

export function hashCode(req: Request, _: Response, next: NextFunction) {
     const token = req.headers.token as string;
     const payload = getPayload(token);
     req.payload = payload as Payload;
     next();
}
