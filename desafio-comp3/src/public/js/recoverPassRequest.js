const form = document.getElementById("form")
const input = document.getElementById("email")

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault()
    handleSubmit(input.value) 
})


async function handleSubmit(email) {

    await fetch('/recover-password/request', {
        method: 'POST',
        body: JSON.stringify(email),
        headers: {
            "Content-Type": "application/json"
        }
    })
}