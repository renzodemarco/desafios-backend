const form = document.getElementById("form")
const input = document.getElementById("email")

form.addEventListener('submit', async event => {
    event.preventDefault()
    const email = input.value
    try {
    const response = await handleSubmit(email)

    if (response) return alert("Mensaje enviado, por favor revise su casilla de correo e ingrese al link")
    }
    catch(e) {
        console.log(e)
    }
})

const handleSubmit = async (email) => {
    return fetch('/api/auth/request', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({email}),
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