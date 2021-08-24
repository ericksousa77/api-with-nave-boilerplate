import Router from 'koa-router'

import NaverController from 'controllers/navers-controller'
import NaverValidate from 'validators/navers-schema'

const router = new Router()

router.get('/navers/show/:id', NaverController.show)

router.post('/navers/create', NaverValidate.create(), NaverController.create)

router.get('/navers/index', NaverController.index)

router.delete('/navers/delete/:id', NaverController.destroy)

router.put('/navers/update/:id', NaverValidate.update(), NaverController.update)




export default router.routes()
