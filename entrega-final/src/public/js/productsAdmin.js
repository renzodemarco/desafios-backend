const deleteButtons = document.querySelectorAll('.delete-product')
const editButtons = document.querySelectorAll('.edit-product')
const signOutButton = document.getElementById("sign-out")

deleteButtons.forEach(button => {
    button.addEventListener("click", event => {
        const productId = event.target.getAttribute("product-id");
        if (confirm(`¿Seguro que desea eliminar el producto ${productId}?`)) {
            deleteProduct(productId);
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
    const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE'
    })
    if (!response.ok) return alert(response.message)
    alert(`Se ha eliminado el producto ${id}`)
    redirect('/')
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