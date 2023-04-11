
const usernameInput = document.getElementById('username-input');
const passwordInput = document.getElementById('password-input');

// const password = document.getElementById('Password');
const loginButton = document.getElementById('logIn');
loginButton.addEventListener("click",getLogedIn);





let user;


function mainLogin(){
    window.location = "./Login/Login.html";
}




function getLogedIn() {
    // const username = usernameInput.value;
    // const password = passwordInput.value;

    const username = "sem";
    const password = "password"


    if (username === "" || password === "") {

        const emptyFieldsToast = document.getElementById('empty-fields-toast');
        emptyFieldsToast.present();

    } else {

        const user = new User(username,password,[],[])


        const bill1 = new Bill("Netflix",15.0,"10-05-2023","subscription")
        const bill2 = new Bill("Disney",25.5,"04-08-2023","subscription")
        const bill3 = new Bill("Prime",15.5,"23-03-2023","subscription")

        bill1.id = 123;
        bill2.id = 223;
        bill3.id = 323;

        user.addBill(bill1);
        user.addBill(bill2);
        user.addBill(bill3);

        const bill4 = new Bill("RGU",1800.50,"1-03-2023","Work")
        const bill5 = new Bill("TaxOffice",300.50,"1-03-2023","Taxes")
        const bill6 = new Bill("Uber",150.50,"1-03-2023","Work")
        bill4.id = 100;
        bill5.id = 200;
        bill6.id = 300;


        user.addIncome(bill4);
        user.addIncome(bill5);
        user.addIncome(bill6);



        localStorage.setItem("user", JSON.stringify(user));
        mainHome();
    }


}
