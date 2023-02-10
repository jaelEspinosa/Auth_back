import express from 'express'
import { autenticar, comprobarToken, confirmar, nuevoPassword, olvidePassword, perfil, register } from '../controllers/UserController.js'
import checkAuth from '../middlewere/authMiddleware.js'

const router = express.Router()

//rutas públicas
router.post('/', register)
router.post('/login', autenticar)
router.get('/confirmar/:token', confirmar)
router.post('/olvide-password', olvidePassword)
router.route('/olvide-password/:token').get(comprobarToken).post(nuevoPassword)

// pasar por validar el token
router.use(checkAuth)


// rutas protegidas

router.get('/perfil', perfil)









export default router
