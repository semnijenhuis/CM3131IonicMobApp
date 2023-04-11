import Bill from '../Bill.js';

function testToJSON() {
    const bill = new Bill('Rent', 1000, '2023-04-15', 'Housing');
    const expected = {
        name: 'Rent',
        amount: 1000,
        date: '2023-04-15',
        category: 'Housing',
        payed: false,
    };
    const result = bill.toJSON();
    console.assert(JSON.stringify(result) === JSON.stringify(expected), 'toJSON test failed');
}

testToJSON();
