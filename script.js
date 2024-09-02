var riddleNumber = 1; //

var Answers = ["hello","data","1889","yuvan","0.9"];
var submitTexts = ["Find 2nd QR","Find 3rd QR","Find 4th QR","Find 5th QR","Complete"];

var SearchPlaces = ["Search near Conference Hall Notice Board", "Search near Opposite to Digital Reading Room","Search near Flags","Search Below Quadrangle Staircase","Meet us in Computer Lab", ];

document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    let riddleNumberWhole = params.get("riddle");

    // If you specifically want to remove "0628" from the riddleNumber:
    riddleNumber = riddleNumberWhole.replace("0628", "");

    console.log(riddleNumber);    
});

function checkPassword() {
    const userPassword = document.getElementById("password").value;
    const correctPassword = "datum@2425";
    if (userPassword === correctPassword) {
        document.querySelector('.password-container').style.display = 'none';
        document.getElementById(`riddle-container`).style.display = 'block';
        document.getElementById(`question${riddleNumber}`).style.display = 'block';
        document.getElementById("submitButton").innerHTML  = submitTexts[riddleNumber - 1];
    } else {
        document.getElementById("password-result").innerHTML = "<p>Incorrect password. Please try again.</p>";
    }
}

function checkAnswer() {
    const userAnswer = document.getElementById("answer").value.trim().toLowerCase();
    const teamNumber = document.getElementById("team-number").value.trim();

    const correctAnswer = Answers[riddleNumber - 1];
 
    if (teamNumber === "" || userAnswer === "") {
        console.log("Returning");
        document.getElementById("result").innerHTML = "<p>Please enter both your team number and your answer.</p>";
        return;
    }
    if (userAnswer === correctAnswer) {
        console.log("Correct answer");
        fetch('https://7a64e7d9-bf55-43f7-aa4c-65c439da2644-00-16i0j2plwirjo.pike.replit.dev:8000/addAnswer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                TeamID: teamNumber,
                riddleNumber: riddleNumber,
                Answer: `${userAnswer} : ${getISTTimestamp()}` 
            }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log('Answer submitted successfully:', data);
            } else {
                console.error('Error submitting answer:', data.error);
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
        document.getElementById("result").innerHTML = `<p>Correct! ${SearchPlaces[riddleNumber - 1]}</p>`;
    } else {
        console.log("Wrong answer");
        document.getElementById("result").innerHTML = "<p>Incorrect. Try again!</p>";
    }
}

function getISTTimestamp() {
    // Get the current UTC time
    const now = new Date();
    
    // Convert UTC time to IST by adding 5 hours and 30 minutes
    const istOffset = 5 * 60 * 60 * 1000 + 30 * 60 * 1000; // 5 hours and 30 minutes in milliseconds
    const istTime = new Date(now.getTime() + istOffset);
    
    return istTime.toISOString(); // Return the IST time in ISO 8601 format
}
