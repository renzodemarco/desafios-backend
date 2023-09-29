const cartId = document.querySelector(".bienvenida").getAttribute("cart-id")

document.addEventListener("DOMContentLoaded", async () => {
    const addButtons = document.querySelectorAll('.add-product')

    addButtons.forEach(button => {
        button.addEventListener("click", event => {
            const productId = event.target.getAttribute("product-id");
            if (confirm(`¿Seguro que desea agregar el producto ${productId}?`)) {
                addProduct(cartId, productId);
            }
        })
    })
})

async function addProduct(cart, product) {
    const response = await fetch(`http://localhost:8080/api/carts/${cart}/products/${product}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            }
        })
    console.log(response)
    if (response.error) return alert(response.msg)
    alert(`Se ha agregado el producto ${product}`)
}
