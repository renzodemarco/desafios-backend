export default class userDto {
    constructor(user) {
        this.name = user.first_name
        this.surname = user.last_name
        this.email = user.email
        this.role = user.role
        this.cart = user.cart
    }
}