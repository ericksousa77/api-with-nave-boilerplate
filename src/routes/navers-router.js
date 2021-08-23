import Router from 'koa-router'

import NaverController from 'controllers/navers-controller'
import NaversValidate from 'validators/navers-schema'

const router = new Router()

router.get('/navers/show/:id', NaverController.show)
router.post('/navers/create', NaversValidate.create(), NaverController.create)

router.get('/navers/index', NaverController.index)

router.delete('/navers/delete/:id', NaverController.destroy)

router.put('/navers/update/:id', NaverController.update)




export default router.routes()
