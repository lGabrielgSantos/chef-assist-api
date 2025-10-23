import { Router } from 'express'
import { OrderController } from '../../controllers/order.controller'

const router = Router()
const controller = new OrderController()

router.get('/', controller.getAll)
router.get('/:id', controller.getById)
router.post('/', controller.create)
router.put('/:id', controller.update)
router.delete('/:id', controller.delete)

export default router
