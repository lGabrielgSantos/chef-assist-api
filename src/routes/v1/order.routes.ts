import { Router } from 'express'
import { OrderController } from '../../controllers/order.controller'

const router = Router()
const controller = new OrderController()

router.get('/', controller.getAll.bind(controller))
router.get('/filter', controller.getAll.bind(controller))
router.get('/:id', controller.getById.bind(controller))
router.post('/', controller.create.bind(controller))
router.put('/:id', controller.update.bind(controller))
router.delete('/:id', controller.delete.bind(controller))

export default router
