const deleteButtons = document.querySelectorAll('.delete-product')
const editButtons = document.querySelectorAll('.edit-product')

deleteButtons.forEach(button => {
    button.addEventListener("click", async event => {
        const productId = event.target.getAttribute("product-id");
        const productContainer = event.target.closest('.productContainer');
        const title = productContainer.querySelector('h2').innerHTML
        if (confirm(`¿Seguro que desea eliminar el producto ${title}?`)) {
            const response = await deleteProduct(productId)
            if (response.error) return alert(response.msg)
            alert(`Se ha eliminado el producto ${title}`)
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
