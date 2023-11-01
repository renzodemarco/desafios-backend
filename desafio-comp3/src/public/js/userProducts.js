const cartId = document.querySelector(".bienvenida").getAttribute("cart-id")
const userId = document.querySelector(".bienvenida").getAttribute("user")
const changeToPremium = document.getElementById("change-to-premium")
const changeToUser = document.getElementById("change-to-user")

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

    changeToPremium.addEventListener('click', async event => {
        const response = await changeRole({role: 'premium'})
        if (response.error) return alert(response.msg)
        alert("Se ha cambiado el rol")
        return window.location.href = '/'
    })

    changeToUser.addEventListener('click', async event => {
        const response = await changeRole({role: 'user'})
        if (response.error) return alert(response.msg)
        alert("Se ha cambiado el rol")
        return window.location.href = '/'
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
            return response.json();
        })
        .then(data => {
            return data
        })
        .catch(error => {
            alert(error.msg);
        });
    if (response.error) return response.msg
}

async function changeRole(role) {
    const response = fetch(`http://localhost:8080/users/premium/${userId}`, {
            method: 'PUT',
            body: JSON.stringify(role),
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
            alert(error.msg);
        });
    if (response.error) return response.msg
}
