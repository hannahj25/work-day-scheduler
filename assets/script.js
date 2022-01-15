// Displays current day at top of page
var today = moment();
$("#currentDay").text(today.format("MMMM Do YYYY"));

// Selects elements from html and assigns them to variables
var rowContainer = document.querySelector(".rowContainer");
var save = document.querySelector(".saveBtn");

// Creates an array designating timeslots
var times = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22];

var scheduleText = [];

// Creates a row for each timeslot, including text input and save button
function createRow (time) {
    var row = document.createElement("div");
    row.classList.add("row");
    var hourCol = document.createElement("div");
    hourCol.classList.add("col", "hour");
    hourCol.textContent = time + ":00"
    row.appendChild(hourCol);
    var textCol = document.createElement("div");
    textCol.classList.add("col-6");
    // Create a variable using the current time
    var currentHour = Number(moment().format("H"));
    // If time slot is earlier than current time, adds .past class
    if(time < currentHour){
        textCol.classList.add('past');
    }
    // If time slot is concurrent with current time, adds .present class
    if(time === currentHour){
        textCol.classList.add('present');
    }
    // If time slot is ahead of current time, adds .future class
    if(time > currentHour){
        textCol.classList.add('future');
    }
    row.appendChild(textCol);
    var textInput = document.createElement("textarea");
    textInput.classList.add("textarea");
    textInput.setAttribute("beta-time", time);
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
        if (textInput.value === "") {
            window.alert("Please enter a message to save.");
        } else {
            scheduleText.push(textInput.value);
            localStorage.setItem("scheduleText", JSON.stringify(scheduleText));


        }

        
    })

    displayMessage()

    return row

    function displayMessage() {
        var userSchedule = JSON.parse(localStorage.getItem("scheduleText"));
        if (scheduleText !== null) {
            textInput.textContent = userSchedule;
        }
        $(".textarea").val(localStorage.getItem("scheduleText"));

    }   

    
}


    



for (var i = 0; i < times.length; i++) {
    var time = times[i]
    var row = createRow (time);
    rowContainer.appendChild(row);
    
}

createRow ()


// when save clicked, user input saved to local storage and displayed in relevant timeblock
// stays on refresh

