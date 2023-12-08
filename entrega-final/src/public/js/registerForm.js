const registerForm = document.getElementById("registerForm")

registerForm.addEventListener('submit', async (event) => {
    event.preventDefault()
    const dataArray = new FormData(registerForm)
    const dataObj = {}
    dataArray.forEach((value, key) => dataObj[key] = value)
    console.log(dataArray)

    const response = await fetch('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify(dataObj),
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (!response.ok) {
        const responseData = await response.json();
        return alert(responseData.message);
    }

    else {
        window.location.href = '/login?register=true'
    }
})
