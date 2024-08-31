var riddleNumber = 1;

var Answers = ["hello","data","1889","Yuvan","0.9"];

document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    riddleNumber = params.get("riddle");

    console.log(riddleNumber);    
});

function checkPassword() {
    const userPassword = document.getElementById("password").value;
    const correctPassword = "datum@2425";
    if (userPassword === correctPassword) {
        document.querySelector('.password-container').style.display = 'none';
        document.getElementById(`riddle${riddleNumber}-container`).style.display = 'block';
    } else {
        document.getElementById("password-result").innerHTML = "<p>Incorrect password. Please try again.</p>";
    }
}

function checkAnswer() {
    const userAnswer = document.getElementById("answer").value.trim().toUpperCase();
    const teamNumber = document.getElementById("team-number").value.trim();
    const correctAnswer = Answers[riddleNumber];
    if (teamNumber === "" || userAnswer === "") {
        document.getElementById("result").innerHTML = "<p>Please enter both your team number and your answer.</p>";
        return;
    }
    if (userAnswer === correctAnswer) {
        document.getElementById("result").innerHTML = "<p>Correct! Now you can find the 2nd QR code in the vending machine</p>";
    } else {
        document.getElementById("result").innerHTML = "<p>Incorrect. Try again!</p>";
    }
}
