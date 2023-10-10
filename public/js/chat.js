const token = sessionStorage.token;
var socket = io({
    auth: {
        token
    }
});

socket.emit('init');

socket.on('setUid', (info) => {
    socket.uid = info;
})

socket.on('attUser',(info) => {
    let lista = document.querySelector('.list')
    lista.innerHTML = '';
    info.forEach((e) => {
        lista.innerHTML += 
        `<div class="list-item">
            <img style="width: 20px; height: 20px;">
            <div class="list-name">
                <span>${e.nick}</span>
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

socket.on('err', (info) => {
    window.location.href = info;
})

socket.on('attMessage', (info) => {
    let msgs = document.getElementById('msgs')
    if (socket.uid == info.from.uid) {
        msgs.innerHTML += 
        `<div class="msg-bd-s">
            <div class="msg-div-s">
                <div class="msg-name">
                    <span>${info.from.nick}</span>
                </div>
                <div class="msg-s">
                    <span>${info.message}</span>
                </div>
                <div class="msg-hour">
                    <span>${info.time}</span>
                </div>
            </div>
        </div>`
    }
    else {
        msgs.innerHTML += 
        `<div class="msg-bd-r">
            <div class="msg-div-r">
                <div class="msg-name">
                    <span>${info.from.nick}</span>
                </div>
                <div class="msg-r">
                    <span>${info.message}</span>
                </div>
                <div class="msg-hour">
                    <span>${info.time}</span>
                </div>
            </div>
        </div>`
    }
;})

document.getElementById('writer').addEventListener('keypress', function(e){
    if(e.which == 13){
        sendmsg();
    }
},false);
document.getElementById('send-writer').addEventListener('click', function(e){
    sendmsg();
},false);

function sendmsg(){
    msg = document.getElementById('message-box');
    socket.emit('sendMessage', msg.value);
    msg.value = '';
}