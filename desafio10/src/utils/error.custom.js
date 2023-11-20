export default class CustomError {
    static new({ status, message, from }) {
        let error = new Error(message)
        error.message = message,
        error.status = status,
        error.from = from
        throw error
    }
}