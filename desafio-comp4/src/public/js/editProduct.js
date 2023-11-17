const form = document.getElementById('editProductForm')
const title = document.getElementById('title')
const description = document.getElementById('description')
const year = document.getElementById('year')
const price = document.getElementById('price')
const stock = document.getElementById('stock')
const category = document.getElementById('category')
const submit = document.getElementById('submit')


form.addEventListener('submit', async event => {
    event.preventDefault()
    try {
        const productId = event.target.getAttribute("product-id");
        const response = await editProduct(productId)
        if (response.error) return alert(response.msg)
        alert("Producto actualizado exitosamente")
        redirect('http://localhost:8080/')
    }
    catch(e) {
        console.log(e)
    }
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
    return response = fetch(`http://localhost:8080/api/products/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => {
        return response.json();
    })
    .then(data => {
        return data
    })
    .catch(error => {
        console.error('Ocurrió un error:', error);
    });
}

function redirect(url) {
    window.location.href = url
}