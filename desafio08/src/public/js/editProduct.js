const form = document.getElementById('editProductForm')
const title = document.getElementById('title')
const description = document.getElementById('description')
const year = document.getElementById('year')
const price = document.getElementById('price')
const stock = document.getElementById('stock')
const category = document.getElementById('category')
const submit = document.getElementById('submit')


form.addEventListener('submit', event => {
    event.preventDefault()
    const productId = event.target.getAttribute("product-id");
    editProduct(productId)
})

async function editProduct(id) {
    const data = {
        title: title.value,
        description: description.value,
        year: year.value,
        price: price.value,
        stock: stock.value,
        category: category.value.toLowerCase()
    }
    const response = await fetch(`http://localhost:8080/api/products/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    })
    const responseJSON = await response.json()

    if (responseJSON.error) return alert(responseJSON.msg)
    
    alert("Producto actualizado exitosamente")
    redirect('http://localhost:8080/')
}

function redirect(url) {
    window.location.href = url
}