const socket = io()

const createProduct = prod => {
    return (
        `<ul>
        <li><b>Título: </b>${prod.title}</li>
        <li><b>Descripción: </b>${prod.description}</li>
        <li><b>Precio: </b>$${prod.price}</li>
        <li><b>Categoría: </b>${prod.category}</li>
        <li><b>Stock: </b>${prod.stock}</li>
        <li><b>Code: </b>${prod.code}</li>
    </ul>`
    )
}

socket.on('actualizacion', data => {
    productsList = data.map(prod => createProduct(prod))
    document.getElementById('listContainer').innerHTML = productsList.join('')
})


console.log("Funciona el js front")