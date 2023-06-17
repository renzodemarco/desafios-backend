class ProductManager {

    constructor() {
        this.products = [];
    }

    getProducts() {
        return this.products;
    }

    addProduct(title, description, price, code, stock, thumbnail) {

        const product = {
            title,
            description,
            price,
            thumbnail, 
            code,
            stock,
            id: this.products.length === 0 ? 1 : this.products[this.products.length - 1].id + 1
        }

        if (!title || !description || !price || !code || !stock || !thumbnail) return "Incomplete information"

        if (this.products.some(prod => prod.code === product.code)) return "Code already exists"

        this.products.push(product)

        return product
    }

    getProductById(id) {
        const productIndex = this.products.findIndex(prod => prod.id === id)

        if (productIndex === -1) return "Not found"

        return this.products[productIndex]
    }
}


// creo una instancia de la clase ProductManager
const Productos = new ProductManager

// llamo a los productos, lo que devuelve un array vacío
console.log(Productos.getProducts());

// agrego un producto de prueba
Productos.addProduct("Producto prueba", "Este es un producto prueba", 200, "abc123", 25, "Sin imagen");

// llamo a los productos nuevamente, lo que me devuelve un array que contiene al producto de prueba
console.log(Productos.getProducts());

// intento agregar un producto con la misma info que el anterior, lo que me devuelve error ya que el code es el mismo
console.log(Productos.addProduct("Producto prueba", "Este es un producto prueba", 200, "abc123", 25, "Sin imagen"));

// obtengo el producto con el id 1
console.log(Productos.getProductById(1));

// intento obtener el producto con el id 2, como no existe, devuelve error
console.log(Productos.getProductById(2));