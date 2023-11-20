const deleteButtons = document.querySelectorAll(".delete-product")
const buyButton = document.getElementById("buy-cart")
const currentCart = document.querySelector('.listContainer').getAttribute("cart-id")

deleteButtons.forEach(button => {
    button.addEventListener('click', event => {
        const productId = event.target.getAttribute("product-id");
        if (confirm(`¿Seguro que desea eliminar el producto ${productId}?`)) {
            deleteProduct(currentCart, productId);
        }
    })
})

async function deleteProduct(cart, product) {
    const response = await fetch(`/api/carts/${cart}/products/${product}`, {
            method: 'DELETE'
        })
    if (response.error) return alert(response.message)
    alert(`Se ha eliminado el producto ${product}`)
    location.reload()
}