// Displays current day at top of page
var today = moment();
$("#currentDay").text(today.format("MMMM Do YYYY"));

// Selects elements from html and assigns them to variables
var rowContainer = document.querySelector(".rowContainer");
var save = document.querySelector(".saveBtn");

var times = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22];

function createRow (time) {
    var row = document.createElement("div");
    row.classList.add("row");
    var hourCol = document.createElement("div");
    hourCol.classList.add("col", "hour");
    hourCol.textContent = time + ":00"
    row.appendChild(hourCol);
    var textCol = document.createElement("div");
    textCol.classList.add("col-6");
    // if timeblock passed, add class .past
    
    // 10.10
    var currentHour = Number(moment().format("H"))

    // if time < current hour  -- past
    if(time < currentHour){
        textCol.classList.add('past');
    }

    // if time == current hour -- presnt
    if(time === currentHour){
        textCol.classList.add('present');
    }

    // if time > current hour -- future
    if(time > currentHour){
        textCol.classList.add('future');
    }

    row.appendChild(textCol);
    var textInput = document.createElement("textarea");
    textInput.classList.add("textarea");
    textCol.appendChild(textInput);
    var saveCol = document.createElement("div");
    saveCol.classList.add("col", "hour");
    row.appendChild(saveCol);
    var saveBtn = document.createElement("button");
    saveBtn.classList.add("saveBtn");
    saveBtn.textContent = "Save";
    saveCol.appendChild(saveBtn);
    saveBtn.addEventListener("click", function() {
        event.preventDefault()
        scheduleText = [];
        if (textInput.value === "") {
            window.alert("Please enter a message to save.");
        } else {
            scheduleText.push(textInput.value);
            localStorage.setItem("scheduleText", JSON.stringify(scheduleText));
            displayMessage ();


        }
    })

    function displayMessage() {
        var userSchedule = JSON.parse(localStorage.getItem("scheduleText"));
        if (scheduleText !== null) {
            textInput.textContent = userSchedule;
        }
    
    }


    return row


    
}

for (var i = 0; i < times.length; i++) {
    var time = times[i]
    var row = createRow (time);
    rowContainer.appendChild(row);
    
}




// when save clicked, user input saved to local storage and displayed in relevant timeblock
// stays on refresh

