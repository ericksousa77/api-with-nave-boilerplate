import Joi from '@hapi/joi'

import { validationMiddleware } from 'middlewares'

const VALID_SORT_OPTIONS = ['name', 'created_at']

const VALID_ORDER_BY_OPTIONS = ['asc', 'desc', 'ASC', 'DESC']

const NaversValidate = {

  create: () =>
    validationMiddleware({
      body: {
        name: Joi.string().required(),
        job_role: Joi.string().min(1).max(100).required(),
        birthdate: Joi.date().required()
      }
    }),
}

export default NaversValidate
