import Router from 'koa-router'
import koaBody from 'koa-body';


import NaverController from 'controllers/navers-controller'

const router = new Router()


router.post('/navers/create', NaverController.create)



export default router.routes()
