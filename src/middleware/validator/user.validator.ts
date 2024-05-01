import Joi from 'joi';

const userRole = ['ADMIN', 'STAFF'];
export const UserSchema = Joi.object({
     name: Joi.string().required().messages({
          'any.required': 'Họ tên không được bỏ trống',
     }),
     email: Joi.string()
          .required()
          .messages({
               'any.required': 'Email không được bỏ trống',
          })
          .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
          .messages({
               'any.required':
                    'Email không hợp lệ. Vui lòng nhập một địa chỉ email hợp lệ.',
          }),
     password: Joi.string().required().messages({
          'any.required': 'Password không được bỏ trống',
     }),

     age: Joi.number()
          .required()
          .messages({
               'any.required': 'Age không được bỏ trống',
          })
          .min(1)
          .max(100)
          .messages({
               'number.base': 'Age phải là một số.',
               'number.min': 'Age phải lớn hơn hoặc bằng 1.',
               'number.max': 'Age phải nhỏ hơn hoặc bằng 100.',
          }),
     adress: Joi.string().required().messages({
          'any.required': 'Adress không được bỏ trống',
     }),
});
