let logedInUser = JSON.parse(localStorage.getItem("user"));

let valutEuoToPound = 2;
let valutaPoundToEuro = 0.5;

const cancelButton = document.getElementById('cancel');
const currencySwitch = document.getElementById('currencySwitch')

const nameCol = document.getElementById('inflationcol-name')
const curCol = document.getElementById('inflationcol-current')
const futCol = document.getElementById('inflationcol-future')

const nameColYear = document.getElementById('inflationcol-name-year')
const curColYear = document.getElementById('inflationcol-current-year')
const futColYear = document.getElementById('inflationcol-future-year')


cancelButton.addEventListener("click", backToHome)
currencySwitch.addEventListener("ionChange", function (event) {
    const isChecked = event.detail.checked;
    switchCurrency(isChecked)
});

// euroToPound()
// poundToEuro()

generateInfTableMonth();
generateInfTableYear();
currencyCheck()




async function generateInfTableMonth() {
    try {
        let inflationRate = await inflationMonth('United States');
        for (let i = 0; i < logedInUser.listOfCategoryBill.length; i++) {
            let foundcategory = logedInUser.listOfCategoryBill[i];

            let nameColItem = document.createElement("p");
            nameColItem.innerText = foundcategory.name;
            nameCol.appendChild(nameColItem);

            let curColItem = document.createElement("p");
            curColItem.innerText = logedInUser.currency + " " + foundcategory.amount;
            curCol.appendChild(curColItem);

            let furColItem = document.createElement("p");
            furColItem.innerText = logedInUser.currency + " " + inflationMonthCal(foundcategory.amount, inflationRate);
            futCol.appendChild(furColItem);
        }
    } catch (error) {
        console.error(error);
    }
}

async function generateInfTableYear() {
    try {
        let inflationRate = await inflationYear('United States');
        for (let i = 0; i < logedInUser.listOfCategoryBill.length; i++) {
            let foundcategory = logedInUser.listOfCategoryBill[i];

            let nameColItem = document.createElement("p");
            nameColItem.innerText = foundcategory.name;
            nameColYear.appendChild(nameColItem);

            let curColItem = document.createElement("p");
            curColItem.innerText = logedInUser.currency + " " + foundcategory.amount;
            curColYear.appendChild(curColItem);

            let furColItem = document.createElement("p");
            furColItem.innerText = logedInUser.currency + " " + inflationYearCal(foundcategory.amount, inflationRate);
            futColYear.appendChild(furColItem);
        }
    } catch (error) {
        console.error(error);
    }
}


// Calculates inflation
function inflationMonthCal(price, inflationRate) {
    let numb = 0.00;

    numb = price + (price * inflationRate / 100)

    return numb.toFixed(2);

}

function inflationYearCal(price, inflationRate) {
    let numb = 0.00;

    numb = price + (price * inflationRate / 100)

    return numb.toFixed(2);

}

function inflationMonth(country) {
    const apiKey = 'QunjuVBtotwXToWcbGHCKQ==GtCi7vkiXRQ5f4Bk';
    const url = `https://api.api-ninjas.com/v1/inflation?country=${country}`;
    const headers = {
        'X-Api-Key': apiKey,
        'Content-Type': 'application/json'
    };

    return fetch(url, {headers})
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(result => {

            console.log(result);
            let monthly = result[0].monthly_rate_pct;
            let yearly = result[0].yearly_rate_pct;

            return monthly;
        })
        .catch(error => {
            console.error('Error:', error);
            return null;
        });
}

function inflationYear(country) {
    const apiKey = 'QunjuVBtotwXToWcbGHCKQ==GtCi7vkiXRQ5f4Bk';
    const url = `https://api.api-ninjas.com/v1/inflation?country=${country}`;
    const headers = {
        'X-Api-Key': apiKey,
        'Content-Type': 'application/json'
    };

    return fetch(url, {headers})
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(result => {

            console.log(result);
            let monthly = result[0].monthly_rate_pct;
            let yearly = result[0].yearly_rate_pct;
            return yearly;
        })
        .catch(error => {
            console.error('Error:', error);
            return null;
        });
}


// Calculate conversion valuta

function switchCurrency(bool) {
    let user = new User(logedInUser.username, logedInUser.password, logedInUser.listOfIncome, logedInUser.listOfBills, logedInUser.currency)
    user.bankAccount = logedInUser.bankAccount
    user.listOfCategoryIncome = logedInUser.listOfCategoryIncome
    user.listOfCategoryBill = logedInUser.listOfCategoryBill

    if (bool) {

        user.switchCurrency("Pound", valutEuoToPound);
    } else {

        user.switchCurrency("Euro", valutaPoundToEuro);

    }

    localStorage.setItem("user", JSON.stringify(user));
    // window.location.reload();

}

function euroToPound()   {
    let amount = 1;
    let outcome;
    let numb = parseInt(amount);
    let myHeaders = new Headers();
    myHeaders.append("apikey", "IUV1s5W2F3a8jDYnuOSmUzcNv970Phcj");
    let requestOptions = {
        method: "GET",
        redirect: "follow",
        headers: myHeaders,
    };
    fetch(
        `https://api.apilayer.com/exchangerates_data/convert?to=GBP&from=EUR&amount=${numb}`,
        requestOptions
    )
        .then((response) => response.json())
        .then((data) => {
            outcome = data.result;
            console.log(outcome);
        })
        .catch((error) => console.log("error", error));

    console.log(outcome)
    valutEuoToPound = outcome;

}

function poundToEuro() {
    let amount = 1;
    let outcome;
    let numb = parseInt(amount);
    let myHeaders = new Headers();
    myHeaders.append("apikey", "IUV1s5W2F3a8jDYnuOSmUzcNv970Phcj");
    let requestOptions = {
        method: "GET",
        redirect: "follow",
        headers: myHeaders,
    };
    fetch(
        `https://api.apilayer.com/exchangerates_data/convert?to=EUR&from=GBP&amount=${numb}`,
        requestOptions
    )
        .then((response) => response.json())
        .then((data) => {
            outcome = data.result;
            console.log(outcome);
        })
        .catch((error) => console.log("error", error));

    console.log(outcome)

    valutaPoundToEuro = outcome;
}

function currencyCheck() {
    if (logedInUser.currency === "€") {

        currencySwitch.checked = false;
    } else if (logedInUser.currency === "£") {

        currencySwitch.checked = true;
    } else {
        console.log("couldnt find currency" + logedInUser.currency)
    }
}

function backToHome() {
    window.location = "../../Home.html";
}




