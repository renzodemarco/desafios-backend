const password = document.getElementById('password')
const password2 = document.getElementById('password2')
const submit = document.getElementById('submit')
const msg = document.getElementById('msg')
const form = document.getElementById('form')
const email = form.getAttribute('email')

const handlePasswords = () => {
    if (password.value !== password2.value) {
        submit.setAttribute('disabled', 'true')
        msg.textContent = 'Las contraseñas no coinciden';
    }
    else if (password.value === password2.value) {
        msg.textContent = '';
        submit.removeAttribute('disabled')
    }
}

password.addEventListener('keyup', handlePasswords)
password2.addEventListener('keyup', handlePasswords)

form.addEventListener('submit', async event => {
    event.preventDefault()

    try {
    const response = await handleSubmit(email, password.value)

    if (response.error) return alert(response.msg)

    if (response.success) {
        alert("Contraseña modificada")

        window.location.href = '/'
    }

    }
    catch(e) {
        console.log(e)
    }
})



const handleSubmit = async (email, password) => {
    return fetch('/recover-password/', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({email, password}),
    })
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data)
            return data
        })
        .catch(error => {
            console.error('Ocurrió un error:', error);
        });
}