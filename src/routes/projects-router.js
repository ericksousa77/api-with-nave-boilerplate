import Router from 'koa-router'

import ProjectController from 'controllers/projects-controller'

const router = new Router()

router.get('/projects/show/:id', ProjectController.show)

router.post('/projects/create', ProjectController.create)

router.get('/projects/index', ProjectController.index)

router.delete('/projects/delete/:id', ProjectController.destroy)




export default router.routes()
