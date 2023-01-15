const myModal = new bootstrap.Modal("#regiter-modal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

checkLogged();
//logar no sistema
document.getElementById("login-form").addEventListener("submit", function(e){
e.preventDefault();

const email = document.getElementById("email-imput").value;
const password = document.getElementById("senha-imput").value;
const checKsession = document.getElementById("session-check").checked;

const account = getAccount(email);

if(!account){
    alert ("Oops! verifique o usuário e a senha.");
    return;
}

if(account) {
    if(account.password !== password) {
        alert ("Oops! verifique o usuário e a senha.");
        return;
    }

    saveSession(email, checKsession);

    window.location.href = "home.html";

}
});

//CRIAR CONTA
document.getElementById("creat-form").addEventListener("submit", function(e) {
    e.preventDefault();

    const email = document.getElementById("email-create-imput").value;
    const password = document.getElementById("password-creat-imput").value;

    if(email.length < 5) { 
        alert("Preencha o campo com um e-mail válido");
        return;
    } 
    if(password.length < 5) { 
        alert("Preencha o campo com no mínimo 5 digitos");
        return;
    }
    
saveAccount({
    login: email,
    password: password,
    transactions: {}
})

myModal.hide();
    
    alert("conta criada com sucesso")
});

function checkLogged() {
    if(session){
        sessionStorage.setItem("logged", session);
        logged = session;
    }

    if(logged) {
        saveSession(logged, session);

        window.location.href = "home.html"
    }
}

function saveAccount(data){
    localStorage.setItem(data.login, JSON.stringify(data));
}

function saveSession(data, saveSession){
    if(saveSession) {
        localStorage.setItem("session", data);
    } 

    sessionStorage.setItem("logged", data);
}

function getAccount(key) {
const account = localStorage.getItem(key);

if(account) {
    return JSON.parse(account);
}
return "";
}

