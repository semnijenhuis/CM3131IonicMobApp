console.log("Incoming file started")
let logedInUser = JSON.parse(localStorage.getItem("user"));

const incomeIncomeList = document.getElementById('income-incomeList')

const addIncomeModal = document.getElementById('income-newBill-modal')
const editIncomeModal = document.getElementById('income-edit-newBill-modal')

const incomeConfirmButton = document.getElementById('income-confirm-btn')
const incomeCancelButton = document.getElementById('income-cancel-btn')

const incomeEditConfirmButton = document.getElementById('income-edit-confirm-btn')
const incomeEditCancelButton = document.getElementById('income-edit-cancel-btn')

const incomeBillNameInput = document.getElementById('income-bill-name');
const incomeBillAmountInput = document.getElementById('income-bill-amount');
const incomeBillDateInput = document.getElementById('income-bill-date');
const incomeBillCategoryInput = document.getElementById('income-bill-category');

const incomeBillEditIDInput = document.getElementById('income-edit-bill-id');
const incomeBillEditBalanceInput = document.getElementById('income-edit-bill-bankBalance');
const incomeBillEditNameInput = document.getElementById('income-edit-bill-name');
const incomeBillEditAmountInput = document.getElementById('income-edit-bill-amount');
const incomeBillEditDateInput = document.getElementById('income-edit-bill-date');
const incomeBillEditCategoryInput = document.getElementById('income-edit-bill-category');


incomeConfirmButton.addEventListener("click", billConfirmed)
incomeCancelButton.addEventListener("click", billCancel)

incomeBillEditBalanceInput.addEventListener("input", function() {
    logedInUser.bankAccount = incomeBillEditBalanceInput.value;
    localStorage.setItem("user", JSON.stringify(logedInUser));
});

incomeEditConfirmButton.addEventListener("click", editBillConfirmed)
incomeEditCancelButton.addEventListener("click", editBillCancel)

generateIncomingList();



function billConfirmed() {

    let user = new User(logedInUser.username, logedInUser.password, logedInUser.listOfIncome, logedInUser.listOfBills)
    newBill = new Bill(incomeBillNameInput.value, incomeBillAmountInput.value, incomeBillDateInput.value, incomeBillCategoryInput.value)
    user.addIncome(newBill)

    localStorage.setItem("user", JSON.stringify(user));


    refreshIncomeList()

    addIncomeModal.dismiss();

}

function billCancel() {
    console.log("pressed no")
    addIncomeModal.dismiss();

}


function editBillConfirmed() {


    newBill = new Bill(incomeBillEditNameInput.value, incomeBillEditAmountInput.value, incomeBillEditDateInput.value, incomeBillEditCategoryInput.value)
    newBill.id = incomeBillEditIDInput.value;

    editBill(newBill)

    localStorage.setItem("user", JSON.stringify(logedInUser));


    refreshIncomeList()

    editIncomeModal.dismiss();

}


function editBillCancel() {
    console.log("pressed no")
    editIncomeModal.dismiss();
}


function deleteBill(billToDelete) {
    billID = billToDelete.id
    logedInUser.listOfIncome = logedInUser.listOfIncome.filter(bill => bill.id !== billID);

    // save the updated user object back to local storage
    localStorage.setItem("user", JSON.stringify(logedInUser));
    refreshIncomeList();
}

function editBill(billToEdit) {
    // Iterate through the listOfIncome array
    logedInUser.listOfIncome.forEach((bill, index) => {
        // If the bill has the same id as billToEdit, update it
        if (bill.id === billToEdit.id) {
            logedInUser.listOfIncome[index] = billToEdit;
        }
    });

    // save the updated user object back to local storage
    localStorage.setItem("user", JSON.stringify(logedInUser));

    refreshIncomeList();
}


function generateIncomingList() {


    if (logedInUser.listOfIncome) {
        for (let i = 0; i < logedInUser.listOfIncome.length; i++) {
            let bill = logedInUser.listOfIncome[i];

            // create the ion-item
            let ionItem = document.createElement("ion-item");


            // create the h2 element and set its text content
            let h2 = document.createElement("h2");
            h2.textContent = bill.name;

            // create the item-details span
            let itemDetails = document.createElement("span");
            itemDetails.setAttribute("class", "item-details");

            // create the item-date span and set its text content
            let itemDate = document.createElement("span");
            itemDate.setAttribute("class", "item-date");
            itemDate.textContent = bill.date;

            // create the item-price span and set its text content
            let itemPrice = document.createElement("span");
            itemPrice.setAttribute("class", "item-price");
            itemPrice.textContent = "€" + bill.amount;

            // append the item-date and item-price spans to the item-details span
            itemDetails.appendChild(itemDate);
            itemDetails.appendChild(itemPrice);


            ionItem.addEventListener("click", function (event) {
                openActionSheet(bill);
            });

            // append the h2 and item-details to the ion-toggle
            ionItem.appendChild(h2);
            ionItem.appendChild(itemDetails);


            // append the ion-item to the ion-list
            incomeIncomeList.appendChild(ionItem);
        }
    }

}

function openActionSheet(bill) {


    const actionSheet = document.createElement('ion-action-sheet');

    actionSheet.buttons = [
        {
            text: 'Edit',
            handler: () => {
                const billDate = new Date(bill.date);
                const formattedDate = billDate.getFullYear() + '-' + (billDate.getMonth() + 1).toString().padStart(2, '0') + '-' + billDate.getDate().toString().padStart(2, '0');

                incomeBillEditIDInput.value = bill.id;
                incomeBillEditNameInput.value = bill.name;
                incomeBillEditAmountInput.value = bill.amount;
                incomeBillEditDateInput.value = formattedDate;
                incomeBillEditCategoryInput.value = bill.category;

                console.log(bill)
                editIncomeModal.present();
            }
        },

        {
            text: 'Delete',
            role: 'destructive',
            handler: () => {
                // call the deleteBill function with the bill object as a parameter
                deleteBill(bill);
            }
        },

        {
            text: 'Cancel',
            role: 'cancel',
            data: {
                action: 'cancel'
            }
        }
    ];

    actionSheet.addEventListener('ionActionSheetDidDismiss', () => {
        // remove the action sheet from the DOM after it is dismissed
        actionSheet.remove();
    });

    document.body.appendChild(actionSheet);
    actionSheet.present();

}

function refreshIncomeList() {
    incomeIncomeList.innerHTML = ""; // clear the current list
    generateIncomingList(); // call the function to generate the updated list
}
