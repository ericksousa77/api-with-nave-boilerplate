import Router from 'koa-router'

import NaverController from 'controllers/navers-controller'

const router = new Router()

router.get('/navers/show/:id', NaverController.show)
router.post('/navers/create', NaverController.create)

router.get('/navers/index', NaverController.index)

router.delete('/navers/delete/:id', NaverController.destroy)




export default router.routes()
