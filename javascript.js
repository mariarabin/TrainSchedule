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


// 3. Create a way to retrieve employees from the employee database.
// 4. Create a way to calculate the months worked. Using difference between start and current time.
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Total billed

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

    // Logs everything to console
    console.log(newTrain.trainName);
    console.log(newTrain.destination);
    console.log(newTrain.firstTraintime);
    console.log(newTrain.freq);

    alert("New Train Schedule has been successfully added");

    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#dest-input").val("");
    $("#start-input").val("06:00");
    $("#freq-input").val("15");
});

// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());

    // Store everything into a variable.
    var trainName = childSnapshot.val().trainName;
    var destination = childSnapshot.val().destination;
    var firstTraintime = childSnapshot.val().firstTraintime;
    var freq = childSnapshot.val().freq;

    // Train Info
    console.log(trainName);
    console.log(destination);
    console.log(firstTraintime);
    console.log(freq);

    // Prettify the employee start
    //var empStartPretty = moment.unix(empStart).format("MM/DD/YYYY");

    // Calculate the months worked using hardcore math
    // To calculate the months worked
    //var empMonths = moment().diff(moment(empStart, "X"), "months");
    //console.log(empMonths);

    // Calculate the total billed rate
    //var empBilled = empMonths * empRate;
    //console.log(empBilled);

    // Create the new row
    var newRow = $("<tr>").append(
        $("<td>").html(trainName),
        $("<td>").html(destination),
        $("<td>").html(freq)
        //$("<td>").text(timeArrival),
        //$("<td>").text(minsAway),
        //$("<td>").text(empStartPretty),
        //$("<td>").text(empMonths),
        //$("<td>").text(empRate),
        //$("<td>").text(empBilled)
    );
    console.log(newRow);

    // Append the new row to the table
    $("#new-train-table > tbody").append(newRow);
});

  // Example Time Math
  // -----------------------------------------------------------------------------
  // Assume Employee start date of January 1, 2015
  // Assume current date is March 1, 2016

  // We know that this is 15 months.
  // Now we will create code in moment.js to confirm that any attempt we use meets this test case
