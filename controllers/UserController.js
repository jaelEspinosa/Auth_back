
import bcrypt from 'bcryptjs'
import generarJWT from "../helpers/jwt.js"
import generarId from "../helpers/generarId.js"
import User from "../models/UserModel.js"


const register = async ( req, res )=>{

   const { email, password } = req.body 
   let user = await User.findOne({ email })

   // prevenir un usuario registrado

   if( user ){
       return res.status(401).json({ msg: 'Este usuario ya existe'})
   };

   try {

    // guardar un nuevo Veterinario

    user = new User( req.body )

    // hashear password, asi lo puse, pero se puede hacer en el model. (ver en VeterinarioModel.js)
    // const salt = bcrypt.genSaltSync()
    // veterinario.password = bcrypt.hashSync(password, salt)
    
    const userGuardado = await user.save()
    return res.status(200).json({ msg:'usuario Guardado', userGuardado })

  
    } catch (error) {
        console.log(error)
        res.status(400).json({msg:error.message})
    }
  
  
    
 }

const perfil = async ( req, res )=>{

    try {    
      return res.status(200).json( {perfil: req.user })
    } catch (error) {
      console.log(error) 
      return res.status(500).json({msg: error.message})
    }

    
 } 



const confirmar = async ( req, res ) =>{

    const { token } = req.params
    const usuarioAConfirmar = await User.findOne({ token })
    
    if (!usuarioAConfirmar) {
        const error= new Error('usuario no encontrado')
        return res.status(404).json({ msg: error.message})
    }

    try {
        usuarioAConfirmar.token = null;
        usuarioAConfirmar.confirmado = true;
        await usuarioAConfirmar.save()
        return res.status(200).json({msg: 'Usuario confirmado con éxito'})
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg: 'Ha ocurrido un error, por favor hable con el administrador'})
    }

    
    
}
const autenticar = async (req, res) =>{

    const { email, password } = req.body
    
    try {
        // comprobar si existe el usuario 

        const user = await User.findOne({ email })
        if (!user) {
            const error= new Error('Este usuario no existe')
            return res.status(404).json({ msg: error.message})
            }

        // comprobar si esta confirmado el usuario

        if (!user.confirmado) {
            const error = new Error('Cuenta no confirmada, revise su bandeja de entrada.')
            return res.status(401).json({msg: error.message})        
            }

        // Revisar password de dos maneras

        const validPassword = await bcrypt.compare( password, user.password) // aqui lo comparo directamente con bcrypt
        
        if( await user.comprobarPassword(password)){  // en este bloque if untilizo el metodo instanciado en el modelo para comprobar el pass
            console.log('password correto')
        }else{
            console.log('password incorrecto')
        }

        if(!validPassword){
            const error = new Error('Usuario o contraseña incorrectos.')
            return res.status(401).json({msg: error.message})
        }

        const token = generarJWT(user._id, user.nombre)
        
        return res.status(200).json({ok:'true', token})
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg: 'hubo un error, por favor hable con el administrador'})
    }
}
const olvidePassword = async ( req, res ) =>{
    const{ email } = req.body
   
    const existeUser = await User.findOne({ email })

    
    if( !existeUser ){
        const error = new Error('El usuario no existe')
        return res.status(404).json({msg:error.message})
    }
    try {
        existeUser.token = generarId()
        await existeUser.save()
        res.status(200).json({msg: 'Revisa tu bandeja de entrada y sigue las indicaciones'})
    } catch (error) {
        console.log(error)
    }
};


const comprobarToken = async ( req, res ) =>{

    const { token } = req.params;
    const tokenValido = await User.findOne({ token })

    if( tokenValido ) {
        // El token es válido y el usuario existe 
        res.status(200).json({msg:'Token válido y el usuario existe'})
    } else {
        const error = new Error('Token no válido')
        res.status(400).json({msg:error.message})
    }
    
};


const nuevoPassword = async ( req, res ) =>{
   const { token } = req.params
   const { password } = req.body

   const user = await User.findOne({ token })

   if( !user ) {
    const error = new Error('Hubo un error')
    return res.status(400).json({msg: error.message})
   }
   try {
       user.password = password
       user.token = null
       await user.save();
       res.status(200).json({msg:'Password modificado con éxito'})   
   } catch (error) {
    const e = new Error('Hubo un error')
    return res.status(400).json({msg: e.message})
    
   }
};

 export {
    register,
    perfil,
    confirmar,
    autenticar,
    olvidePassword,
    comprobarToken,
    nuevoPassword
 }