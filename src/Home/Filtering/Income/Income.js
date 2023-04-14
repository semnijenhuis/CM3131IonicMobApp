let logedInUser = JSON.parse(localStorage.getItem("user"));
let selectedCategory;

// All lists
const incomeIncomeList = document.getElementById('income-incomeList')
const categoryList = document.getElementById('categoryList')
const categoryListEdit = document.getElementById('income-edit-bill-category')

// All modals
const addIncomeModal = document.getElementById('income-newBill-modal')
const editIncomeModal = document.getElementById('income-edit-newBill-modal')

// All buttons
const incomeConfirmButton = document.getElementById('income-confirm-btn')
const incomeCancelButton = document.getElementById('income-cancel-btn')
const incomeEditConfirmButton = document.getElementById('income-edit-confirm-btn')
const incomeEditCancelButton = document.getElementById('income-edit-cancel-btn')
const cancelButton = document.getElementById('cancel');

// all input fields
const incomeBillNameInput = document.getElementById('income-bill-name');
const incomeBillAmountInput = document.getElementById('income-bill-amount');
const incomeBillDateInput = document.getElementById('income-bill-date');
const incomeBillEditIDInput = document.getElementById('income-edit-bill-id');
const incomeBillEditBalanceInput = document.getElementById('income-edit-bill-bankBalance');
const incomeBillEditNameInput = document.getElementById('income-edit-bill-name');
const incomeBillEditAmountInput = document.getElementById('income-edit-bill-amount');
const incomeBillEditDateInput = document.getElementById('income-edit-bill-date');
const incomeBillEditCategoryInput = document.getElementById('income-edit-bill-category');

// All eventListeners
categoryList.addEventListener('ionChange', (event) => {
    // get the selected option's value
    selectedCategory = event.target.value;
});
cancelButton.addEventListener("click", backToHome)
incomeConfirmButton.addEventListener("click", billConfirmed)
incomeCancelButton.addEventListener("click", billCancel)
incomeBillEditBalanceInput.addEventListener("input", function () {
    logedInUser.bankAccount = incomeBillEditBalanceInput.value;
    localStorage.setItem("user", JSON.stringify(logedInUser));
});
incomeEditConfirmButton.addEventListener("click", editBillConfirmed)
incomeEditCancelButton.addEventListener("click", editBillCancel)


generateIncomingList();
generateCategory(categoryList);
generateCategory(categoryListEdit);


// Generates the list based on the user data
function generateIncomingList() {

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
    incomeIncomeList.appendChild(titlesRow);

    for (let i = 0; i < logedInUser.listOfIncome.length; i++) {
        let bill = logedInUser.listOfIncome[i];

        let name = document.createElement("h3");
        name.textContent = bill.name;

        let amount = document.createElement("p");
        amount.textContent = logedInUser.currency + " " + bill.amount;

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

        incomeIncomeList.appendChild(row)
    }
}

function generateCategory(list) {
    if (list !== null) {
        for (let i = 0; i < logedInUser.listOfCategoryIncome.length; i++) {
            let categoryElement = logedInUser.listOfCategoryIncome[i];
            let ionItem = document.createElement("ion-select-option");
            ionItem.innerText = categoryElement.name;
            ionItem.value = categoryElement.name;
            list.appendChild(ionItem);
        }
    }


}


// Creates a new bill
function billConfirmed() {

    let user = new User(logedInUser.username, logedInUser.password, logedInUser.listOfIncome, logedInUser.listOfBills, logedInUser.currency)
    user.bankAccount = logedInUser.bankAccount
    user.listOfCategoryIncome = logedInUser.listOfCategoryIncome
    user.listOfCategoryBill = logedInUser.listOfCategoryBill

    let newBill = new Bill(incomeBillNameInput.value, incomeBillAmountInput.value, incomeBillDateInput.value, selectedCategory)
    if (!newBill.checkBill()) {

        user.addIncome(newBill)


        localStorage.setItem("user", JSON.stringify(user));
        refreshIncomeList()

        addIncomeModal.dismiss();

    }


}

function editBillConfirmed() {

    let newBill = new Bill(incomeBillEditNameInput.value, incomeBillEditAmountInput.value, incomeBillEditDateInput.value, incomeBillEditCategoryInput.value)
    newBill.id = incomeBillEditIDInput.value;

    if (!newBill.checkBill()) {
        editBill(newBill)

        localStorage.setItem("user", JSON.stringify(logedInUser));
        refreshIncomeList()

        editIncomeModal.dismiss();
    }


}


// Deletes a new bill
function deleteBill(billToDelete) {

    let user = new User(logedInUser.username, logedInUser.password, logedInUser.listOfIncome, logedInUser.listOfBills, logedInUser.currency)
    user.bankAccount = logedInUser.bankAccount
    user.listOfCategoryIncome = logedInUser.listOfCategoryIncome
    user.listOfCategoryBill = logedInUser.listOfCategoryBill

    user.deleteIncomeBill(billToDelete)


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


// Cancels the option to create a bill
function billCancel() {
    addIncomeModal.dismiss();

}

function editBillCancel() {
    editIncomeModal.dismiss();
}


// Refresh list and edit a bill
function refreshIncomeList() {
    incomeIncomeList.innerHTML = ""; // clear the current list
    generateIncomingList(); // call the function to generate the updated list
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

function backToHome() {

    window.location = "./../Home.html";
}




