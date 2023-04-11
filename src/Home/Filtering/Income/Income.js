console.log("Incoming file started")

const incomeIncomeList = document.getElementById('income-incomeList')
const incomeAddBillButton = document.getElementById('income-addBill-btn')

const modal = document.getElementById('income-newBill-modal')
const incomeCancelButton = document.getElementById('income-cancel-btn')
const incomeConfirmButton = document.getElementById('income-confirm-btn')

const incomeBillNameInput = document.getElementById('income-bill-name');
const incomeBillAmountInput = document.getElementById('income-bill-amount');
const incomeBillDateInput = document.getElementById('income-bill-date');
const incomeBillCategoryInput = document.getElementById('income-bill-category');


incomeAddBillButton.addEventListener("click", createNewBill)

incomeConfirmButton.addEventListener("click", billConfirmed)
incomeCancelButton.addEventListener("click", billCanceld)

function billConfirmed(){

    let user = new User(logedInUser.username, logedInUser.password, logedInUser.listOfIncome, logedInUser.listOfBills)
    newBill = new Bill(incomeBillNameInput.value,incomeBillAmountInput.value,incomeBillDateInput.value,incomeBillCategoryInput.value)
    user.addIncome(newBill)

    localStorage.setItem("user", JSON.stringify(user));


    refreshIncomeList()

    modal.dismiss();

}

function billCanceld(){
    console.log("pressed no")
    modal.dismiss();

}




let logedInUser = JSON.parse(localStorage.getItem("user"));





generateIncomingList();

function generateIncomingList(){


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
            itemPrice.textContent =  "€" +bill.amount;

            // append the item-date and item-price spans to the item-details span
            itemDetails.appendChild(itemDate);
            itemDetails.appendChild(itemPrice);


            ionItem.addEventListener("click", function(event) {
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

function openActionSheet(bill){


    const actionSheet = document.createElement('ion-action-sheet');

    actionSheet.buttons = [
        {
            text: 'Delete',
            role: 'destructive',
            handler: () => {
                // call the deleteBill function with the bill object as a parameter
                deleteBill(bill);
            }
        },
        {
            text: 'Share',
            data: {
                action: 'share'
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


function deleteBill(billToDelete){

    billID = billToDelete.id

    logedInUser.listOfIncome = logedInUser.listOfIncome.filter(bill => bill.id !== billID);

    // save the updated user object back to local storage
    localStorage.setItem("user", JSON.stringify(logedInUser));
    refreshIncomeList();
}

function deleteBill(billToEdit) {
    console.log("edit pressed")
}

function refreshIncomeList() {
    incomeIncomeList.innerHTML = ""; // clear the current list
    generateIncomingList(); // call the function to generate the updated list
}
