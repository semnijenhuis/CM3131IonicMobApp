const {testBill} = require('./Test.Bill');
const {testCategory} = require('./Test.Category');
const {testUser} = require('./Test.User');

const tests = [testBill, testCategory, testUser];

for (const test of tests) {
    try {
        test();
    } catch (error) {
        console.error(`${test.name} - Test failed with error: ${error}`);
    }
}
