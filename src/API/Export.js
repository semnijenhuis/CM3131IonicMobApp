
function exportBills(user) {

    for (let i = 0; i < user.listOfIncome; i++) {
        let foundBill = user.listOfIncome[i];
        let newBill = new Bill(foundBill.name,foundBill.amount,foundBill.date,foundBill.category)
        newBill.id = foundBill.id;
        newBill.payed = foundBill.payed;
        console.log(newBill.toJSON())

    }

}

function exportIncome () {

}
