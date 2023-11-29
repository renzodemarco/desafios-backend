const buyButton = document.getElementById('buyCart')

buyButton.addEventListener('click', async () => {
    const cartId = document.querySelector('.container').getAttribute('cart-id')

    const cart = await getCart(cartId)

    const purchaseBody = {
        owner: cart.owner,
        amount: cart.products.reduce((acc, item) => acc + item.product.price * item.quantity, 0)
    }

    const purchase = await createTicket(cartId, purchaseBody)

    handleTicket(purchase)

    window.location.href = `/carts/${cartId}`
})

async function getCart(id) {
    try {
        const cart = await fetch(`/api/carts/${id}`, {
            method: 'GET'
        })
        return await cart.json()
    }
    catch(e) {
        console.log(e.message)
    }
}

async function createTicket(id, ticket) {
    try {
        const purchase = await fetch(`/api/tickets/${id}/purchase`, {
            method: 'POST',
            headers:  {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(ticket)
        })
        return await purchase.json()
    }
    catch(e) {
        console.log(e.message)
    }
}

function handleTicket(purchase) {
    console.log(purchase)
    if (purchase.noStock.length > 0) {
        const noStockArray = purchase.noStock.map(prod => prod.product.title)
        alert('No se pudo realizar la compra de algunos productos debido a stock insuficiente: ' + noStockArray.join(', '))
    }
    if (purchase.ticket?.products) {
        return alert('Se ha finalizado la compra de los productos')
    }
}