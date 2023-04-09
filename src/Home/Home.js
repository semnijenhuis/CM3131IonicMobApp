// Home screen
const greetingName = document.getElementById('lbl-greeting');
const balanceName = document.getElementById('lbl-balance');
const debtName = document.getElementById('lbl-debt')
const refreshButton = document.getElementById('refresh');
const logOut = document.getElementById('logOut');
const billCard = document.getElementById('itemPressed')
const filterButton = document.getElementById('startFilter');


// Bills screen
const billsBalance = document.getElementById('bills-balance')
const billsDebt = document.getElementById('bills-debt')
const toggle = document.getElementById('logOut2');
const billList = document.getElementById('billList')

filterButton.addEventListener("click", startFilter);
billCard.addEventListener("click", printTest);
refreshButton.addEventListener("click",updateHeader);
logOut.addEventListener("click",deleteUser);
toggle.addEventListener("click", printTest)

let logedInUser = JSON.parse(localStorage.getItem("user"));
let debt = logedInUser.debt;

function startFilter(){
    window.location.href = "Filtering/Filtering.html";
}

function printTest(){
    console.log("bill card pressed")
}

console.log("Home file started")
// const bill1 = new Bill("Netflix",33.32,"02-03-2023");

updateBillList()

function updateBillList(){
    console.log("bill activated")
    console.log(logedInUser.incomingBills.length)

    for (let i = 0; i < logedInUser.incomingBills.length; i++) {
        let bill = logedInUser.incomingBills[i];
        console.log(bill)
        console.log(bill.name)


        // create the ion-item
        let ionItem = document.createElement("ion-item");

        // create the ion-toggle
        let ionToggle = document.createElement("ion-toggle");
        ionToggle.setAttribute("id", "logOut" + i);

        if(bill.payed) {
            ionToggle.checked = true;
        }


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
        itemPrice.textContent =  "€" +bill.amount;

        // append the item-date and item-price spans to the item-details span
        itemDetails.appendChild(itemDate);
        itemDetails.appendChild(itemPrice);


        ionToggle.addEventListener("click", function(event) {
            addDebt(event, logedInUser, bill);
        });

        // append the h2 and item-details to the ion-toggle
        ionToggle.appendChild(h2);
        ionToggle.appendChild(itemDetails);

        // append the ion-toggle to the ion-item
        ionItem.appendChild(ionToggle);

        // append the ion-item to the ion-list
        billList.appendChild(ionItem);


    }



}


function addDebt(event, logedInUser, bill,) {
    const toggleElement = event.target;


    console.log(debt)
    console.log(bill.amount)

    if (toggleElement.checked) {
        debt = debt -bill.amount;
        bill.payed = false;

        logedInUser.debt = debt;
        localStorage.setItem("user", JSON.stringify(logedInUser));


    } else {
        debt = debt +bill.amount;
        bill.payed = true;
        logedInUser.debt = debt;
        localStorage.setItem("user", JSON.stringify(logedInUser));
    }

    billsDebt.innerText = debt
}


function mainHome(status) {
    console.log("Home Started")
    if (status === true) {
        window.location = "./Home/Home.html";
    }
    else {
        window.location = "../Home/Home.html";
    }
}

function updateHeader() {

    greetingName.textContent = greetingName.textContent.replaceAll("@name", logedInUser.username)
    balanceName.textContent = balanceName.textContent.replaceAll("@amount", "€" + logedInUser.balance);
    debtName.textContent = debtName.textContent.replaceAll("@amountNeeded", "€" + debt);

    billsBalance.textContent = billsBalance.textContent.replace("@amount","€" + logedInUser.balance)
    billsDebt.textContent = billsDebt.textContent.replace("@amount","€" + debt)

}

function deleteUser() {
    localStorage.removeItem('user');
    window.location = "../Index.html";
}







