class Category {

    name;
    amount = 0;
    percentage= 0;

    constructor(name) {
        this.name = name;
        this.amount = 0;
        this.percentage = 0;
    }

    toJSON() {
        return {
            name: this.name,
            amount: this.amount,
        };
    }


}
module.exports = Category;
