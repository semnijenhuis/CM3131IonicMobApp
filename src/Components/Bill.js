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
            console.log(this.name)
            console.log(this.amount)
            console.log(this.date)
            console.log(this.category)
            return true
        }
        else {
            return false
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

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = Bill;
}

// Browser export
if (typeof window !== 'undefined') {
    window.User = Bill;
}
