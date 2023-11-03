const cartId = document.querySelector(".bienvenida").getAttribute("cart-id")
const userId = document.querySelector(".bienvenida").getAttribute("user")
const deleteButtons = document.querySelectorAll('.delete-product')
const editButtons = document.querySelectorAll('.edit-product')
const changeToUser = document.getElementById("change-to-user")
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

changeToUser.addEventListener('click', async () => {
    const response = await changeRole({ role: 'user' })
    if (response.error) return alert(response.msg)
    alert("Se ha cambiado el rol")
    return window.location.href = '/'
})


deleteButtons.forEach(button => {
    button.addEventListener("click", async event => {
        const productId = event.target.getAttribute("product-id");
        if (confirm(`¿Seguro que desea eliminar el producto ${productId}?`)) {
            const response = await deleteProduct(productId);
            if (response.error) return alert(response.msg)
            alert(`Se ha eliminado el producto ${productId}`)
            redirect('/')
        }
    })

    editButtons.forEach(button => {
        button.addEventListener("click", event => {
            const productId = event.target.getAttribute("product-id");
            redirect(`http://localhost:8080/products/edit/${productId}`)
        })
    })
})

async function deleteProduct(id) {
    return fetch(`/api/products/${id}`, {
        method: 'DELETE'
    })
    .then(response => response.json)
    .then(data => data)
    .catch(error =>alert(error.msg))
}

async function addProduct(cart, product) {
    return fetch(`http://localhost:8080/api/carts/${cart}/products/${product}`, {
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
}

async function changeRole(role) {
    return fetch(`http://localhost:8080/api/sessions/premium/${userId}`, {
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
}
