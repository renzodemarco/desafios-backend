import transport from '../config/transport.config.js'
import { generateToken } from '../utils/jwt.js'

export const postRecoverPassRequest = async email => {
    try {
        const token = generateToken({email})
        const response = await transport.sendMail({
            from: 'CODERHOUSE <coderhouse@mail.com>',
            to: email,
            subject: "Recuperación de contraseña",
            text: `Haz clic en el siguiente link: http://localhost:8080/recover-password?token=${token}`
        })
        if (response) return {success: true, msg: "Correo enviado correctamente"}
    }
    catch(e) {
        return e
    }
}