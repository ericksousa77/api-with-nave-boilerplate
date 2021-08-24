import Router from 'koa-router'

import NaverController from 'controllers/navers-controller'
import NaverValidate from 'validators/navers-schema'

const router = new Router()

router.get('/navers/:id', NaverController.show)

router.post('/navers/create', NaverValidate.create(), NaverController.create)

router.get('/navers', NaverController.index)

router.delete('/navers/:id', NaverController.destroy)

router.put('/navers/:id', NaverValidate.update(), NaverController.update)




export default router.routes()
