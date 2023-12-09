const password = document.getElementById('password')
const password2 = document.getElementById('password2')
const submit = document.getElementById('submit')
const msg = document.getElementById('msg')
const form = document.getElementById('form')
const email = form.getAttribute('email')
const currentURL = window.location.href;
const url = new URL(currentURL);

const token = url.searchParams.get('token');

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
        const response = await fetch('/api/auth', {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` 
            },
            body: JSON.stringify({ email, password: password.value }),
        });

        if (!response.ok) {
            const data = await response.json();
            return alert(data.message)
        }

        alert("Contraseña modificada con éxito")
        window.location.href = '/login'
    } 
    catch (error) {
        console.log(error);
    }
})