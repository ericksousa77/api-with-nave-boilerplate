import Joi from '@hapi/joi'

import { validationMiddleware } from 'middlewares'

const VALID_SORT_OPTIONS = ['name', 'created_at']

const VALID_ORDER_BY_OPTIONS = ['asc', 'desc', 'ASC', 'DESC']

const ProjectsValidate = {
  index: () =>
    validationMiddleware({
      query: {
        page: Joi.number(),
        pageSize: Joi.number(),
        name: Joi.string().required(),
        navers: Joi.array(Joi.items(
          Joi.object({
            naver_id: Joi.string()
          })
        )),
        created_at: Joi.string(),
        sort: Joi.string().valid(...VALID_SORT_OPTIONS),
        order: Joi.string().valid(...VALID_ORDER_BY_OPTIONS)
      }
    }),

  create: () =>
    validationMiddleware({
      body: {
        name: Joi.string().required(),
        navers: Joi.array(Joi.items(
          Joi.object({
            naver_id: Joi.string()
          })
        )),
      }
    }),

  update: () =>
    validationMiddleware({
      body: {
        name: Joi.string().required(),
        navers: Joi.array(Joi.items(
          Joi.object({
            naver_id: Joi.string()
          })
        )),
      }
    }),
}

export default ProjectsValidate
