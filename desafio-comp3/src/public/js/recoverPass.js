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

    fetch('/recover-password', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password }),
    })
        .then(response => {
            // Verificar si la respuesta es exitosa (código de estado HTTP 200)
            if (!response.ok) {
                throw new Error('La solicitud no fue exitosa');
            }
            // Parsear la respuesta en JSON
            return response.json();
        })
        .then(data => {
            // Hacer algo con los datos
            console.log(data);
        })
        .catch(error => {
            // Manejar errores
            console.error('Ocurrió un error:', error);
        });
})