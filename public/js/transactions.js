const myModal = new bootstrap.Modal("#transaction-modal");
const session = localStorage.getItem("session");
let  logged = sessionStorage.getItem("logged");
let data = {
    transactions: []
}

document.getElementById("button-logout").addEventListener("click", logout)

// Adicionar lançamento
document.getElementById("transaction-form").addEventListener("submit", function(e) {
    e.preventDefault();

    const value = parseFloat(document.getElementById("value-input").value);
    const description = document.getElementById("description-input").value;
    const date = document.getElementById("date-input").value;
    const type = document.querySelector('input[name="type-input"]:checked').value;

    data.transactions.unshift({
        value: value,
        type: type,
        description: description,
        date: date
    })

    saveData(data);
    e.target.reset();
    myModal.hide();
    alert("Lançamento adicionado com sucesso.");

    getTransactions();
});

checkLogged();

function checkLogged() {
    if (session) {
        sessionStorage.setItem("logged", session);
        logged = session;
    }

    if (!logged) {
        window.location.href = "index.html";
    }

    const dataUser = localStorage.getItem(logged);
    if (dataUser) {
        data = JSON.parse(dataUser);
    }

    getTransactions();
}

function logout() {
    sessionStorage.removeItem("logged");
    localStorage.removeItem("session");

    window.location.href = "index.html";
}

function getTransactions() {
    const transaction = data.transactions;
    let transactionsHtml = ``;

    if (transaction.length) {
        transaction.forEach((item) => {
            let type = "Entrada";
            if(item.type === "2") {
                type = "Saida";
            }
            
            transactionsHtml += `
            <tr>
            <th scope="row">${item.date}</th>
            <td>${item.value}</td>
            <td>${type}</td>
            <td>${item.description}</td>
            </tr>`
        })
    }

    document.getElementById("transactions-list").innerHTML = transactionsHtml;
}

function saveData(data) {
    localStorage.setItem(data.login, JSON.stringify(data));
}