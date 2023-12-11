const deleteButtons = document.querySelectorAll(".delete-product")
const buyButton = document.getElementById("buy-cart")
const deleteCartButton = document.getElementById("delete-cart")

deleteButtons.forEach(button => {
    button.addEventListener('click', async event => {
        const productId = event.target.getAttribute("product-id");
        if (confirm('¿Seguro que desea eliminar este producto de su carrito?')) {
            const response = await deleteProduct(productId);
            if (response) return location.reload()
        }
    })
})

async function deleteProduct(product) {
    return await fetch(`/api/carts/${product}`, {
        method: 'DELETE'
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

deleteCartButton.addEventListener("click", async () => {
    if (confirm(`¿Seguro que desea eliminar todos los objetos del carrito?`)) {
        const response = await deleteCart();
        if (response) return location.reload()
    }
})

async function deleteCart() {
    return await fetch(`/api/carts`, {
        method: 'DELETE'
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