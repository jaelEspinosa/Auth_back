import nodemailer from 'nodemailer'

export const emailRegistro = async datos =>{
    const {email, nombre, token} = datos;



    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure:true,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });
 //informacion del email
    const info = await transport.sendMail({
        from: `"${process.env.APP_NAME} - Administrador de usuarios"`,
        to: email,
        subject: `${process.env.APP_NAME} - Confirma tu cuenta`,
        text: `Confirma tu cuenta en ${process.env.APP_NAME}`,
        html: `<p>hola, ${nombre}.</p>
        <p>Tu cuenta ya está casi lista, confirmala a través del siguiente enlace</p>

        <a href = "${process.env.FRONTEND_URL}/confirmar/${token}">Confirmar Cuenta aqui</a>

        <p>Si no has creado esta cuenta puedes ignorar este email</p>
        
        `
    })

};

export const resetPassword = async datos =>{
    const {email, nombre, token} = datos;



    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure:true,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });
 //informacion del email
    const info = await transport.sendMail({
        from: `"${process.env.APP_NAME} - Administrador de usuarios"`,
        to: email,
        subject: `${process.env.APP_NAME} - Reestablece tu password`,
        text: `Reestablece tu password en ${process.env.APP_NAME}`,
        html: `<p>hola, ${nombre}, has solicitado reestabler tu password</p>
        <p>Sigue el siguiente enlace para reestablecer tu password</p>

        <a href = "${process.env.FRONTEND_URL}/olvide-password/${token}">reestablecer password</a>

        <p>Si no has solicitado el cambio, ignora este mail</p>
        
        `
    })

};