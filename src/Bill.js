
class Bill {

    name;
    amount;
    date;
    payed;



    constructor(name, amount, date) {
        this.name = name;
        this.amount = amount;
        this.date = date;
        this._payed = false;
    }



    set payed(value) {
        this._payed = value;
    }
}
