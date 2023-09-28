document.addEventListener("DOMContentLoaded", async () => {
    const deleteButtons = document.querySelectorAll('.delete-product')
    const editButtons = document.querySelectorAll('.edit-product')

    deleteButtons.forEach(button => {
        button.addEventListener("click", event => {
            const productId = event.target.getAttribute("product-id");
            if (confirm(`¿Seguro que desea eliminar el producto ${productId}?`)) {
                deleteProduct(productId);
            }
        })
    })

    editButtons.forEach(button => {
        button.addEventListener("click", event => {
            const productId = event.target.getAttribute("product-id");
            redirect(`http://localhost:8080/products/edit/${productId}`)
        })
    })
})

async function deleteProduct(id) {
    const response = await fetch(`/api/products/${id}`, {
            method: 'DELETE'
        })
    if (response.error) return alert(response.msg)
    alert(`Se ha eliminado el producto ${id}`)
    redirect('http://localhost:8080')
}
