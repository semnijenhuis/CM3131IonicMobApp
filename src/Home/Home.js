// Home screen


const greetingName = document.getElementById('lbl-greeting');
const balanceName = document.getElementById('lbl-balance');
const logOut = document.getElementById('settings-logOut-btn');
const filterButton = document.getElementById('startFilter');


// Bills screen

const CURID1 = document.getElementById('currencyID1')
const CURID2 = document.getElementById('currencyID2')
const CURID3 = document.getElementById('currencyID3')
const CURID4 = document.getElementById('currencyID4')

const billsBankAccount = document.getElementById('bills-bankaccount')
const billsIncome = document.getElementById('bills-income')
const billsBills = document.getElementById('bills-bills')
const billsResult = document.getElementById('bills-result')
const billList = document.getElementById('billList')
const billIncomeList = document.getElementById('bill-incomeList')


logOut.addEventListener("click",deleteUser);


const currencySwitch = document.getElementById('currencySwitch')




currencySwitch.addEventListener("ionChange", function(event) {
    const isChecked = event.detail.checked;
    switchCurrency(isChecked)
});




// const settingButton = document.getElementById('settings-account-btn');
// settingButton.addEventListener("click", startSettings);

const overviewBtn = document.getElementById('settings-Overview-btn');
const apiBtn = document.getElementById('settings-API-btn');

overviewBtn.addEventListener('click', () => {
    window.location.href ='Settings/Overview/Overview.html'
});

apiBtn.addEventListener('click', () => {
    window.location.href ='Settings/API/Api.html'
});

filterButton.addEventListener("click", startFilter);




let logedInUser = JSON.parse(localStorage.getItem("user"));
let debt = logedInUser.debt;

billsBankAccount.innerText = logedInUser.bankAccount
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

function startSettings(){
    window.location.href = "Settings/Settings.html";
}



generateBillList()
generateIncomingList()
currencyCheck()




function generateBillList(){


    console.log(logedInUser.listOfBills.length)

    for (let i = 0; i < logedInUser.listOfBills.length; i++) {
        let bill = logedInUser.listOfBills[i];

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
        itemPrice.textContent =  logedInUser.currency +" " +bill.amount;

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

function generateIncomingList(){

    console.log(logedInUser.listOfIncome.length)

    for (let i = 0; i < logedInUser.listOfIncome.length; i++) {
        let bill = logedInUser.listOfIncome[i];

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
        itemPrice.textContent =  logedInUser.currency +" " +bill.amount;

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

    let user = new User(logedInUser.username, logedInUser.password, logedInUser.listOfIncome, logedInUser.listOfBills,logedInUser.currency)
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

    let user = new User(logedInUser.username, logedInUser.password, logedInUser.listOfIncome, logedInUser.listOfBills,logedInUser.currency)
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





function updateHeader() {
    let user = new User(logedInUser.username, logedInUser.password, logedInUser.listOfIncome, logedInUser.listOfBills ,logedInUser.currency)
    user.bankAccount = logedInUser.bankAccount
    user.listOfCategoryIncome = logedInUser.listOfCategoryIncome
    user.listOfCategoryBill = logedInUser.listOfCategoryBill
    user.calculate();

    greetingName.textContent = greetingName.textContent.replaceAll("@name", user.username)
    balanceName.textContent = balanceName.textContent.replaceAll("@amount", logedInUser.currency + user.result)

    billsBankAccount.textContent = billsBankAccount.textContent.replace("@amount",user.bankAccount)
    billsIncome.textContent = billsIncome.textContent.replace("@amount", user.getIncome())
    billsBills.textContent = billsBills.textContent.replace("@amount",user.getDebt())
    billsResult.textContent = billsResult.textContent.replace("@amount",user.getResult())

    CURID1.innerText = logedInUser.currency;
    CURID2.innerText = logedInUser.currency;
    CURID3.innerText = logedInUser.currency;
    CURID4.innerText = logedInUser.currency;

    localStorage.setItem("user", JSON.stringify(user));

}

function switchCurrency(bool){
    let user = new User(logedInUser.username, logedInUser.password, logedInUser.listOfIncome, logedInUser.listOfBills ,logedInUser.currency)
    user.bankAccount = logedInUser.bankAccount
    user.listOfCategoryIncome = logedInUser.listOfCategoryIncome
    user.listOfCategoryBill = logedInUser.listOfCategoryBill

    console.log(bool)

    if (bool) {
        user.switchCurrency("Pound",2);
    }
    else {
        user.switchCurrency("Euro",0.5);

    }

    localStorage.setItem("user", JSON.stringify(user));
    window.location.reload();

}

function currencyCheck() {
    currencySwitch.checked = logedInUser.currency === "£";
}


function deleteUser() {
    localStorage.removeItem('user');
    window.location = "../Index.html";
}


// animatie progressbar
const progressBar = document.getElementById('progressbar');
animateProgressBar(progressBar, 75, 1000);

function animateProgressBar(progressBar, percentage, duration) {
    const startValue = parseFloat(progressBar.getAttribute('value') || '0');
    const endValue = percentage / 100;
    const startTime = performance.now();

    function animate(currentTime) {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        const value = startValue + progress * (endValue - startValue);

        progressBar.setAttribute('value', value);

        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }

    requestAnimationFrame(animate);
}





