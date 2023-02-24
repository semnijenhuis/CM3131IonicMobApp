const greetingName = document.getElementById('lbl-greeting');
const balanceName = document.getElementById('lbl-balance');
const debtName = document.getElementById('lbl-debt')

const refreshButton = document.getElementById('refresh');
refreshButton.addEventListener("click",updateHeader);

const logOut = document.getElementById('logOut');
logOut.addEventListener("click",deleteUser);

let logedInUser;


function mainHome(status) {
    if (status === true) {
        window.location = "./Home/Home.html";
    }
    else {
        window.location = "../Home/Home.html";
    }
}

function updateHeader() {
    // let userParam = new URLSearchParams(window.location.search).get("user");
    // let urlUser = JSON.parse(decodeURIComponent(userParam));
    // logedInUser = urlUser;
    logedInUser = JSON.parse(localStorage.getItem("user"));
    greetingName.textContent = greetingName.textContent.replaceAll("@name", logedInUser.username)
    balanceName.textContent = balanceName.textContent.replaceAll("@amount", "€" + logedInUser.balance);
    debtName.textContent = debtName.textContent.replaceAll("@amountNeeded", "€" + logedInUser.debt);
}

function deleteUser() {
    localStorage.removeItem('user');
    window.location = "../Index.html";
}

