// Test.Bill.js
const assert = require('assert');
const Bill = require('../Components/bill.js');

function testBill() {
    // Test creating a new Bill
    const bill = new Bill('Rent', 1000, '2023-04-01', 'Housing');
    assert.strictEqual(bill.name, 'Rent');
    assert.strictEqual(bill.amount, 1000);
    assert.strictEqual(bill.date, '2023-04-01');
    assert.strictEqual(bill.category, 'Housing');
    assert.strictEqual(bill.payed, false);

    // Test setting payed status
    const emptyBill = new Bill('', null, '', undefined);
    assert.strictEqual(emptyBill.checkBill(), true);

    console.log("Test succeed - Bill")
}

module.exports = { testBill };
