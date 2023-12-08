import transport from '../config/transport.config.js'
import * as userServices from '../services/user.services.js'
import CustomError from '../utils/error.custom.js'
import dictionary from '../utils/error.dictionary.js'
import { generateToken } from '../utils/jwt.js'

export const postRecoverPassRequest = async (email) => {
    try {
        const user = userServices.getUserByEmail(email)

        if (!user) return CustomError.new(dictionary.userNotFound)

        const token = generateToken({email})

        const response = await transport.sendMail({
            from: 'CODERHOUSE <coderhouse@mail.com>',
            to: email,
            subject: "Recuperación de contraseña",
            html: `<h2>Recuperación de contraseña</h2>
            <p>Para restablecer tu contraseña, haga clic <a href="http://localhost:8080/recover-password?token=${token}">aquí</a>.</p>
        </body>`
        }) 
        if (response) return { success: true, message: "Correo enviado correctamente" }
    }
    catch(error) {
        throw error
    }
}