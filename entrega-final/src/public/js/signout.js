const signOutButton = document.getElementById("sign-out")

signOutButton.addEventListener('click', async () => {
    const response = await fetch('/api/auth/signout', {
        method: 'POST'
    })
    if (!response.ok) return alert(response.message)
    else {
        window.location.href = '/'
    }
})