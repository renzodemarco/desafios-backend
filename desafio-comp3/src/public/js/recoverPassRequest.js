const form = document.getElementById("form")
const input = document.getElementById("email")

form.addEventListener('submit', async event => {
    event.preventDefault()
    const email = input.value
    try {
    const response = await handleSubmit(email)

    if (response.error) return alert(response.msg)

    return alert("Mensaje enviado, por favor revise su casilla de correo e ingrese al link")

    }
    catch(e) {
        console.log(e)
    }
})

const handleSubmit = async (email) => {
    return fetch('/recover-password/request', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({email}),
    })
        .then(response => {
            return response.json();
        })
        .then(data => {
            return data
        })
        .catch(error => {
            console.error('Ocurrió un error:', error);
        });
}