
class Bill {

    id;
    name;
    amount;
    date;
    category;
    payed;



    constructor(name, amount, date, category) {
        this.id = Date.now();
        this.name = name;
        this.amount = amount;
        this.date = date;
        this.category = category;
        this.payed = false;
    }

    checkBill() {

        if (
            this.name === "" || this.name === null ||
            this.amount === "" || this.amount === null ||
            this.date === "" || this.date === null ||
            this.category === "" || this.category === null || this.category === undefined
        ) {
            return true
        }
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            amount: this.amount,
            date: this.date,
            category: this.category,
            payed: this.payed,
        };
    }


}
module.exports = Bill;
