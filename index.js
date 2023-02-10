// al añadir esta linea al package.json  "type":"module",

// ya no tengo que poner const express = require('express')

// si no que puedo usar el import normal de jscript


import express from "express"
import dontenv from 'dotenv'
import conectarDB from "./config/db.js";
import userRoutes from './routes/userRoutes.js'

const app = express();

dontenv.config()

app.use( express.json())


app.use('/api/users', userRoutes )


// base de datos
conectarDB()

const PORT= process.env.PORT || 4000

app.listen(PORT,()=>{
    console.log(`Servidor online en http://localhost:${PORT}`)
})
