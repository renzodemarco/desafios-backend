const loginForm = document.getElementById("loginForm")

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault()
    const dataArray = new FormData(loginForm)
    const dataObj = {}
    dataArray.forEach((value, key) => dataObj[key] = value)

    const response = await fetch('/api/sessions/login', {
        method: 'POST',
        body: JSON.stringify(dataObj),
        headers: {
            "Content-Type": "application/json"
        }
    })

    const responseData = await response.json()

    if (responseData.error) return alert(responseData.msg)

    const redirect = url => window.location.href = url

    redirect('http://localhost:8080/products')
})
