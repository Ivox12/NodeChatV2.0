function regHome() {
    window.scroll(0, document.getElementById('home').offsetHeight);
}

function logHome() {
    window.scroll(0,0);
}

document.getElementById('logForm').addEventListener('keypress', function(e){
    if(e.which == 13){
        reqLog();
    }
},false);

document.getElementById('regForm').addEventListener('keypress', function(e){
    if(e.which == 13){
        reqReg();
    }
},false);


async function makeReq(path, obj){
    const response = await fetch(path, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
    });
    
    return await response.json();
}

async function reqLog(){
    let path = "/login";
    let log = document.getElementById('lg').value;
    let pass = document.getElementById('pw').value;
    let obj = {
        log,
        pass,
    }
    let res = await makeReq(path, obj);
    if (res.infoUser){
        sessionStorage.setItem('token', res.JWT)
        window.location.href = res.path
    } else {
        document.getElementById('log-err').style.display = "block";
    }
}

async function reqReg(){
    let path = "/register";
    let log = document.getElementById('nlg').value;
    let pass = document.getElementById('npw').value;
    let nick = document.getElementById('nnn').value;
    if(validate(log) && validate(pass) && validate(nick)){
        let obj = {
            log,
            nick,
            pass,
        }
        let res = await makeReq(path, obj);
        regMessage(res);
    }
}

function regMessage(res){
    let nE = document.getElementById('nick-err');
    let lE= document.getElementById('log-reg-err');
    let suc = document.getElementById('suc-reg');
    let err = document.getElementById('reg-err');
    switch(res.id){
        case 1:
            nE.style.display = "block";
            lE.style.display = "none";
            err.style.display = "none";
            suc.style.display = "none";
            break;
        case 2:
            lE.style.display = "block";
            nE.style.display = "none";
            err.style.display = "none";
            suc.style.display = "none";
            break;
        case 3:
            suc.style.display = "block";
            lE.style.display = "none";
            nE.style.display = "none";
            err.style.display = "none";
            break;
        case null:
            err.style.display = "block";
            nE.style.display = "none";
            lE.style.display = "none";
            suc.style.display = "none";
            break;
    }
}

function validate(str){
    if(str == null || str == '' || str.includes(' ')){
        return false;
    }
    else {
        return true;
    }
}