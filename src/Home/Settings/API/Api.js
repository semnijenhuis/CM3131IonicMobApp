const cancelButton =document.getElementById('cancel');

cancelButton.addEventListener("click", backToHome)

function backToHome(){
    console.log("pressed to go back home")
    window.location = "../../Home.html";
}

function euroToPound(amount) {
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

    return outcome;
}

function poundToEuro(amount) {
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

    return outcome;
}

function inflation(country) {
    const apiKey = 'QunjuVBtotwXToWcbGHCKQ==GtCi7vkiXRQ5f4Bk';
    const url = `https://api.api-ninjas.com/v1/inflation?country=${country}`;
    const headers = {
        'X-Api-Key': apiKey,
        'Content-Type': 'application/json'
    };

    return fetch(url, { headers })
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
            console.log(monthly)
            console.log(monthly)
            return result;
        })
        .catch(error => {
            console.error('Error:', error);
            return null;
        });
}
