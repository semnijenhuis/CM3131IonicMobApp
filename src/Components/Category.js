class Category {

    name;
    amount = 0;
    percentage = 0;

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

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = Category;
}

// Browser export
if (typeof window !== 'undefined') {
    window.User = Category;
}
