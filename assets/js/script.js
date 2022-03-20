//set a variable to the current date
var CurrentDayVariable = moment().format("dddd, MMMM Do");
//set a interval is run every 12 hours to update the time
setInterval(() => {
  CurrentDayVariable = moment().format("dddd, MMMM Do");
}, 1000 * 60 * 60);
//display the date use the element with the id "currentDay"
$("#currentDay").text(CurrentDayVariable);

//add a click listner on all the elements with the class of time-slot
$(".row").on("click", ".time-slot", function () {
  //get the text of the element clicked and trim it then store it in a variable
  let text = $(this).text().trim();
  //create a textarea element and add a class to it
  let textInput = $("<textarea>");
  textInput
    .addClass(" text-field-input col-md-9 col-8 text-md-left")
    .text(text);
  //replace the target of the event with the textarea element and trigger the focus state
  $(this).replaceWith(textInput);
  //auto focuses the textarea
  textInput.trigger("focus");
});

//on blur of a textarea with a parent of ".row"
$(".row").on("blur", "textarea", function () {
  var text = $(this).val().trim();
  var timeSlot = $("<div><div/>");
  timeSlot
    .addClass("col-md-9 col-8 time-slot pt-3 text-md-left")
    .text(text);
  $(this).replaceWith(timeSlot);
});

//get a node list of all the time periods and give them a data-id from 9 to 17
let listOfTimeBlocks = $(".task-to-do");
for (i = 0; i < listOfTimeBlocks.length; i++) {
  $(listOfTimeBlocks[i]).attr("data-id", i + 9);
}

//delare time periods
let timeOfDay = [
  "9:00am",
  "10:00am",
  "11:00am",
  "12:00pm",
  "1:00pm",
  "2:00pm",
  "3:00pm",
  "4:00pm",
  "5:00pm",
];

//interval for every 20 minutes, goes through each time and checks to see if it is greater than or less than the current time
setInterval(() => {}, 1000 * 60 * 20);

timeOfDay.forEach((time) => {
  time = moment(time, "h:mma");

  if (moment() > time) {
    switch (time.format("h:mma")) {
      case "9:00am":
        $(listOfTimeBlocks[0]).addClass("past");
        break;
      case "10:00am":
        $(listOfTimeBlocks[1]).addClass("past");
        break;
      case "11:00am":
        $(listOfTimeBlocks[2]).addClass("past");
        break;
      case "12:00pm":
        $(listOfTimeBlocks[3]).addClass("past");
        break;
      case "1:00pm":
        $(listOfTimeBlocks[4]).addClass("past");
        break;
      case "2:00pm":
        $(listOfTimeBlocks[5]).addClass("past");
        break;
      case "3:00pm":
        $(listOfTimeBlocks[6]).addClass("past");
        break;
      case "4:00pm":
        $(listOfTimeBlocks[7]).addClass("past");
        break;
      case "5:00pm":
        $(listOfTimeBlocks[8]).addClass("past");
        break;
    }
  }
});
