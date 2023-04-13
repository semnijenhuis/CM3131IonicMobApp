const usernameInput = document.getElementById('username-input');
const passwordInput = document.getElementById('password-input');

// const password = document.getElementById('Password');
const loginButton = document.getElementById('logIn');
loginButton.addEventListener("click", getLogedIn);


let user;


function mainLogin() {
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

        const user = new User(username, password, [], [], "euro")

        let housing = new Category("Housing");
        let transportation = new Category("Transportation");
        let food = new Category("Food");
        let healthAndWellness = new Category("Health and Wellness");
        let entertainment = new Category("Entertainment");
        let personalCare = new Category("Personal Care");
        let education = new Category("Education");
        let debtPayments = new Category("Debt Payments");
        let travel = new Category("Travel");

        user.newBillCategory(housing);
        user.newBillCategory(transportation);
        user.newBillCategory(food);
        user.newBillCategory(healthAndWellness);
        user.newBillCategory(entertainment);
        user.newBillCategory(personalCare);
        user.newBillCategory(education);
        user.newBillCategory(debtPayments);
        user.newBillCategory(travel);


        let salary = new Category("Salary");
        let investment = new Category("Investment");
        let rental = new Category("Rental");
        let business = new Category("Business");
        let freelance = new Category("Freelance");
        let interest = new Category("Interest");
        let capital_gains = new Category("Capital Gains");
        let pension = new Category("Pension");
        let alimony = new Category("Alimony");
        let social_security = new Category("Social Security");

        user.newIncomeCategory(salary);
        user.newIncomeCategory(investment);
        user.newIncomeCategory(rental);
        user.newIncomeCategory(business);
        user.newIncomeCategory(freelance);
        user.newIncomeCategory(interest);
        user.newIncomeCategory(capital_gains);
        user.newIncomeCategory(pension);
        user.newIncomeCategory(alimony);
        user.newIncomeCategory(social_security);


        const bill1 = new Bill("Appartment", 800.0, "10-05-2023", "Housing")
        const bill2 = new Bill("firstBus", 25.5, "04-08-2023", "Transportation")
        const bill3 = new Bill("Prime", 15.5, "23-03-2023", "Entertainment")

        bill1.id = 123;
        bill2.id = 223;
        bill3.id = 323;

        user.addBill(bill1);
        user.addBill(bill2);
        user.addBill(bill3);

        const bill4 = new Bill("RGU", 1800.50, "1-03-2023", "Salary")
        const bill5 = new Bill("TaxOffice", 300.50, "1-03-2023", "Social Security")
        const bill6 = new Bill("Uber", 150.50, "1-03-2023", "Rental")
        bill4.id = 100;
        bill5.id = 200;
        bill6.id = 300;


        user.addIncome(bill4);
        user.addIncome(bill5);
        user.addIncome(bill6);


        localStorage.setItem("user", JSON.stringify(user));
        mainHome();
    }

    function mainHome(status) {
        console.log("Home Started")
        if (status === true) {
            window.location = "./Home/Home.html";
        } else {
            window.location = "../Home/Home.html";
        }
    }


}
