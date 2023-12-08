document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/api/auth/signout', {
            method: 'POST'
        });

        if (response.ok) {
            window.location.href = '/'
        } else {
            console.error('Ocurrió un problema durante el logout');
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
    }
});