// Home screen
const greetingName = document.getElementById('lbl-greeting');
const balanceName = document.getElementById('lbl-balance');
const refreshButton = document.getElementById('refresh');
const logOut = document.getElementById('logOut');
const billCard = document.getElementById('itemPressed')
const filterButton = document.getElementById('startFilter');


// Bills screen

const billsIncome = document.getElementById('bills-income')
const billsBills = document.getElementById('bills-bills')
const billsResult = document.getElementById('bills-result')
const billList = document.getElementById('billList')
const billIncomeList = document.getElementById('bill-incomeList')



filterButton.addEventListener("click", startFilter);
billCard.addEventListener("click", printTest);
refreshButton.addEventListener("click",updateHeader);
logOut.addEventListener("click",deleteUser);


let logedInUser = JSON.parse(localStorage.getItem("user"));
let debt = logedInUser.debt;

console.log("Home file started")
function mainHome(status) {
    console.log("Home Started")
    if (status === true) {
        window.location = "./Home/Home.html";
    }
    else {
        window.location = "../Home/Home.html";
    }
}


function startFilter(){
    window.location.href = "Filtering/Filtering.html";
}

function printTest(){
    console.log("bill card pressed")
}





updateBillList()
updateIncomeList()




function updateBillList(){
    console.log(logedInUser.listOfBills.length)

    for (let i = 0; i < logedInUser.listOfBills.length; i++) {
        let bill = logedInUser.listOfBills[i];
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

function updateIncomeList(){

    console.log(logedInUser.listOfIncome.length)

    for (let i = 0; i < logedInUser.listOfIncome.length; i++) {
        let bill = logedInUser.listOfIncome[i];
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
            addIncome(event, logedInUser, bill);
        });

        // append the h2 and item-details to the ion-toggle
        ionToggle.appendChild(h2);
        ionToggle.appendChild(itemDetails);

        // append the ion-toggle to the ion-item
        ionItem.appendChild(ionToggle);

        // append the ion-item to the ion-list
        billIncomeList.appendChild(ionItem);
    }

}




function addDebt(event, logedInUser, bill,) {

    let user = new User(logedInUser.username, logedInUser.password, logedInUser.listOfIncome, logedInUser.listOfBills)
    const toggleElement = event.target;

    bill.payed = !toggleElement.checked;

    user.calculate()
    localStorage.setItem("user", JSON.stringify(user));
    billsBills.innerText = user.debt
    billsResult.innerText = user.result
}

function addIncome(event, logedInUser, bill,) {

    let user = new User(logedInUser.username, logedInUser.password, logedInUser.listOfIncome, logedInUser.listOfBills)
    const toggleElement = event.target;

    bill.payed = !toggleElement.checked;

    user.calculate()
    localStorage.setItem("user", JSON.stringify(user));
    billsIncome.innerText = user.income
    billsResult.innerText = user.result
}





function updateHeader() {
    let user = new User(logedInUser.username, logedInUser.password, logedInUser.listOfIncome, logedInUser.listOfBills)

    greetingName.textContent = greetingName.textContent.replaceAll("@name", user.username)
    balanceName.textContent = balanceName.textContent.replaceAll("@amount", "€" + user.result);

    billsIncome.textContent = billsIncome.textContent.replace("@amount","€" + user.getIncome())
    billsBills.textContent = billsBills.textContent.replace("@amount","€" + user.getDebt())
    billsResult.textContent = billsResult.textContent.replace("@amount","€" + user.getResult())

}




function deleteUser() {
    localStorage.removeItem('user');
    window.location = "../Index.html";
}







