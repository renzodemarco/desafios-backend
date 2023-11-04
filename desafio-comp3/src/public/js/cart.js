const deleteButtons = document.querySelectorAll(".delete-product")
const buyButton = document.getElementById("buy-cart")
const currentCart = document.querySelector('.listContainer').getAttribute("cart-id")

deleteButtons.forEach(button => {
    button.addEventListener('click', event => {
        const productId = event.target.getAttribute("product-id");
        const productContainer = event.target.closest('.productContainer');
        const title = productContainer.querySelector('h2').innerHTML
        if (confirm(`¿Seguro que desea eliminar el producto ${title}?`)) {
            deleteProduct(currentCart, productId);
        }
    })
})

async function deleteProduct(cart, product) {
    const response = await fetch(`http://localhost:8080/api/carts/${cart}/products/${product}`, {
            method: 'DELETE'
        })
    if (response.error) return alert(response.msg)
    alert(`Se ha eliminado el producto ${product}`)
    location.reload()
}