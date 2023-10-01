const form = document.getElementById('createProductForm')
const title = document.getElementById('title')
const description = document.getElementById('description')
const year = document.getElementById('year')
const price = document.getElementById('price')
const stock = document.getElementById('stock')
const category = document.getElementById('category')
const submit = document.getElementById('submit')

form.addEventListener("submit", event => {
    event.preventDefault()
    if (title.value.length < 1 || description.value.length < 1 || year.value.toString().length < 1 || price.value.toString().length < 1 || stock.value.toString().length < 1) {
        return alert("Falta completar campos")
    }
    createProduct()
})

async function createProduct() {
    const data = {
        title: title.value,
        description: description.value,
        year: year.value,
        price: price.value,
        stock: stock.value,
        category: category.value.toLowerCase()
    }
    const response = await fetch('http://localhost:8080/api/products/', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    })
    if (response.error) return alert(response.msg)
    alert("Producto creado exitosamente")
    redirect('http://localhost:8080')
}