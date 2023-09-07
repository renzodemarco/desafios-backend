const form = document.getElementById("loginForm")

form.addEventListener('submit', async (event) => {
    event.preventDefault()
    const dataArray = new FormData(form)
    const dataObj = {}
    dataArray.forEach((value, key)=> dataObj[key] = value) 

    const response = await fetch('/api/sessions/login', {
        method: 'POST',
        body: JSON.stringify(dataObj),
        headers: {
            "Content-Type": "application/json"
        }
    })

    const responseData = await response.json()

    if (responseData.error) return alert("There's been a problem with your session login")

    localStorage.setItem('accessToken', responseData.accessToken)
})