import Router from 'koa-router'

import users from './users-router'
import roles from './roles-router'
import navers from './navers-router'

const router = new Router()
const api = new Router()


api.use(users)
api.use(roles)
api.use(navers)

router.use('/v1', api.routes())

export default router
