const deleteButtons = document.querySelectorAll(".delete-product")
const buyButton = document.getElementById("buy-cart")
const deleteCartButton = document.getElementById("delete-cart")
const currentCart = document.querySelector('.listContainer').getAttribute("cart-id")

deleteButtons.forEach(button => {
    button.addEventListener('click', event => {
        const productId = event.target.getAttribute("product-id");
        if (confirm(`¿Seguro que desea eliminar el producto ${productId}?`)) {
            deleteProduct(productId);
        }
    })
})

async function deleteProduct(product) {
    const response = await fetch(`/api/carts/${product}`, {
            method: 'DELETE'
        })
    if (response.error) return alert(response.message)
    console.log(response)
    alert(`Se ha eliminado el producto ${product}`)
    location.reload()
}

deleteCartButton.addEventListener("click", () => {
    if (confirm(`¿Seguro que desea eliminar todos los objetos del carrito?`)) {
        deleteCart();
    }
})

async function deleteCart() {
    const response = await fetch(`/api/carts`, {
            method: 'DELETE'
        })
    if (response.error) return alert(response.message)
    alert(`Se ha eliminado el carrito`)
    location.reload()
}