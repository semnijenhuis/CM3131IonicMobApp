const assert = require('assert');
const User = require('../Components/User.js');
const Category = require('../Components/Category.js');

function testUser() {
    // create a new user
    const user = new User("user123", "password123", [], [], "USD");

    let housing = new Category("Housing");
    let transportation = new Category("Transportation");
    let food = new Category("Food");
    user.newBillCategory(housing);

    user.newBillCategory(transportation);
    user.newBillCategory(food);

    let salary = new Category("Salary");
    let investment = new Category("Investment");
    let rental = new Category("Rental");

    user.newIncomeCategory(salary);
    user.newIncomeCategory(investment);
    user.newIncomeCategory(rental);


// add an income bill
    user.addIncome({id: 1, category: "Salary", amount: 1000, payed: false});
    console.assert(user.listOfIncome.length === 1, "Error: Income bill not added");

// add a bill
    user.addBill({id: 2, category: "Housing", amount: 500, payed: false});
    console.assert(user.listOfBills.length === 1, "Error: Bill not added");

// delete an income bill
    user.deleteIncomeBill({id: 1, category: "salary", amount: 1000, payed: false});
    console.assert(user.listOfIncome.length === 0, "Error: Income bill not deleted");

// delete a bill
    user.deleteOutgoingBill({id: 2, category: "Housing", amount: 500, payed: false});
    console.assert(user.listOfBills.length === 0, "Error: Bill not deleted");

// test getTotalIncome method
    user.addIncome({id: 1, category: "Investment", amount: 1000, payed: false});
    user.addIncome({id: 2, category: "bonus", amount: 500, payed: false});
    console.assert(parseInt(user.getIncome()) === 1500.00, "Error: getTotalIncome method not working");

// test getTotalBill method
    user.addBill({id: 3, category: "Housing", amount: 500, payed: false});
    user.addBill({id: 4, category: "Transportation", amount: 200, payed: false});
    console.assert(parseInt(user.getTotalBill()) === 700, "Error: getTotalBill method not working");

    console.log("Test succeed - User")
}

module.exports = { testUser };
