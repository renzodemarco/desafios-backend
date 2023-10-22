const password = document.getElementById('password')
const password2 = document.getElementById('password2')
const submit = document.getElementById('submit')
const msg = document.getElementById('msg')

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