export default class CustomError {

    static createError({message, cause, name = 'Error', code = 0}) {
        const error = new Error(message, {cause})
        console.log(cause)
        error.name = name
        error.code = code
        return error
    }
}