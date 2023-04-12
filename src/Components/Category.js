class Category {

    name;
    amount;
    percentage;

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
