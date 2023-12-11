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
    const productId = event.target.getAttribute("product-id");
    const response = await editProduct(productId)
    if (response) {
        alert("Producto actualizado exitosamente")
        redirect('/products')
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
    return response = fetch(`/api/products/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(response);
            }
            return response.json();
        })
        .then(data => {
            return data
        })
        .catch(error => {
            alert(error.message);
        });
}

function redirect(url) {
    window.location.href = url
}