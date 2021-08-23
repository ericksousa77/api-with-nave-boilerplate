import Joi from '@hapi/joi'

import { validationMiddleware } from 'middlewares'

const VALID_SORT_OPTIONS = ['name', 'created_at']

const VALID_ORDER_BY_OPTIONS = ['asc', 'desc', 'ASC', 'DESC']

const ProjectsValidate = {
  index: () =>
    validationMiddleware({
      query: {
        name: Joi.string().required(),
        projectnaver: Joi.array().items(
          Joi.object({
            naver_id: Joi.string()
          })
        ),
      }
    }),

  create: () =>
    validationMiddleware({
      body: {
        name: Joi.string().required(),
        projectnaver: Joi.array().items(
          Joi.object({
            naver_id: Joi.string()
          })
        ),
      }
    }),

  update: () =>
    validationMiddleware({
      body: {
        name: Joi.string().required(),
        projectnaver: Joi.array().items(
          Joi.object({
            naver_id: Joi.string(),
            id: Joi.string()
          })
        ),
      }
    }),
}

export default ProjectsValidate
