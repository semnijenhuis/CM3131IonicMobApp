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
        this.bankAccount = 0;

    }

    toJSON() {
        const { username, password, bankAccount, income, debt, result, listOfIncome, listOfBills } = this;
        return {
            username,
            password,
            bankAccount,
            income,
            debt,
            result,
            listOfIncome: listOfIncome.map((bill) => bill.toJSON()),
            listOfBills: listOfBills.map((bill) => bill.toJSON()),
        };
    }









    addBill(bill){
       this.listOfBills.push(bill);
        this.calculate();
    }

    addIncome(bill){
        this.listOfIncome.push(bill)
        this.calculate();
    }

    getIncome() {
        let total = 0;
        for (let i = 0; i < this.listOfIncome.length; i++) {
            let foundBill = this.listOfIncome[i];
            if (foundBill.payed === false) {
                let num = parseFloat(foundBill.amount);
                total = total + num
            }

        }

        return total.toFixed(2);
    }

    getDebt() {
        let total = 0;

        for (let i = 0; i < this.listOfBills.length; i++) {
            let foundBill = this.listOfBills[i];
            if (foundBill.payed === false) {
                let num = parseFloat(foundBill.amount);
                total = total + num
            }


        }

        return total.toFixed(2);
    }

    getResult() {
        let income = this.getIncome();
        let debt = this.getDebt();
        let total = income - debt;
        let num = parseFloat(total);
        return num.toFixed(2);
    }

    calculate(){
        this.income = this.getIncome();
        this.debt = this.getDebt();
        this.result = this.getResult();
    }


    exportBills() {
        return this.listOfBills.filter(bill => bill instanceof Bill).map(bill => bill.toJSON());
    }

    exportIncome() {
        return this.listOfIncome.map((bill) => bill.toJSON());
    }









}
