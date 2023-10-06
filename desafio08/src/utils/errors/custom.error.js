export default class CustomError {

    static createError({message, cause, name = 'Error', code = 0}) {
        console.log(cause)
        const error = new Error(message, {cause})
        error.name = name
        error.code = code

        throw error
    }
}