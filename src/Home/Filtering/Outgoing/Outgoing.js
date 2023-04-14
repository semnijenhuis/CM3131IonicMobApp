let selectedCategoryOutgoing;
let logedInUser2 = JSON.parse(localStorage.getItem("user"));

// All lists
const outgoingBillList = document.getElementById('outgoing-incomeList')
const categoryListOutgoing = document.getElementById('categoryListOutgoing')
const categoryListOutgoingEdit = document.getElementById('categoryListOutgoingEdit')

// All modals
const addOutgoingModal = document.getElementById('outgoing-newBill-modal')
const editOutgoingModal = document.getElementById('outgoing-edit-newBill-modal')

// All buttons
const outgoingConfirmButton = document.getElementById('outgoing-confirm-btn')
const outgoingCancelButton = document.getElementById('outgoing-cancel-btn')
const outgoingEditConfirmButton = document.getElementById('outgoing-edit-confirm-btn')
const outgoingEditCancelButton = document.getElementById('outgoing-edit-cancel-btn')

// all input fields
const outgoingBillNameInput = document.getElementById('outgoing-bill-name');
const outgoingBillAmountInput = document.getElementById('outgoing-bill-amount');
const outgoingBillDateInput = document.getElementById('outgoing-bill-date');
const outgoingBillEditIDInput = document.getElementById('outgoing-edit-bill-id');
const outgoingBillEditNameInput = document.getElementById('outgoing-edit-bill-name');
const outgoingBillEditAmountInput = document.getElementById('outgoing-edit-bill-amount');
const outgoingBillEditDateInput = document.getElementById('outgoing-edit-bill-date');

categoryList.addEventListener('ionChange', (event) => {
    // get the selected option's value
    selectedCategory = event.target.value;
});
outgoingConfirmButton.addEventListener("click", billConfirmed)
outgoingCancelButton.addEventListener("click", billCancel)
outgoingEditConfirmButton.addEventListener("click", editBillConfirmed)
outgoingEditCancelButton.addEventListener("click", editBillCancel)
categoryListOutgoing.addEventListener('ionChange', (event) => {
    // get the selected option's value
    selectedCategoryOutgoing = event.target.value;
});


generateBillList();
generateCategoryOutgoing()
generateCategoryOutgoingEdit();

// Generates the list based on the user data
function generateCategoryOutgoing() {
    for (let i = 0; i < logedInUser2.listOfCategoryBill.length; i++) {
        let categoryElement = logedInUser2.listOfCategoryBill[i];
        let ionItem = document.createElement("ion-select-option");
        ionItem.innerText = categoryElement.name;
        ionItem.value = categoryElement.name;
        categoryListOutgoing.appendChild(ionItem);
    }
}

function generateCategoryOutgoingEdit() {
    for (let i = 0; i < logedInUser.listOfCategoryBill.length; i++) {
        let categoryElement = logedInUser.listOfCategoryBill[i];
        let ionItem = document.createElement("ion-select-option");
        ionItem.innerText = categoryElement.name;
        ionItem.value = categoryElement.name;
        categoryListOutgoingEdit.appendChild(ionItem);
    }
}

function generateBillList() {

    let storageUser = JSON.parse(localStorage.getItem("user"));

    // create the titles row
    let titlesRow = document.createElement("ion-row");
    let titlesName = document.createElement("ion-col");
    titlesName.classList.add('align-middle');
    titlesName.textContent = "Name";
    let titlesAmount = document.createElement("ion-col");
    titlesAmount.classList.add('align-middle');
    titlesAmount.textContent = "Price";
    let titlesPayed = document.createElement("ion-col");
    titlesPayed.classList.add('align-middle');
    titlesPayed.textContent = "";
    titlesRow.appendChild(titlesName);
    titlesRow.appendChild(titlesAmount);
    titlesRow.appendChild(titlesPayed);
    outgoingBillList.appendChild(titlesRow);

    for (let i = 0; i < storageUser.listOfBills.length; i++) {
        let bill = storageUser.listOfBills[i];

        let name = document.createElement("h3");
        name.textContent = bill.name;

        let amount = document.createElement("p");
        amount.textContent = storageUser.currency + " " + bill.amount;

        // create the edit button
        let editButton = document.createElement("ion-button");
        editButton.setAttribute("id", "editBill" + i);
        editButton.classList.add("small-button"); // add class for styling
        editButton.addEventListener("click", function () {
            openActionSheet(bill);
        });

        let editIcon = document.createElement("ion-icon");
        editIcon.setAttribute("name", "create-outline");
        editButton.appendChild(editIcon);

        let colBillName = document.createElement("ion-col");
        colBillName.classList.add('align-middle');
        colBillName.appendChild(name);

        let colBillAmount = document.createElement("ion-col");
        colBillAmount.classList.add('align-middle');
        colBillAmount.appendChild(amount);

        let colBillEdit = document.createElement("ion-col");
        // colBillEdit.classList.add('align-middle');
        colBillEdit.appendChild(editButton);

        let row = document.createElement("ion-row");
        row.appendChild(colBillName);
        row.appendChild(colBillAmount);
        row.appendChild(colBillEdit);

        outgoingBillList.appendChild(row)
    }


}


// Creates a new bill
function billConfirmed() {

    let storageUser = JSON.parse(localStorage.getItem("user"));

    let user = new User(storageUser.username, storageUser.password, storageUser.listOfIncome, storageUser.listOfBills, storageUser.currency)
    user.bankAccount = logedInUser2.bankAccount
    user.listOfCategoryIncome = logedInUser2.listOfCategoryIncome
    user.listOfCategoryBill = logedInUser2.listOfCategoryBill

    newBill = new Bill(outgoingBillNameInput.value, outgoingBillAmountInput.value, outgoingBillDateInput.value, selectedCategoryOutgoing)

    if (!newBill.checkBill()) {
        user.addBill(newBill)
        localStorage.setItem("user", JSON.stringify(user));

        refreshOutgoingList()
        addOutgoingModal.dismiss();
    }


}

function editBillConfirmed() {

    let newBill = new Bill(outgoingBillEditNameInput.value, outgoingBillEditAmountInput.value, outgoingBillEditDateInput.value, categoryListOutgoingEdit.value)
    newBill.id = outgoingBillEditIDInput.value;

    if (!newBill.checkBill()) {

        editBill(newBill)

        localStorage.setItem("user", JSON.stringify(logedInUser2));
        refreshOutgoingList()

        editOutgoingModal.dismiss();
    }



}


// Deletes a new bill
function deleteBill(billToDelete) {
    let user = new User(logedInUser2.username, logedInUser2.password, logedInUser2.listOfIncome, logedInUser2.listOfBills, logedInUser2.currency)
    user.bankAccount = logedInUser2.bankAccount
    user.listOfCategoryIncome = logedInUser2.listOfCategoryIncome
    user.listOfCategoryBill = logedInUser2.listOfCategoryBill

    user.deleteOutgoingBill(billToDelete)

    localStorage.setItem("user", JSON.stringify(logedInUser2));
    refreshIncomeList();
}

function editBill(billToEdit) {

    // let storageUser = JSON.parse(localStorage.getItem("user"));
    // Iterate through the listOfBills array
    logedInUser2.listOfBills.forEach((bill, index) => {
        // If the bill has the same id as billToEdit, update it
        if (bill.id === billToEdit.id) {
            logedInUser2.listOfBills[index] = billToEdit;
        }
    });


    // save the updated user object back to local storage
    localStorage.setItem("user", JSON.stringify(logedInUser2));
    refreshOutgoingList()
}


// Cancels the option to create a bill
function billCancel() {
    addOutgoingModal.dismiss();
}

function editBillCancel() {
    editOutgoingModal.dismiss();
}


// Refresh list and edit a bill
function refreshOutgoingList() {
    outgoingBillList.innerHTML = ""; // clear the current list
    generateBillList(); // call the function to generate the updated list
}

function openActionSheet(bill) {


    const actionSheet = document.createElement('ion-action-sheet');

    actionSheet.buttons = [
        {
            text: 'Edit',
            handler: () => {

                const dateString = bill.date;
                const [day, month, year] = dateString.split("-").map(Number);
                const billDate = new Date(year, month - 1, day);
                const formattedDate = billDate.getFullYear() + '-' + (billDate.getMonth() + 1).toString().padStart(2, '0') + '-' + billDate.getDate().toString().padStart(2, '0');

                outgoingBillEditIDInput.value = bill.id;
                outgoingBillEditNameInput.value = bill.name;
                outgoingBillEditAmountInput.value = bill.amount;
                outgoingBillEditDateInput.value = formattedDate;
                categoryListOutgoingEdit.value = bill.category;

                editOutgoingModal.present();
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
