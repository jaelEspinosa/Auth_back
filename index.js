// al añadir esta linea al package.json  "type":"module",

// ya no tengo que poner const express = require('express')

// si no que puedo usar el import normal de jscript


import express from "express"
import dontenv from 'dotenv'
import conectarDB from "./config/db.js";
import userRoutes from './routes/userRoutes.js'
import cors from 'cors'

const app = express();

dontenv.config()

app.use( express.json())

const dominiosPermitidos = [process.env.FRONTEND_URL]
 console.log(dominiosPermitidos.indexOf('http://localhost:5173'));
const corsOptions= {
    origin: function (origin, callback) {
        if(dominiosPermitidos.indexOf(origin) !== -1){
            // el origen es permitido
            callback(null, true)
        }else{
            callback(new Error('No permitido por CORS'))
        }
    }
}

app.use( cors( corsOptions ) )

app.use('/api/users', userRoutes )


// base de datos
conectarDB()

const PORT= process.env.PORT || 4000

app.listen(PORT,()=>{
    console.log(`Servidor online en http://localhost:${PORT}`)
})
