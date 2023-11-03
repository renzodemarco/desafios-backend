import { createTransport } from 'nodemailer'
import env from './env.config.js'

export default createTransport({
    service: 'gmail',
    port: 465,
    secure: true,
    auth: {
        user: env.GMAIL_MAIL,
        pass: env.GMAIL_KEY
    },
    tls: {
        rejectUnauthorized: false,
    }
})
