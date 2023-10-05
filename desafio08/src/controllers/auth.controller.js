import { generateToken } from '../utils/jwt.js'

export const GETGithubCallback = (req, res) => {
    const user = req.user

    const token = generateToken({
        sub: user._id,
        user: { first_name: user.first_name, last_name: user.last_name, role: user.role }
    })

    res.cookie('accessToken', token, {
        maxAge: 1000 * (60 * 60),
        httpOnly: true
    })

    res.redirect('/products')
}