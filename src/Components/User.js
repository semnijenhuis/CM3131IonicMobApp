class User {

    username;
    password;
    bankAccount = 0;
    income = 0;
    debt = 0;
    result = 0;
    currency;

    listOfIncome = [];
    listOfBills = [];

    listOfCategoryIncome = [];
    listOfCategoryBill = [];

    constructor(username, password, listOfIncome, listOfBills, currency) {
        this.username = username;
        this.password = password;

        this.listOfIncome = listOfIncome;
        this.listOfBills = listOfBills;

        this.income = this.getIncome();
        this.debt = this.getDebt();
        this.result = this.getResult();
        this.bankAccount = 0.00;
        this.currency = this.setCurrencySymbol(currency);
    }

    // Calculation for user income/debt
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
        let bank = parseInt(this.bankAccount)
        let income = parseInt(this.getIncome());
        let debt = parseInt(this.getDebt());
        let totalCredit = bank + income;
        let total = totalCredit - debt;
        let num = parseFloat(total);
        return num.toFixed(2);
    }

    calculate()  {
        this.income = this.getIncome();
        this.debt = this.getDebt();
        this.result = this.getResult();

        this.setPercentageBill()
        this.setPercentageIncome()
    }



    // Calculate the total of all income/debt
    getTotalIncome() {
        let total = parseInt(0)
        for (let i = 0; i < this.listOfCategoryIncome.length; i++) {
            let categoryElement = this.listOfCategoryIncome[i];
            let number = parseInt(categoryElement.amount)
            total = total + number;
        }
        return total;
    }

    getTotalBill() {
        let total = parseInt(0)
        for (let i = 0; i < this.listOfCategoryBill.length; i++) {
            let categoryElement = this.listOfCategoryBill[i];
            let number = parseInt(categoryElement.amount)
            total = total + number;
        }
        return total;
    }


    // Calculate the percentage of the total category
    setPercentageIncome() {

        let totalIncome = this.getTotalIncome();

        for (let i = 0; i < this.listOfCategoryIncome.length; i++) {
            let categoryElement = this.listOfCategoryIncome[i];
            let number = parseInt(categoryElement.amount)
            categoryElement.percentage = number / totalIncome;
        }

    }

    setPercentageBill() {

        let totalIncome = this.getTotalBill();

        for (let i = 0; i < this.listOfCategoryBill.length; i++) {
            let categoryElement = this.listOfCategoryBill[i];
            let number = parseInt(categoryElement.amount)
            categoryElement.percentage = number / totalIncome;
        }

    }


    // The bill functions, add & deleting
    addBill(bill) {
        this.listOfBills.push(bill);
        this.addCategoryBill(bill)
        this.calculate();
    }

    addIncome(bill) {
        this.listOfIncome.push(bill)
        this.addCategoryIncome(bill)
        this.calculate();

    }

    deleteIncomeBill(incomeBill) {
        const index = this.listOfIncome.findIndex(bill => bill.id === incomeBill.id);
        if (index !== -1) {
            this.listOfIncome.splice(index, 1);
            this.removeCategoryIncome(incomeBill)

        } else {
            console.log('Income bill not found:', incomeBill);
        }
        this.calculate();
    }

    deleteOutgoingBill(incomeBill) {
        const index = this.listOfBills.findIndex(bill => bill.id === incomeBill.id);
        if (index !== -1) {
            this.listOfBills.splice(index, 1);
            this.removeCategoryBill(incomeBill)
        } else {
            console.log('Income bill not found:', incomeBill);
        }
        this.calculate();
    }


    // The category functions, create, add, delete
    newBillCategory(category) {
        this.listOfCategoryBill.push(category)
    }

    newIncomeCategory(category) {
        this.listOfCategoryIncome.push(category)
    }

    addCategoryIncome(bill) {
        for (let i = 0; i < this.listOfCategoryIncome.length; i++) {
            let foundCategory = this.listOfCategoryIncome[i];
            if (foundCategory.name === bill.category) {
                let foundNumber = parseFloat(foundCategory.amount);
                let billNumber = parseFloat(bill.amount);
                foundCategory.amount = foundNumber + billNumber;
            }

        }

        this.setPercentageIncome()
    }

    addCategoryBill(bill) {

        for (let i = 0; i < this.listOfCategoryBill.length; i++) {
            let foundCategory = this.listOfCategoryBill[i];
            if (foundCategory.name === bill.category) {
                let foundNumber = parseFloat(foundCategory.amount);
                let billNumber = parseFloat(bill.amount);
                foundCategory.amount = foundNumber + billNumber;
            }

        }
        this.setPercentageBill()
    }

    removeCategoryIncome(bill) {
        for (let i = 0; i < this.listOfCategoryIncome.length; i++) {
            let foundCategory = this.listOfCategoryIncome[i];
            if (foundCategory.name === bill.category) {
                let foundNumber = parseFloat(foundCategory.amount);
                let billNumber = parseFloat(bill.amount);
                foundCategory.amount = foundNumber - billNumber;
            }

        }
    }

    removeCategoryBill(bill) {
        for (let i = 0; i < this.listOfCategoryBill.length; i++) {
            let foundCategory = this.listOfCategoryBill[i];
            if (foundCategory.name === bill.category) {
                let foundNumber = parseFloat(foundCategory.amount);
                let billNumber = parseFloat(bill.amount);
                foundCategory.amount = foundNumber - billNumber;
            }

        }
    }


    // Currency options, setting, switching and recalculation
    setCurrencySymbol(input) {
        if (input.toUpperCase() === "EUR" || input.toUpperCase() === "EURO" || input.toUpperCase() === "€") {
            return "€";
        } else if (input.toUpperCase() === "GBP" || input.toUpperCase() === "POUND" || input.toUpperCase() === "£") {
            return "£";
        } else {
            return "NaN"
        }
    }

    switchCurrency(input, exchangeRate) {
        let inputToCap = input.toUpperCase();
        if (inputToCap === "EUR" || inputToCap === "EURO" || inputToCap === "€") {
            if (this.currency !== "€") {
                this.currency = "€"
                this.reCalculate(exchangeRate)
            } else {
                console.log("Cant change it to euro, its already in euro")
            }
        } else if (inputToCap === "GBP" || inputToCap === "POUND" || inputToCap === "£") {

            if (this.currency !== "£") {
                this.currency = "£"
                this.reCalculate(exchangeRate)
            }
        } else {
            console.log("Couldn't find the correct one, you tried : " + input)
        }


    }

    reCalculate(exchangeRate) {
        let bank = parseInt(this.bankAccount)
        this.bankAccount = bank * exchangeRate;

        for (const billInc of this.listOfIncome) {
            let newAmount = billInc.amount * exchangeRate;
            billInc.amount = newAmount.toFixed(2)
        }

        for (const billOut of this.listOfBills) {
            let newAmount = billOut.amount * exchangeRate;
            billOut.amount = newAmount.toFixed(2)
        }

    }


    // JSON export options
    exportBills() {
        return this.listOfBills.filter(bill => bill instanceof Bill).map(bill => bill.toJSON());
    }

    exportIncome() {
        return this.listOfIncome.map((bill) => bill.toJSON());
    }

}

// Node.js export
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = User;
}

// Browser export
if (typeof window !== 'undefined') {
    window.User = User;
}
