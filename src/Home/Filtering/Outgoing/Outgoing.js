console.log("outgoing file started")

let selectedCategoryOutgoing;

const outgoingBillList = document.getElementById('outgoing-incomeList')

const addOutgoingModal = document.getElementById('outgoing-newBill-modal')
const editOutgoingModal = document.getElementById('outgoing-edit-newBill-modal')

const outgoingConfirmButton = document.getElementById('outgoing-confirm-btn')
const outgoingCancelButton = document.getElementById('outgoing-cancel-btn')

const outgoingEditConfirmButton = document.getElementById('outgoing-edit-confirm-btn')
const outgoingEditCancelButton = document.getElementById('outgoing-edit-cancel-btn')

const outgoingBillNameInput = document.getElementById('outgoing-bill-name');
const outgoingBillAmountInput = document.getElementById('outgoing-bill-amount');
const outgoingBillDateInput = document.getElementById('outgoing-bill-date');
const outgoingBillCategoryInput = document.getElementById('outgoing-bill-category');

const outgoingBillEditIDInput = document.getElementById('outgoing-edit-bill-id');
const outgoingBillEditNameInput = document.getElementById('outgoing-edit-bill-name');
const outgoingBillEditAmountInput = document.getElementById('outgoing-edit-bill-amount');
const outgoingBillEditDateInput = document.getElementById('outgoing-edit-bill-date');
const outgoingBillEditCategoryInput = document.getElementById('outgoing-edit-bill-category');


outgoingConfirmButton.addEventListener("click", billConfirmed)
outgoingCancelButton.addEventListener("click", billCancel)


outgoingEditConfirmButton.addEventListener("click", editBillConfirmed)
outgoingEditCancelButton.addEventListener("click", editBillCancel)


const categoryListOutgoing = document.getElementById('categoryListOutgoing')
const categoryListOutgoingEdit = document.getElementById('categoryListOutgoingEdit')

generateBillList();
generateCategoryOutgoing()
generateCategoryOutgoingEdit();


function generateCategoryOutgoing() {
    for (let i = 0; i < logedInUser.listOfCategoryBill.length; i++) {
        let categoryElement = logedInUser.listOfCategoryBill[i];
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


function billConfirmed() {

    let storageUser = JSON.parse(localStorage.getItem("user"));

    let user = new User(storageUser.username, storageUser.password, storageUser.listOfIncome, storageUser.listOfBills, storageUser.currency)
    user.bankAccount = logedInUser.bankAccount
    user.listOfCategoryIncome = logedInUser.listOfCategoryIncome
    user.listOfCategoryBill = logedInUser.listOfCategoryBill

    newBill = new Bill(outgoingBillNameInput.value, outgoingBillAmountInput.value, outgoingBillDateInput.value, selectedCategoryOutgoing)

    if (!newBill.checkBill()) {

        user.addBill(newBill)

        localStorage.setItem("user", JSON.stringify(user));


        refreshIncomeList()

        addOutgoingModal.dismiss();
    }


}

function billCancel() {
    console.log("pressed no")
    addOutgoingModal.dismiss();

}


function editBillConfirmed() {

    let storageUser = JSON.parse(localStorage.getItem("user"));

    newBill = new Bill(outgoingBillEditNameInput.value, outgoingBillEditAmountInput.value, outgoingBillEditDateInput.value, selectedCategoryOutgoing)
    newBill.id = outgoingBillEditIDInput.value;
    if (!newBill.checkBill()) {
        editBill(newBill)

        localStorage.setItem("user", JSON.stringify(storageUser));


        refreshIncomeList()

        editOutgoingModal.dismiss();
    }


}


function editBillCancel() {
    console.log("pressed no")
    editOutgoingModal.dismiss();
}


function deleteBill(billToDelete) {
    let user = new User(logedInUser.username, logedInUser.password, logedInUser.listOfIncome, logedInUser.listOfBills, logedInUser.currency)
    user.bankAccount = logedInUser.bankAccount
    user.listOfCategoryIncome = logedInUser.listOfCategoryIncome
    user.listOfCategoryBill = logedInUser.listOfCategoryBill

    user.deleteOutgoingBill(billToDelete)


    // save the updated user object back to local storage
    localStorage.setItem("user", JSON.stringify(logedInUser));
    refreshIncomeList();
}

function editBill(billToEdit) {

    let storageUser = JSON.parse(localStorage.getItem("user"));
    // Iterate through the listOfBills array
    storageUser.listOfBills.forEach((bill, index) => {
        // If the bill has the same id as billToEdit, update it
        if (bill.id === billToEdit.id) {
            storageUser.listOfBills[index] = billToEdit;
        }
    });

    // save the updated user object back to local storage
    localStorage.setItem("user", JSON.stringify(storageUser));

    refreshIncomeList();
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

    for (let i = 0; i < logedInUser.listOfBills.length; i++) {
        let bill = logedInUser.listOfBills[i];

        let name = document.createElement("h3");
        name.textContent = bill.name;

        let amount = document.createElement("p");
        amount.textContent = logedInUser.currency + " " + bill.amount;

        // create the edit button
        let editButton = document.createElement("ion-button");
        editButton.setAttribute("id", "editBill" + i);
        editButton.classList.add("small-button"); // add class for styling
        editButton.addEventListener("click", function() {
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

                console.log(bill)
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

function refreshIncomeList() {
    outgoingBillList.innerHTML = ""; // clear the current list
    generateBillList(); // call the function to generate the updated list
}

categoryListOutgoing.addEventListener('ionChange', (event) => {
    // get the selected option's value
    selectedCategoryOutgoing = event.target.value;
    console.log(selectedCategoryOutgoing);
});
