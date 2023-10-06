export const generateNewProductError = product => {
    return `One or more properties were incomplete or not valid, expected:
    * title: to be string, received ${product.title},
    * description: to be string, received ${product.description},
    * year: to be string, received ${product.year},
    * price: to be number, received ${product.price},
    * stock: to be number, received ${product.stock}` 
}