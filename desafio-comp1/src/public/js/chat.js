const socket = io('http://localhost:8080', {autoConnect: false})

const createMsg = msg => {
    return(
        `<div class="chat-message">
                <div class="flex items-end">
                    <div class="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                        <span class="brand-color">${msg.user}</span>
                        <div>
                            <span
                                class="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">${msg.message}</span>
                        </div>
                    </div>
                </div>
            </div>`
    )
}

const createOwnMsg = msg => {
    return (
        `<div class="chat-message">
        <div class="flex items-end justify-end">
            <div class="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
                <div>
                    <span
                        class="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white">${msg}</span>
                </div>
            </div>
        </div>
    </div>`
    )
}

(function onLoad() {
    const username = localStorage.getItem('username')
    if (username) {
        socket.auth = {username}  // con la propiedad .auth enviamos información de conexión al back
        socket.connect()  // con esto hacemos la conexión al socket
        $('#joinRoom').addClass('hidden')
        $('#chatRoom').removeClass('hidden')
    }
})()

$('#joinBtn').on('click', () => {
    const input = $('#username').val()
    if (input.length > 0) {
        localStorage.setItem('username', input)
        socket.auth = {username: input}
        socket.connect()
        $('#joinRoom').addClass('hidden')
        $('#chatRoom').removeClass('hidden')
    }
})

// para mostrar el historial con la info que me da el back
socket.on('history', data => {
    const username = localStorage.getItem('username')
    const historialHtml = data.map(msg => msg.user === username ? createOwnMsg(msg.message) : createMsg(msg))
    $('#messages').html(historialHtml.join(''))
})

// para que se mande mensaje al click del button
$('#sendMsg').on('click', () => {
    const message = $('#message').val()
    const user = localStorage.getItem('username')
    if (message.length > 0) {
        socket.emit('enviarMsg', {message, user})
        $('#message').val('')
        $('#messages').append(createOwnMsg(message))
    }
})  

// para que se mande mensaje al enter
$('#message').keyup(e=> {
    if ( e.key == "Enter") {     
        const message = $('#message').val()
        const user = localStorage.getItem('username')
        if (message.length > 0) {
            socket.emit('enviarMsg', {message, user})
            console.log({message, user})
            $('#message').val('')
            $('#messages').append(createOwnMsg(message))
        }
    }
})

// para mostrar los msjs entrantes
socket.on('recibirMsg', msg => {
    $('#messages').append(createMsg(msg))
})

