// TestCategory.Test.js
const assert = require('assert');
const TestCategory = require('../Components/category.js');

function testCategory() {
    // Test creating a new TestCategory
    const category = new TestCategory('Housing');
    assert.strictEqual(category.name, 'Housing');
    assert.strictEqual(category.amount, 0);
    assert.strictEqual(category.percentage, 0);

    // Test toJSON method
    const json = category.toJSON();
    assert.strictEqual(json.name, 'Housing');
    assert.strictEqual(json.amount, 0);

    console.log('Test succeeded - TestCategory');
}

module.exports = { testCategory };
