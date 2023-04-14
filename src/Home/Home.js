let logedInUser = JSON.parse(localStorage.getItem("user"));

// All list
const billList = document.getElementById('billList')
const billIncomeList = document.getElementById('bill-incomeList')


// All buttons
const logOut = document.getElementById('settings-logOut-btn');
const overviewBtn = document.getElementById('settings-Overview-btn');
const apiBtn = document.getElementById('settings-API-btn');
const filterButton = document.getElementById('startFilter');


// All fields
const billsIncome = document.getElementById('bills-income')
const billsBills = document.getElementById('bills-bills')
const billsResult = document.getElementById('bills-result')
const greetingName = document.getElementById('lbl-greeting');
const balanceName = document.getElementById('lbl-balance');
const billsBankAccount = document.getElementById('bills-bankaccount')
const CURID1 = document.getElementById('currencyID1')
const CURID2 = document.getElementById('currencyID2')
const CURID3 = document.getElementById('currencyID3')
const CURID4 = document.getElementById('currencyID4')

// All eventListeners
logOut.addEventListener("click", deleteUser);
overviewBtn.addEventListener('click', () => {
    window.location.href = 'Settings/Overview/Overview.html'
});
apiBtn.addEventListener('click', () => {
    window.location.href = 'Settings/API/Api.html'
});
filterButton.addEventListener("click", startFilter);


billsBankAccount.innerText = logedInUser.bankAccount
generateBillList()
generateIncomingList()


// Generates the lists
function generateBillList() {
    // create the titles row
    let titlesRow = document.createElement("ion-row");
    let titlesName = document.createElement("ion-col");
    titlesName.classList.add('align-middle');
    titlesName.textContent = "Name";
    let titlesAmount = document.createElement("ion-col");
    titlesAmount.classList.add('align-middle');
    titlesAmount.textContent = "Price";
    let titlesPayed = document.createElement("ion-col");
    titlesPayed.classList.add('align-middle');
    titlesPayed.textContent = "Payed";
    titlesRow.appendChild(titlesName);
    titlesRow.appendChild(titlesAmount);
    titlesRow.appendChild(titlesPayed);
    billList.appendChild(titlesRow);

    // create a row for each bill
    for (let i = 0; i < logedInUser.listOfBills.length; i++) {
        let bill = logedInUser.listOfBills[i];

        let name = document.createElement("h3");
        name.textContent = bill.name;

        let amount = document.createElement("p");
        amount.textContent = logedInUser.currency + " " + bill.amount;

        // create the ion-toggle
        let payedToggle = document.createElement("ion-toggle");
        payedToggle.setAttribute("id", "logOut" + i);

        let toggleLabel = document.createElement("ion-label");
        payedToggle.setAttribute("aria-label", "");
        payedToggle.appendChild(toggleLabel);

        if (bill.payed) {
            payedToggle.checked = true;
        }

        payedToggle.addEventListener("click", function (event) {
            addDebt(event, logedInUser, bill);
        });

        let colBillName = document.createElement("ion-col");
        colBillName.classList.add('align-middle');
        colBillName.appendChild(name);

        let colBillAmount = document.createElement("ion-col");
        colBillAmount.classList.add('align-middle');
        colBillAmount.appendChild(amount);

        let colBillPayed = document.createElement("ion-col");
        colBillPayed.classList.add('align-middle');
        colBillPayed.appendChild(payedToggle);

        let row = document.createElement("ion-row");
        row.appendChild(colBillName);
        row.appendChild(colBillAmount);
        row.appendChild(colBillPayed);

        billList.appendChild(row)
    }
}

function generateIncomingList() {

    // create the titles row
    let titlesRow = document.createElement("ion-row");
    let titlesName = document.createElement("ion-col");
    titlesName.classList.add('align-middle');
    titlesName.textContent = "Name";
    let titlesAmount = document.createElement("ion-col");
    titlesAmount.classList.add('align-middle');
    titlesAmount.textContent = "Price";
    let titlesPayed = document.createElement("ion-col");
    titlesPayed.classList.add('align-middle');
    titlesPayed.textContent = "Received";
    titlesRow.appendChild(titlesName);
    titlesRow.appendChild(titlesAmount);
    titlesRow.appendChild(titlesPayed);
    billIncomeList.appendChild(titlesRow);

    for (let i = 0; i < logedInUser.listOfIncome.length; i++) {
        let bill = logedInUser.listOfIncome[i];

        let name = document.createElement("h3");
        name.textContent = bill.name;

        let amount = document.createElement("p");
        amount.textContent = logedInUser.currency + " " + bill.amount;

        // create the ion-toggle
        let payedToggle = document.createElement("ion-toggle");
        payedToggle.setAttribute("id", "logOut" + i);

        let toggleLabel = document.createElement("ion-label");
        payedToggle.setAttribute("aria-label", "");
        payedToggle.appendChild(toggleLabel);

        if (bill.payed) {
            payedToggle.checked = true;
        }

        payedToggle.addEventListener("click", function (event) {
            addIncome(event, logedInUser, bill);
        });

        let colBillName = document.createElement("ion-col");
        colBillName.classList.add('align-middle');
        colBillName.appendChild(name);

        let colBillAmount = document.createElement("ion-col");
        colBillAmount.classList.add('align-middle');
        colBillAmount.appendChild(amount);

        let colBillPayed = document.createElement("ion-col");
        colBillPayed.classList.add('align-middle');
        colBillPayed.appendChild(payedToggle);

        let row = document.createElement("ion-row");
        row.appendChild(colBillName);
        row.appendChild(colBillAmount);
        row.appendChild(colBillPayed);

        billIncomeList.appendChild(row)
    }


}


// Adds bill info if payed or not
function addDebt(event, logedInUser, bill,) {

    let user = new User(logedInUser.username, logedInUser.password, logedInUser.listOfIncome, logedInUser.listOfBills, logedInUser.currency)
    user.bankAccount = logedInUser.bankAccount
    user.listOfCategoryIncome = logedInUser.listOfCategoryIncome
    user.listOfCategoryBill = logedInUser.listOfCategoryBill

    const toggleElement = event.target;

    bill.payed = !toggleElement.checked;
    user.calculate()
    localStorage.setItem("user", JSON.stringify(user));

    billsBankAccount.innerText = user.bankAccount
    billsIncome.innerText = user.income
    billsBills.innerText = user.debt
    balanceName.innerText = user.result
    billsResult.innerText = user.result
}

function addIncome(event, logedInUser, bill,) {

    let user = new User(logedInUser.username, logedInUser.password, logedInUser.listOfIncome, logedInUser.listOfBills, logedInUser.currency)
    user.bankAccount = logedInUser.bankAccount
    user.listOfCategoryIncome = logedInUser.listOfCategoryIncome
    user.listOfCategoryBill = logedInUser.listOfCategoryBill

    const toggleElement = event.target;

    bill.payed = !toggleElement.checked;

    user.calculate()
    localStorage.setItem("user", JSON.stringify(user));

    billsBankAccount.innerText = user.bankAccount
    billsIncome.innerText = user.income
    billsBills.innerText = user.debt
    balanceName.innerText = user.result
    billsResult.innerText = user.result
}


// Extra functions to log out and start the system
function deleteUser() {
    localStorage.removeItem('user');
    window.location = "../Index.html";
}

function startFilter() {
    window.location.href = "Filtering/Filtering.html";
}

function updateHeader() {
    let user = new User(logedInUser.username, logedInUser.password, logedInUser.listOfIncome, logedInUser.listOfBills, logedInUser.currency)
    user.bankAccount = logedInUser.bankAccount
    user.listOfCategoryIncome = logedInUser.listOfCategoryIncome
    user.listOfCategoryBill = logedInUser.listOfCategoryBill
    user.calculate();

    greetingName.textContent = greetingName.textContent.replaceAll("@name", user.username)
    balanceName.textContent = balanceName.textContent.replaceAll("@amount", logedInUser.currency + user.result)

    billsBankAccount.textContent = billsBankAccount.textContent.replace("@amount", user.bankAccount)
    billsIncome.textContent = billsIncome.textContent.replace("@amount", user.getIncome())
    billsBills.textContent = billsBills.textContent.replace("@amount", user.getDebt())
    billsResult.textContent = billsResult.textContent.replace("@amount", user.getResult())

    CURID1.innerText = logedInUser.currency;
    CURID2.innerText = logedInUser.currency;
    CURID3.innerText = logedInUser.currency;
    CURID4.innerText = logedInUser.currency;

    localStorage.setItem("user", JSON.stringify(user));

}








