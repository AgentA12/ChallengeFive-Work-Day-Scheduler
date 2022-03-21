var timeSlot;

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
  //get the text of the element clicked and trim it then store it in a variable, get the id too
  let text = $(this).text().trim();
  let uniqueId = $(this).attr("id");

  //create a textarea element and add a class and the specific id to it
  let textInput = $("<textarea>");
  textInput
    .addClass("text-field-input col-md-9 col-8 text-md-left")
    .text(text)
    .attr("id", uniqueId);

  //replace the target of the event with the textarea element and trigger the focus state
  $(this).replaceWith(textInput);
  //auto focuses the textarea
  textInput.trigger("focus");
});

//on blur of a textarea with a parent of ".row"
$(".row").on("blur", "textarea", function () {
  //get the text and the id
  var text = $(this).val().trim();
  let secondId = $(this).attr("id");

  timeSlot = $("<div><div/>");
  timeSlot.removeClass("past present future");
  //call getbackgroundcolor to assign the right color dynamically, then add bootstrap classes for styling
  timeSlot = getBgColor(timeSlot, secondId);
  timeSlot
    .addClass("col-md-9 col-8 time-slot pt-3 text-md-left")
    .text(text)
    .attr("id", secondId);

  //replace the textarea with the new time lot div
  $(this).replaceWith(timeSlot);
});

//select all elements with the class of timeslot and call a loop on them
$(".time-slot").each(function (index) {
  //remove classes to ensure that no extra classes are applied
  $(this).removeClass("past present future");
  //delcare times of the day to reference
  let timeOfDayInterval = [
    { eight: "8:00am" },
    { nine: "9:00am" },
    { ten: "10:00am" },
    { eleven: "11:00am" },
    { twelve: "12:00pm" },
    { one: "1:00pm" },
    { two: "2:00pm" },
    { three: "3:00pm" },
    { four: "4:00pm" },
    { five: "5:00pm" },
    { six: "6:00pm" },
  ];
  //get the current elements id
  let currentDivAttr = $(this).attr("id");
  //loop through the dates array
  for (i = 0; i < timeOfDayInterval.length; i++) {
    //if the current elements id value matches the key of the days array check time
    if (timeOfDayInterval[i][currentDivAttr]) {
      //declare a variable as a moment object for the value of the matching time array and a variable thats one hour ahead
      let firstMoment = moment(timeOfDayInterval[i][currentDivAttr], "h:mma");
      let secondMoment = moment(
        timeOfDayInterval[i][currentDivAttr],
        "h:mma"
      ).add(1, "hours");
      //check if the times are either inbetween or after and apply the approprite color class, then return out of the loop
      if (moment().isBetween(firstMoment, secondMoment)) {
        $(this).addClass("present");
        return;
      } else if (!firstMoment.isAfter(moment())) {
        $(this).addClass("past");
        return;
      } else {
        $(this).addClass("future");
        return;
      }
    }
  }
});

//add a click event listener on the save icons
$(".fa-regular").click(function () {
  //alert the user
  //alert("Saved to local storage!")
  //create array of objects for local storage
  let taskData = [];

  //get the matching time-slot elements text content and id to use for local storage
  let storageId = $(this).parent().siblings().closest(".time-slot").attr("id");
  let textContent = $(this).parent().siblings().closest(".time-slot").text();
  //push to task array. NOTE: to add a key dynamically, use {[keyName]: valueName}. not {keyName: valueName}
  taskData.push({ [storageId]: textContent });

  saveTasks(taskData);
});

function getBgColor(div, id) {
  //declare an array of objects to hold time of day
  let timeOfDay = [
    { eight: "8:00am" },
    { nine: "9:00am" },
    { ten: "10:00am" },
    { eleven: "11:00am" },
    { twelve: "12:00pm" },
    { one: "1:00pm" },
    { two: "2:00pm" },
    { three: "3:00pm" },
    { four: "4:00pm" },
    { five: "5:00pm" },
    { six: "6:00pm" },
  ];

  //NOTE: correct way of indexing into a array of objects is arrayName[index][key] NOT: arrayName[i].index
  for (i = 0; i < timeOfDay.length; i++) {
    if (timeOfDay[i][id]) {
      let firstMoment = moment(timeOfDay[i][id], "h:mma");
      let secondMoment = moment(timeOfDay[i][id], "h:mma").add(1, "hours");

      if (moment().isBetween(firstMoment, secondMoment)) {
        div.addClass("present");
        return div;
      } else if (!firstMoment.isAfter(moment())) {
        div.addClass("past");
        return div;
      } else {
        div.addClass("future");
        return div;
      }
    }
  }
}

function saveTasks() {}
