class User {

    username;
    password;
    balance = 0;
    debt = 0;



    incomingBills = [];
    payedBills = [];



    constructor(username, password) {
        this.username = username;
        this.password = password;
    }


    addBill(bill){
       this.incomingBills.push(bill)
    }

    payBill(bill) {
        locationOfBill = this.incomingBills.indexOf(bill);
        this.incomingBills.slice(bill,1)
        this.payedBills.push(bill)
    }




}
