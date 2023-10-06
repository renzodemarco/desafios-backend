export const generateNewProductError = product => {
    return `One or more properties were incomplete or not valid, expected:
    * title: to be string, received ${typeof product.title},
    * description: to be string, received ${typeof product.description},
    * year: to be number, received ${typeof product.year},
    * price: to be number, received ${typeof product.price},
    * stock: to be number, received ${typeof product.stock}` 
}

export const generateProductError = id => {
    return `Could not find product with id ${id}`
}

export const generateCartError = id => {
    return `Could not find cart with id ${id}`
}

export const generateProductInCartError = (cart, prod) => {
    return `Could not find product with id ${prod} in cart with id ${cart}`
}