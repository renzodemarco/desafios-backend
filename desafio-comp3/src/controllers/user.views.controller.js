export const GETLoginView = (req, res) => {
    const {retry, register} = req.query
    res.render('login', {retry, register})
}

export const GETRegisterView = (req, res) => {
    const {error} = req.query
    res.render('register', {error})
}

export const GETLogout = (req, res) => {
    req.logout(err => {
        if (err) return next(err)
        res.clearCookie('accessToken')
        res.redirect('/')
    });
}