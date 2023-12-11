const deleteButtons = document.querySelectorAll('.delete-product')
const editButtons = document.querySelectorAll('.edit-product')

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