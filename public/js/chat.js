var socket = io.connect();
token = sessionStorage.token
socket.emit('init', token);

socket.on('attUser',(info) => {
    let lista = document.querySelector('.list')
    lista.innerHTML = '';
    info.forEach((e) => {
        lista.innerHTML += 
        `<div class="list-item">
            <img style="width: 20px; height: 20px;">
            <div class="list-name">
                <span>${e}</span>
            </div>
            <span class="list-status"></span>
        </div>`
    });
})

socket.on('userOff', (info) => {
    let msgs = document.getElementById('msgs')
    msgs.innerHTML += 
    `<div class="div-g-not">
        <div class="g-msg">
            <span>${info.nick} Saiu da Conversa</span>
            <div class="msg-hour">
                <span>${info.time}</span>
            </div>
        </div>
    </div>`
    console.log(info);
})

socket.on('userOn', (info) => {
    let msgs = document.getElementById('msgs')
    msgs.innerHTML += 
    `<div class="div-g-not">
        <div class="g-msg">
            <span>${info.nick} Entrou na Conversa</span>
            <div class="msg-hour">
                <span>${info.time}</span>
            </div>
        </div>
    </div>`
})