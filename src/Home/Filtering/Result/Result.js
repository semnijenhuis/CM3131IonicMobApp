const backHomeButton =document.getElementById('goBackHome')

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


    if (logedInUser.listOfIncome) {
        for (let i = 0; i < logedInUser.listOfIncome.length; i++) {
            let bill = logedInUser.listOfIncome[i];

            // create the ion-item
            let ionItem = document.createElement("ion-item");


            // create the h2 element and set its text content
            let h2 = document.createElement("h2");
            h2.textContent = bill.name;

            // create the item-details span
            let itemDetails = document.createElement("span");
            itemDetails.setAttribute("class", "item-details");

            // create the item-date span and set its text content
            let itemDate = document.createElement("span");
            itemDate.setAttribute("class", "item-date");
            itemDate.textContent = bill.date;

            // create the item-price span and set its text content
            let itemPrice = document.createElement("span");
            itemPrice.setAttribute("class", "item-price");
            itemPrice.textContent = logedInUser.currency+" "  + bill.amount;

            // append the item-date and item-price spans to the item-details span
            itemDetails.appendChild(itemDate);
            itemDetails.appendChild(itemPrice);


            ionItem.addEventListener("click", function (event) {
                openActionSheet(bill);
            });

            // append the h2 and item-details to the ion-toggle
            ionItem.appendChild(h2);
            ionItem.appendChild(itemDetails);


            // append the ion-item to the ion-list
            totalIncomeList.appendChild(ionItem);
        }
    }

}

function generateBillList() {
    let storageUser = JSON.parse(localStorage.getItem("user"));

    if (storageUser.listOfBills) {
        for (let i = 0; i < storageUser.listOfBills.length; i++) {
            let bill = storageUser.listOfBills[i];

            // create the ion-item
            let ionItem = document.createElement("ion-item");


            // create the h2 element and set its text content
            let h2 = document.createElement("h2");
            h2.textContent = bill.name;

            // create the item-details span
            let itemDetails = document.createElement("span");
            itemDetails.setAttribute("class", "item-details");

            // create the item-date span and set its text content
            let itemDate = document.createElement("span");
            itemDate.setAttribute("class", "item-date");
            itemDate.textContent = bill.date;

            // create the item-price span and set its text content
            let itemPrice = document.createElement("span");
            itemPrice.setAttribute("class", "item-price");
            itemPrice.textContent = logedInUser.currency+" "  + bill.amount;

            // append the item-date and item-price spans to the item-details span
            itemDetails.appendChild(itemDate);
            itemDetails.appendChild(itemPrice);


            ionItem.addEventListener("click", function (event) {
                openActionSheet(bill);
            });

            // append the h2 and item-details to the ion-toggle
            ionItem.appendChild(h2);
            ionItem.appendChild(itemDetails);


            // append the ion-item to the ion-list
            totalBillList.appendChild(ionItem);
        }
    }

}



function backToHome(){
    console.log("pressed to go back home")
    window.location = "./../Home.html";
}
