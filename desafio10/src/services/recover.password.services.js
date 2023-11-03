import transport from '../config/transport.config.js'
import * as userServices from '../services/user.services.js'
import { generateToken } from '../utils/jwt.js'

export const postRecoverPassRequest = async email => {
    try {
        const user = userServices.getUserByEmail(email)

        if (!user) return {error: true, msg: "Email does not exist"}

        const token = generateToken({email})

        const response = await transport.sendMail({
            from: 'CODERHOUSE <coderhouse@mail.com>',
            to: email,
            subject: "Recuperación de contraseña",
            text: `Haz clic en el siguiente link: http://localhost:8080/recover-password?token=${token}`
        })
        if (response) return {error: false, msg: "Correo enviado correctamente"}
    }
    catch(e) {
        return e
    }
}