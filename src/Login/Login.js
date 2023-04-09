
const usernameInput = document.getElementById('username-input');
const passwordInput = document.getElementById('password-input');

// const password = document.getElementById('Password');
const loginButton = document.getElementById('logIn');
loginButton.addEventListener("click",getLogedIn);





let user;


function mainLogin(){
    window.location = "./Login/Login.html";
}




function getLogedIn() {
    // const username = usernameInput.value;
    // const password = passwordInput.value;

    const username = "sem";
    const password = "password"


    if (username === "" || password === "") {

        const emptyFieldsToast = document.getElementById('empty-fields-toast');
        emptyFieldsToast.present();

    } else {

        const user = new User(username,password)
        const bill1 = new Bill("Netflix",12.2,"10-05-2023","subscription")
        const bill2 = new Bill("Disney",82.6,"04-08-2023","subscription")
        const bill3 = new Bill("Prime",17.5,"23-03-2023","subscription")
        user.addBill(bill1);
        user.addBill(bill2);
        user.addBill(bill3);

        localStorage.setItem("user", JSON.stringify(user));
        mainHome();
    }


}
