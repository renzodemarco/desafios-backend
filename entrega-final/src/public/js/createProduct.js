const form = document.getElementById('createProductForm')
const title = document.getElementById('title')
const description = document.getElementById('description')
const year = document.getElementById('year')
const price = document.getElementById('price')
const stock = document.getElementById('stock')
const category = document.getElementById('category')
const submit = document.getElementById('submit')

form.addEventListener("submit", async event => {
    event.preventDefault()
    const data = {
        title: title.value,
        description: description.value,
        year: year.value,
        price: price.value,
        stock: stock.value,
        category: category.value.toLowerCase()
    }
    const response = await createProduct(data)
    if (response) {
        alert(`Producto creado exitosamente`)
        window.location.href = ('/products')
    }
})

async function createProduct(data) {
    return await fetch('/api/products/', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(response);
        }
        return response.json()
    })
    .then(data => data)
    .catch(error => alert(error.message))
}