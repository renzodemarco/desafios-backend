const cartId = document.querySelector(".bienvenida").getAttribute("cart-id")

document.addEventListener("DOMContentLoaded", async () => {
    const addButtons = document.querySelectorAll('.add-product')

    addButtons.forEach(button => {
        button.addEventListener("click", async event => {
            const productId = event.target.getAttribute("product-id");
            if (confirm(`¿Seguro que desea agregar el producto ${productId}?`)) {
                const response = await addProduct(cartId, productId);
                if (response.error) return alert(response.msg)
                return alert(`Se ha agregado el producto ${productId}`)
            }
        })
    })
})

async function addProduct(cart, product) {
    const response = fetch(`http://localhost:8080/api/carts/${cart}/products/${product}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            }
        })        
        .then(response => {
            const data = response.json();
        })
        .then(data => {
            return data
        })
        .catch(error => {
            alert(error.msg);
        });
    if (response.error) return alert(response.msg)

}
