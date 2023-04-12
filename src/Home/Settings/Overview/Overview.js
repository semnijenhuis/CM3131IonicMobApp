let logedInUser = JSON.parse(localStorage.getItem("user"));

const colIncTitle = document.getElementById('overView-income-title')
const colBillTitle = document.getElementById('overView-bill-title')

const colIncBar = document.getElementById('overView-income-bar')
const colBillBar = document.getElementById('overView-bill-bar')

const cancelButton =document.getElementById('cancel');

cancelButton.addEventListener("click", backToHome)

function backToHome(){
    console.log("pressed to go back home")
    window.location = "../../Home.html";
}

generateOverviewIncome()
generateOverviewBill()


function generateOverviewIncome() {
    for (let i = 0; i < logedInUser.listOfCategoryIncome.length; i++) {
        let categoryElement = logedInUser.listOfCategoryIncome[i];

        // Create the title element
        let title = document.createElement("p");
        title.textContent = categoryElement.name;
        colIncTitle.appendChild(title);

        // Create the progress bar container
        let progressBarContainer = document.createElement("div");
        progressBarContainer.style.height = "20px"; // Set a fixed height
        colIncBar.appendChild(progressBarContainer);

        // Create the progress bar
        let progressBar = document.createElement("ion-progress-bar");
        progressBar.setAttribute("id", `progressbar${i + 1}`);
        progressBar.setAttribute("class", "progressBar");
        progressBar.setAttribute("value", categoryElement.percentage);
        progressBar.setAttribute("color", "primary");
        progressBar.style.height = "100%"; // Fill the container
        progressBar.style.marginTop = "1px"; // Remove the top margin

        progressBarContainer.appendChild(progressBar);
    }
}
function generateOverviewBill() {
    for (let i = 0; i < logedInUser.listOfCategoryBill.length; i++) {
        let categoryElement = logedInUser.listOfCategoryBill[i];

        let title = document.createElement("p");
        title.textContent = categoryElement.name;
        colBillTitle.appendChild(title);

        // Create the progress bar container
        let progressBarContainer = document.createElement("div");
        progressBarContainer.style.height = "20px"; // Set a fixed height
        colBillBar.appendChild(progressBarContainer);

        // Create the progress bar
        let progressBar = document.createElement("ion-progress-bar");
        progressBar.setAttribute("id", `progressbar${i + 1}`);
        progressBar.setAttribute("class", "progressBar");
        progressBar.setAttribute("value", categoryElement.percentage);
        progressBar.setAttribute("color", "primary");
        progressBar.style.height = "100%"; // Fill the container
        progressBar.style.marginTop = "1px"; // Remove the top margin

        progressBarContainer.appendChild(progressBar);


    }


}
