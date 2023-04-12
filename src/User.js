class User {

    username;
    password;
    bankAccount = 0;
    income = 0;
    debt = 0;
    result = 0;

    listOfIncome = [];
    listOfBills = [];

    listOfCategoryIncome = [];
    listOfCategoryBill = [];




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


    getTotalIncome() {
        let total =parseInt(0)
        for (let i = 0; i < this.listOfCategoryIncome.length; i++) {
            let categoryElement = this.listOfCategoryIncome[i];
            let number = parseInt(categoryElement.amount)
            total = total +number;
        }
        return total;
    }

    getTotalBill() {
        let total =parseInt(0)
        for (let i = 0; i < this.listOfCategoryBill.length; i++) {
            let categoryElement = this.listOfCategoryBill[i];
            let number = parseInt(categoryElement.amount)
            total = total +number;
        }
        return total;
    }

    setPercentageIncome() {

        let totalIncome = this.getTotalIncome();

        for (let i = 0; i <this.listOfCategoryIncome.length; i++) {
            let categoryElement = this.listOfCategoryIncome[i];
            let number = parseInt(categoryElement.amount)
            categoryElement.percentage = number/totalIncome;
        }

    }
    setPercentageBill() {

        let totalIncome = this.getTotalBill();

        for (let i = 0; i <this.listOfCategoryBill.length; i++) {
            let categoryElement = this.listOfCategoryBill[i];
            let number = parseInt(categoryElement.amount)
            categoryElement.percentage = number/totalIncome;
        }

    }



    addIncome(bill){
        this.listOfIncome.push(bill)
        this.addCategoryIncome(bill)
        this.calculate();
        console.log("add bill runn")

    }
    deleteIncomeBill(incomeBill){
        const index = this.listOfIncome.findIndex(bill => bill.id === incomeBill.id);
        if (index !== -1) {
            this.listOfIncome.splice(index, 1);
            this.removeCategoryIncome(incomeBill)
            console.log('Income bill deleted:', incomeBill);
        } else {
            console.log('Income bill not found:', incomeBill);
        }
        this.calculate();
    }

    addBill(bill){
        this.listOfBills.push(bill);
        this.addCategoryBill(bill)
        this.calculate();
        console.log("add bill runn")
    }
    deleteOutgoingBill(incomeBill){
        const index = this.listOfBills.findIndex(bill => bill.id === incomeBill.id);
        if (index !== -1) {
            this.listOfBills.splice(index, 1);
            this.removeCategoryBill(incomeBill)
            console.log('Income bill deleted:', incomeBill);
        } else {
            console.log('Income bill not found:', incomeBill);
        }
        this.calculate();
    }



    newBillCategory(category){
        this.listOfCategoryBill.push(category)
    }
    newIncomeCategory(category){
        this.listOfCategoryIncome.push(category)
    }

    addCategoryIncome(bill){
        for (let i = 0; i < this.listOfCategoryIncome.length; i++) {
            let foundCategory = this.listOfCategoryIncome[i];
            if (foundCategory.name === bill.category) {
                let foundNumber = parseFloat(foundCategory.amount);
                let billNumber = parseFloat(bill.amount);
                foundCategory.amount = foundNumber +billNumber;
            }

        }

        this.setPercentageIncome()
    }

    addCategoryBill(bill){
        for (let i = 0; i < this.listOfCategoryBill.length; i++) {
            let foundCategory = this.listOfCategoryBill[i];
            if (foundCategory.name === bill.category) {
                let foundNumber = parseFloat(foundCategory.amount);
                let billNumber = parseFloat(bill.amount);
                foundCategory.amount = foundNumber +billNumber;
            }

        }
        this.setPercentageBill()
    }


    removeCategoryIncome(bill){
        for (let i = 0; i < this.listOfCategoryIncome.length; i++) {
            let foundCategory = this.listOfCategoryIncome[i];
            if (foundCategory.name === bill.category) {
                let foundNumber = parseFloat(foundCategory.amount);
                let billNumber = parseFloat(bill.amount);
                foundCategory.amount = foundNumber -billNumber;
            }

        }
    }

    removeCategoryBill(bill){
        for (let i = 0; i < this.listOfCategoryBill.length; i++) {
            let foundCategory = this.listOfCategoryBill[i];
            if (foundCategory.name === bill.category) {
                let foundNumber = parseFloat(foundCategory.amount);
                let billNumber = parseFloat(bill.amount);
                foundCategory.amount = foundNumber -billNumber;
            }

        }
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

        console.log("start")
        this.setPercentageBill()
        this.setPercentageIncome()
        console.log(this.listOfCategoryBill)
        console.log("end")
    }


    exportBills() {
        return this.listOfBills.filter(bill => bill instanceof Bill).map(bill => bill.toJSON());
    }

    exportIncome() {
        return this.listOfIncome.map((bill) => bill.toJSON());
    }









}
