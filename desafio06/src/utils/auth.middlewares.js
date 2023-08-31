
export const isLogged = (req, res, next) => {
    if (req.user) return res.redirect('/products');
    next()
}

export const userAuth = (req, res, next) => {
    if (!req.user) return res.redirect('/login');
    next()
}