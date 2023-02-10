import jwt from 'jsonwebtoken'
import User from '../models/UserModel.js'


const checkAuth = async (req, res, next) =>{
   

    if( !req.headers.authorization || !req.headers.authorization.startsWith('Bearer') ){
        const error = new Error('Hubo un error de autenticación')
        res.status(403).json({msg: error.message})
        return next();
    }

    try {
      const token =  req.headers.authorization.split(' ')[1] 
      const { _id } = jwt.verify( token, process.env.SECRET_JWT_SEED )
      
      req.user = await User.findById({ _id }).select("-password -token -confirmado");
      console.log('lo pilla o no...',req.user)
      return next();    
        
    } catch (error) {
      return res.status(401).json({msg:'Token no válido'});
    }
 
   
     

}

export default checkAuth