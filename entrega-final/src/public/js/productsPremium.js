const deleteButtons = document.querySelectorAll('.delete-product')
const editButtons = document.querySelectorAll('.edit-product')
const changeToUser = document.getElementById("change-to-user")
const addButtons = document.querySelectorAll('.add-product')

addButtons.forEach(button => {
    button.addEventListener("click", async event => {
        const productId = event.target.getAttribute("product-id");
        if (confirm(`¿Seguro que desea agregar el producto al carrito?`)) {
            const response = await addProduct(productId);
            if (response) return alert('Producto agregado al carrito')
        }   
    })
})

changeToUser.addEventListener('click', async () => {
    const response = await changeRole()
    if (response) {
        alert("Se ha cambiado el rol")
        return window.location.href = '/products'
    }
})


deleteButtons.forEach(button => {
    button.addEventListener("click", async event => {
        const productId = event.target.getAttribute("product-id");
        if (confirm(`¿Seguro que desea eliminar este producto?`)) {
            const response = await deleteProduct(productId);
            if (response) {
                alert(`Producto eliminado exitosamente`)
                redirect('/products')
            }
        }
    })

    editButtons.forEach(button => {
        button.addEventListener("click", event => {
            const productId = event.target.getAttribute("product-id");
            redirect(`/products/edit/${productId}`)
        })
    })
})

async function deleteProduct(id) {
    return fetch(`/api/products/${id}`, {
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

async function addProduct(product) {
    return fetch(`/api/carts/${product}`, {
        method: 'POST',
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

async function changeRole() {
    return fetch('/api/auth/prem', {
        method: 'PUT',
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
