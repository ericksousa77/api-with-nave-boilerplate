import Router from 'koa-router'

import users from './users-router'
import roles from './roles-router'
import navers from './navers-router'
import projects from './projects-router'

const router = new Router()
const api = new Router()


api.use(users)
api.use(roles)
api.use(navers)
api.use(projects)

router.use('/v1', api.routes())

export default router
