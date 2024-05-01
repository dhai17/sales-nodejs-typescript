import Joi from 'joi';

export const Productschema = Joi.object({
     name: Joi.string()
          .required()
          .messages({
               'any.required': 'Họ tên không được bỏ trống',
          })
          .regex(/^[a-zA-Z0-9\s]+$/)
          .messages({
               'any.required': 'Họ tên không được chứ ký tự đặc biệt',
          }),
     price: Joi.number()
          .required()
          .messages({
               'any.required': 'Price không được bỏ trống',
          })
          .min(1000)
          .messages({
               'number.base': 'Age phải là một số.',
               'number.min': 'Age phải lớn hơn hoặc bằng 1000.',
          }),
     items: Joi.array()
          .items(
               Joi.object({
                    name: Joi.string().required(),
                    color: Joi.string()
                         .required()
                         .regex(/^#([0-9a-fA-F]{3}){1,2}$/),
                    size: Joi.string().required(),
                    design: Joi.string().required(),
                    quantity: Joi.number().integer().required(),
               }),
          )
          .required(),
});
export const ProductDetailSchema = Joi.object({});
