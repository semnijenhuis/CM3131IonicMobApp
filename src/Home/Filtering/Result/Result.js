const backHomeButton = document.getElementById('goBackHome')

const totalBillList = document.getElementById('totalBillList')
const totalIncomeList = document.getElementById('totalIncomeList')


const CURID1 = document.getElementById('currencyResultID1')
const CURID2 = document.getElementById('currencyResultID2')
const CURID3 = document.getElementById('currencyResultID3')
const CURID4 = document.getElementById('currencyResultID4')

const totalBank = document.getElementById('total-bankaccount')
const totalIncome = document.getElementById('total-income')
const totalBills = document.getElementById('total-bills')
const totalResult = document.getElementById('total-result')

console.log("Result file started")
backHomeButton.addEventListener("click", backToHome)


generateIncomingList()
generateBillList()
setInfo()

function setInfo() {
    let logedInUser = JSON.parse(localStorage.getItem("user"));

    CURID1.innerText = logedInUser.currency
    CURID2.innerText = logedInUser.currency
    CURID3.innerText = logedInUser.currency
    CURID4.innerText = logedInUser.currency

    totalBank.innerText = logedInUser.bankAccount;
    totalIncome.innerText = logedInUser.income;
    totalBills.innerText = logedInUser.debt;
    totalResult.innerText = logedInUser.result;

}

function generateIncomingList() {

    let logedInUser = JSON.parse(localStorage.getItem("user"));

    // create the titles row
    let titlesRow = document.createElement("ion-row");
    let titlesName = document.createElement("ion-col");
    titlesName.classList.add('align-middle');
    titlesName.textContent = "Name";
    let titlesAmount = document.createElement("ion-col");
    titlesAmount.classList.add('align-middle');
    titlesAmount.textContent = "Price";

    titlesRow.appendChild(titlesName);
    titlesRow.appendChild(titlesAmount);
    // titlesRow.appendChild(titlesPayed);
    incomeIncomeList.appendChild(titlesRow);

    for (let i = 0; i < logedInUser.listOfIncome.length; i++) {
        let bill = logedInUser.listOfIncome[i];

        let name = document.createElement("h3");
        name.textContent = bill.name;

        let amount = document.createElement("p");
        amount.textContent = logedInUser.currency + " " + bill.amount;

        let colBillName = document.createElement("ion-col");
        colBillName.classList.add('align-middle');
        colBillName.appendChild(name);

        let colBillAmount = document.createElement("ion-col");
        colBillAmount.classList.add('align-middle');
        colBillAmount.appendChild(amount);


        let row = document.createElement("ion-row");
        row.appendChild(colBillName);
        row.appendChild(colBillAmount);
        totalIncomeList.appendChild(row)
    }

}

function generateBillList() {


    let storageUser = JSON.parse(localStorage.getItem("user"));

    // create the titles row
    let titlesRow = document.createElement("ion-row");
    let titlesName = document.createElement("ion-col");
    titlesName.classList.add('align-middle');
    titlesName.textContent = "Name";
    let titlesAmount = document.createElement("ion-col");
    titlesAmount.classList.add('align-middle');
    titlesAmount.textContent = "Price";
    titlesRow.appendChild(titlesName);
    titlesRow.appendChild(titlesAmount);
    outgoingBillList.appendChild(titlesRow);

    for (let i = 0; i < logedInUser.listOfBills.length; i++) {
        let bill = logedInUser.listOfBills[i];

        let name = document.createElement("h3");
        name.textContent = bill.name;

        let amount = document.createElement("p");
        amount.textContent = logedInUser.currency + " " + bill.amount;

        let colBillName = document.createElement("ion-col");
        colBillName.classList.add('align-middle');
        colBillName.appendChild(name);

        let colBillAmount = document.createElement("ion-col");
        colBillAmount.classList.add('align-middle');
        colBillAmount.appendChild(amount);

        let row = document.createElement("ion-row");
        row.appendChild(colBillName);
        row.appendChild(colBillAmount);


        totalBillList.appendChild(row)
    }


}


function backToHome() {
    console.log("pressed to go back home")
    window.location = "./../Home.html";
}
