const dictionary = {
    productNotFound: {
        status: 404,
        message: "Product not found"
    },
    cartNotFound: {
        status: 404,
        message: "Cart not found"
    },
    userNotFound: {
        status: 404,
        message: "User not found"
    },
    ticketsNotFound: {
        status: 404,
        message: "Tickets not found"
    },
    notFoundInCart: {
        status: 404,
        message: "Product not found in cart"
    },
    notValidProducts: {
        status: 400,
        message: "Not valid products"
    },
    notValidValues: {
        status: 400,
        message: "Not valid values"
    },
    ownProduct: {
        status: 400,
        message: "Can not add own product to cart"
    },
    email: {
        status: 400,
        message: "Email does not exist"
    },    
    signUp: {
        status: 400,
        message: "Not valid email or password"
    },
    samePassword: {
        status: 400,
        message: "New password can not be the same as the old one"
    },
    incomplete: {
        status: 400,
        message: "Incomplete values"
    },
    auth: {
        status: 401,
        message: "Invalid credentials"
    },
    forbidden: {
        status: 403,
        message: "Not allowed"
    }
}

export default dictionary