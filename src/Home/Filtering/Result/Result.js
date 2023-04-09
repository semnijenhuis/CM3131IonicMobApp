const backHomeButton =document.getElementById('goBackHome')

console.log("Result file started")
backHomeButton.addEventListener("click", backToHome)

function backToHome(){
    console.log("pressed to go back home")
    window.location = "./../Home.html";
}
