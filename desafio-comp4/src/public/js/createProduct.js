const form = document.getElementById('createProductForm')
const title = document.getElementById('title')
const description = document.getElementById('description')
const year = document.getElementById('year')
const price = document.getElementById('price')
const stock = document.getElementById('stock')
const category = document.getElementById('category')
const submit = document.getElementById('submit')
const user = form.getAttribute('user')

form.addEventListener("submit", event => {
    event.preventDefault()
    createProduct()
})

async function createProduct() {
    const data = {
        title: title.value,
        description: description.value,
        year: year.value,
        price: price.value,
        stock: stock.value,
        category: category.value.toLowerCase(),
        owner: user
    }
    const response = await fetch('http://localhost:8080/api/products/', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    })

    const responseJSON = await response.json()

    if (responseJSON.error) return alert(responseJSON.msg)

    alert("Producto creado exitosamente")
    redirect('http://localhost:8080')
}