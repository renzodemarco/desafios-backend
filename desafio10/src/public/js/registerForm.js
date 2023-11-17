const registerForm = document.getElementById("registerForm")

registerForm.addEventListener('submit', async (event) => {
    event.preventDefault()
    const dataArray = new FormData(registerForm)
    const dataObj = {}
    dataArray.forEach((value, key) => dataObj[key] = value)
    console.log(dataArray)

    const response = await fetch('/api/sessions/register', {
        method: 'POST',
        body: JSON.stringify(dataObj),
        headers: {
            "Content-Type": "application/json"
        }
    })

    console.log(response)

    const responseData = await response.json()

    if (responseData.error) return alert(responseData.msg)

    const redirect = url => window.location.href = url

    redirect('/')
})
