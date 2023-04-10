class User {

    username;
    password;
    bankAccount = 0;
    income = 0;
    debt = 0;
    result = 0;

    listOfIncome = [];
    listOfBills = [];



    constructor(username, password, listOfIncome, listOfBills) {
        this.username = username;
        this.password = password;

        this.listOfIncome = listOfIncome;
        this.listOfBills = listOfBills;

        this.income = this.getIncome();
        this.debt = this.getDebt();
        this.result = this.getResult();

    }


    addBill(bill){
       this.listOfBills.push(bill);
        this.calculate();
    }

    addIncome(bill){
        this.listOfIncome.push(bill)
    }

    getIncome() {
        let total = 0;
        for (let i = 0; i < this.listOfIncome.length; i++) {
            let foundBill = this.listOfIncome[i];
            if (foundBill.payed === false) {
                total = total + this.listOfIncome[i].amount;
            }

        }
        return total.toFixed(2);
    }

    getDebt() {
        let total = 0;
        for (let i = 0; i < this.listOfBills.length; i++) {
            let foundBill = this.listOfBills[i];
            if (foundBill.payed === false) {
                total = total + this.listOfBills[i].amount;
            }

        }
        return total.toFixed(2);
    }

    getResult() {
        let income = this.getIncome();
        let debt = this.getDebt();
        let total = income - debt;
        return total.toFixed(2);
    }

    calculate(){
        this.income = this.getIncome();
        this.debt = this.getDebt();
        this.result = this.getResult();
    }







}
