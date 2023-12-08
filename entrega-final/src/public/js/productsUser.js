const cartId = document.querySelector(".bienvenida").getAttribute("cart-id")
const userId = document.querySelector(".bienvenida").getAttribute("user")
const changeToPremium = document.getElementById("change-to-premium")
const addButtons = document.querySelectorAll('.add-product')
const signOutButton = document.getElementById("sign-out")

addButtons.forEach(button => {
    button.addEventListener("click", async event => {
        const productId = event.target.getAttribute("product-id");
        if (confirm(`¿Seguro que desea agregar el producto ${productId}?`)) {
            const response = await addProduct(productId);
            if (response.error) return alert(response.message)
            return alert(`Se ha agregado el producto ${productId}`)
        }
    })
})

changeToPremium.addEventListener('click', async () => {
    const response = await changeRole({ role: 'premium' })
    if (response.error) return alert(response.message)
    alert("Se ha cambiado el rol")
    return window.location.href = '/'
})

async function addProduct(product) {
    return fetch(`/api/carts/${product}`, {
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
            alert(error.message);
        });
}

async function changeRole(role) {
    return fetch('/api/auth/prem', {
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
            alert(error.message);
        });
}

signOutButton.addEventListener('click', async () => {
    const response = await fetch('/api/auth/signout', {
        method: 'POST'
    })
    if (!response.ok) return alert(response.message)
    else {
        window.location.href = '/'
    }
})