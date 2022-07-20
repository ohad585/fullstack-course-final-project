import express from 'express'
const router = express.Router()
import {findUserByEmail , editUser} from "../controllers/user"
import authenticate from '../common/auth_middleware'

router.get('/:email',findUserByEmail)
router.post('/edit',editUser)


export = router