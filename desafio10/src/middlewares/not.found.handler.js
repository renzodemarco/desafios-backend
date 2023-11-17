export default function (req, res, next) {
    try {
        return res.status(404).json({
            message: req.method + ': ' + req.url,
            reponse: "Endpoint not found"
        })
    }
    catch(error) {
        next(error)
    }
}