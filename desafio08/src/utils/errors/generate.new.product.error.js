export const generateNewProductError = product => {
    return `One or more properties were incomplete or not valid, expected:
    * title: to be string, received ${typeof product.title},
    * description: to be string, received ${typeof product.description},
    * year: to be number, received ${typeof product.year},
    * price: to be number, received ${typeof product.price},
    * stock: to be number, received ${typeof product.stock}` 
}