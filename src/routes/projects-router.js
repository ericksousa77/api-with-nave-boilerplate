import Router from 'koa-router'

import ProjectController from 'controllers/projects-controller'

import ProjectValidate from 'validators/projects-schema'

const router = new Router()
//mod as urls
router.get('/projects/show/:id', ProjectController.show)

router.post('/projects/create', ProjectController.create)

router.get('/projects/index', ProjectController.index)

router.delete('/projects/delete/:id', ProjectController.destroy)

router.put('/projects/update/:id', ProjectController.update)





export default router.routes()
