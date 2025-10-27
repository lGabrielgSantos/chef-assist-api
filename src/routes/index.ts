import { Router } from 'express'
import v1Routes from './v1'

const router = Router()

router.use('/v1', v1Routes)
router.get('/', (req, res) => {
  res.send('Welcome to the API');
});

export default router
