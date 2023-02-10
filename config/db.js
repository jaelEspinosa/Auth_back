import mongoose from 'mongoose'


const conectarDB = async ()=>{
    try {
      mongoose.set('strictQuery', true);
      const db = await mongoose.connect(process.env.MONGO_URI,
          {
            useNewUrlParser: true,
            useUnifiedTopology: true
          } 
      )
     const url = `${db.connection.host}:${db.connection.port}`
     console.log(`DB connect: ${url}`)           
    } catch (error) {
      console.log(`error: ${error.message}`);
      process.exit(1)  
        
    }
}

export default conectarDB