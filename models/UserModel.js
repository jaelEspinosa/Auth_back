import mongoose from "mongoose";
import generarId from "../helpers/generarId.js";
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema({
    nombre:{
        type: String,
        required: true,
        trim:true
    },
    password:{
        type: String,
        required:true,
    },
    email:{
        type: String,
        required:true,
        unique:true,
        trim:true
    },
    telefono: {
        type: String,
        default: null,
        trim:true
    },
    web:{
        type: String,
        default: null
    },
    token:{
        type: String,
        default: generarId()
    },
    confirmado: {
        type: Boolean,
        default:false,
    }
})

// middleware, que nos hashea el password justo antes de guardar.

userSchema.pre('save', async function( next ){

    if(!this.isModified("password")){ // si ya esta hasheado next()
        next()
    }

    const salt =  await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt)
})

userSchema.methods.comprobarPassword = async function ( passwordFormulario ){
    return await bcrypt.compare( passwordFormulario , this.password)
}

const User = mongoose.model('User', userSchema);
export default User