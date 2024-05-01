import { Payload } from '~/request';
import jsonwebtoken, { SignOptions, VerifyOptions } from 'jsonwebtoken';
import { configsApp } from '~/configs';

export function genAccessToken(payload: Omit<Payload, 'type'>): {
     token: string;
     expireAt: number;
} {
     const timestampInSec = new Date().getTime() / 1000;
     const expireAt = Math.floor(timestampInSec + 3600);

     const singoptions: SignOptions = {
          expiresIn: '1h',
          algorithm: 'RS256',
     };

     const token = jsonwebtoken.sign(
          { ...payload, type: 'ACCESS_TOKEN' },
          configsApp.keys.private_key,
          singoptions,
     );

     return { token, expireAt };
}

export async function genRefreshToken(
     id: string,
): Promise<{ token: string; expireAt: number }> {
     const timestampInSec = new Date().getTime() / 1000;
     const expireAt = Math.floor(timestampInSec + 60 * 60);

     const singoptions: SignOptions = {
          expiresIn: '24h',
          algorithm: 'RS256',
     };

     const token = jsonwebtoken.sign(
          { id, type: 'REFRESH_TOKEN' },
          configsApp.keys.private_key,
          singoptions,
     );

     return { token, expireAt };
}

export function getPayload(token: string): Payload | Error {
     const verifyOptions = {
          algorithm: 'RS256',
     } as VerifyOptions;
     
     try {
          const publicKey = configsApp.keys.public_key;
          const payload = <Payload>(
               jsonwebtoken.verify(token, publicKey, verifyOptions)
          );
          return payload;
     } catch (error) {
          return error as Error;
     }
}
