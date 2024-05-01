import { LoginReq } from '~/interface/request/auth.body';
import bcrypt from 'bcrypt';
import { Users } from '~/models';
import { genAccessToken, genRefreshToken } from '~/token';
import { error, success } from '~/result';

export async function login(params: LoginReq) {
     const user = await Users.findOne({ email: params.email });
     if (user) {
          const check = bcrypt.compareSync(
               params.password.toString(),
               user.password,
          );

          if (check) {
               const { id, name, email, roles } = user;
               const payload = { id, name, email, roles };
               const token = genAccessToken(payload);
               const refreshToken = await genRefreshToken(id);

               return success.ok({
                    ...user,
                    accessToken: token.token,
                    refreshToken: refreshToken.token,
               });
          }
     } else {
          return error.notFound({});
     }
}
