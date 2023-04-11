
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
