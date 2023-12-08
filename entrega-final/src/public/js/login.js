const loginForm = document.getElementById("loginForm")

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault()
    const dataArray = new FormData(loginForm)
    const dataObj = {}
    dataArray.forEach((value, key) => dataObj[key] = value)

    const response = await fetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(dataObj),
        headers: {
            "Content-Type": "application/json"
        }
    })

    if (response.status === 404) {
        return alert('El correo electrónico no existe');
    } else if (response.status === 401 || response.status === 403) {
        return alert('Correo electrónico o contraseña incorrectas');
    }

    if (response.ok) {
        window.location.href = '/products'
    }

})
