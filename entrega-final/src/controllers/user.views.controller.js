export const GETLoginView = (req, res) => {
    const {retry, register, updated} = req.query
    res.render('login', {retry, register, updated})
}

export const GETRegisterView = (req, res) => {
    const {error} = req.query
    res.render('register', {error})
}