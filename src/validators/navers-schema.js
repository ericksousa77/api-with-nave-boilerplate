import Joi from '@hapi/joi'

import { validationMiddleware } from 'middlewares'

const VALID_SORT_OPTIONS = ['name', 'created_at']

const VALID_ORDER_BY_OPTIONS = ['asc', 'desc', 'ASC', 'DESC']

const NaversValidate = {
  index: () =>
    validationMiddleware({
      query: {
        name: Joi.string().required(),
        birthdate: Joi.date().required(),
        admission_date: Joi.date().required(),
        job_role: Joi.string().required(),
        projects: Joi.array().items(
          Joi.object({
            project_id: Joi.string()
          })
        )
      }
    }),

  create: () =>
    validationMiddleware({
      body: {
        name: Joi.string().required(),
        birthdate: Joi.date().required(),
        admission_date: Joi.date().required(),
        job_role: Joi.string().required(),
        projects: Joi.array().items(
          Joi.object({
            project_id: Joi.string().uuid()
          })
        )
      }
    }),

  update: () =>
    validationMiddleware({
      body: {
        name: Joi.string().required(),
        birthdate: Joi.date().required(),
        admission_date: Joi.date().required(),
        job_role: Joi.string().required(),
        projects: Joi.array().items(
          Joi.object({
            project_id: Joi.string(),
            id: Joi.string()
          })
        )
      }
    })
}

export default NaversValidate
