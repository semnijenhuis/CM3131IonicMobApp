
const loginButton = document.getElementById('loginUser');
loginButton.addEventListener("click",getLogedIn);
let user;

function mainLogin(){
    window.location = "./Login/Login.html";
}




function getLogedIn() {
    const user = new User("Dick","Pass")
    localStorage.setItem("user", JSON.stringify(user));
    mainHome();


    // let userParam = encodeURIComponent(JSON.stringify(user));
    // window.location = "../Home/Home.html?user="+userParam;


}
