import express from 'express'
const router = express.Router()
import {findUserByEmail} from "../controllers/user"
import authenticate from '../common/auth_middleware'

router.get('/:email',findUserByEmail)


export = router