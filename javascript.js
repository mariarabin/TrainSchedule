// Steps to complete:
function startTime() {
    var today = new Date();
    var h = today.getHours();
    //h = h > 12 ? h - 12 : h;
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('date_time').innerHTML =
        h + ":" + m + ":" + s;
    var t = setTimeout(startTime, 500);
}
function checkTime(i) {
    if (i < 10) { i = "0" + i };  // add zero in front of numbers < 10
    return i;
}

// 1. Initialize Firebase
var config = {
    apiKey: "AIzaSyDsnorFGOoFwG95r1nidZTEAz8gBn3T4u4",
    authDomain: "trainschedule-6fdb6.firebaseapp.com",
    databaseURL: "https://trainschedule-6fdb6.firebaseio.com",
    projectId: "trainschedule-6fdb6",
    storageBucket: "trainschedule-6fdb6.appspot.com",
    messagingSenderId: "1089707283413"
};
firebase.initializeApp(config);

var database = firebase.database();

// 2. Create button for adding new train schedule - then update the html + update the database
$("#add-train-btn").on("click", function (event) {
    event.preventDefault();

    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var destination = $("#dest-input").val().trim();
    var firstTraintime = $("#start-input").val().trim();
    var freq = $("#freq-input").val().trim();

    // Creates local "temporary" object for holding train data
    var newTrain = {
        trainName: trainName,
        destination: destination,
        firstTraintime: firstTraintime,
        freq: freq
    };

    // Uploads employee data to the database
    database.ref().push(newTrain);

    alert("New Train Schedule has been successfully added");

    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#dest-input").val("");
    $("#start-input").val("");
    $("#freq-input").val("");
});

// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());

    // Store everything into a variable.
    var trainName = childSnapshot.val().trainName;
    var destination = childSnapshot.val().destination;
    var firstTraintime = childSnapshot.val().firstTraintime;
    var freq = childSnapshot.val().freq;

    var startTimeConverted = moment(firstTraintime, "hh:mm").subtract(1, "years");
    var startTimeConverted2 = moment(startTimeConverted).format("HH:mm");
    var currentTime = moment();
    var diffTime = moment().diff(moment(startTimeConverted), "minutes");

    var tRemainder = diffTime % freq;
    var tMinutesTillTrain = freq - tRemainder;
    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    var catchTrain = moment(nextTrain).format("HH:mm");

    console.log("nextTrain is: " + nextTrain)
    console.log("catchTrain is: " + catchTrain)
    console.log("startTimeConverted2 is: " + startTimeConverted2)

    if (startTimeConverted2 < catchTrain) {

        // Create the new row
        var newRow = $("<tr>").append(
            $("<td>").html(trainName),
            $("<td>").html(destination),
            $("<td>").html(freq),
            $("<td>").html(catchTrain),
            $("<td>").html(tMinutesTillTrain),

        );
        //console.log(newRow);
        // Append the new row to the table
        $("#new-train-table > tbody").append(newRow);
    }

    else {
        var newRow = $("<tr>").append(
            $("<td>").html(trainName),
            $("<td>").html(destination),
            $("<td>").html(freq),
            $("<td>").html(startTimeConverted2),
            $("<td>").html("Not yet started"),

        );
        //console.log(newRow);
        // Append the new row to the table
        $("#new-train-table > tbody").append(newRow);
    }


});

