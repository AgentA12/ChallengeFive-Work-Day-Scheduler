var timeSlot;
//delcare times of the day to reference
var timeOfDay = [
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
  var text = $(this).text().trim();
  var uniqueId = $(this).attr("id");

  //create a textarea element and add a class and the specific id to it
  var textInput = $("<textarea>");
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
  var secondId = $(this).attr("id");

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

  //get the current elements id
  var currentDivAttr = $(this).attr("id");
  //loop through the dates array
  for (i = 0; i < timeOfDay.length; i++) {
    //if the current elements id value matches the key of the days array check time
    if (timeOfDay[i][currentDivAttr]) {
      //declare a variable as a moment object for the value of the matching time array and a variable thats one hour ahead
      var firstMoment = moment(timeOfDay[i][currentDivAttr], "h:mma");
      var secondMoment = moment(timeOfDay[i][currentDivAttr], "h:mma").add(
        1,
        "hours"
      );
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
  //get the matching time-slot elements text content and id to use for local storage
  var storageId = $(this).parent().siblings().closest(".time-slot").attr("id");
  var textContent = $(this).parent().siblings().closest(".time-slot").text();
  //save tasks to an object NOTE: to add a key dynamically, use {[keyName]: valueName}. not {keyName: valueName}
  var dataObject = { [storageId]: textContent };
  saveTasks(dataObject, storageId);
});

function getBgColor(div, id) {
  //NOTE: correct way of indexing into a array of objects is arrayName[index][key] NOT: arrayName[i].index
  for (i = 0; i < timeOfDay.length; i++) {
    if (timeOfDay[i][id]) {
      var firstMoment = moment(timeOfDay[i][id], "h:mma");
      var secondMoment = moment(timeOfDay[i][id], "h:mma").add(1, "hours");

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

function saveTasks(data, id) {
  //get the local storage data
  var existingItems = JSON.parse(localStorage.getItem("tasks"));
  //if there is no data set the array to empty
  if (existingItems === null) existingItems = [];
  //loop through the array, if the key of an object matches the data id being updated delete the object
  for (x = 0; x < existingItems.length; x++) {
    //for some reason if the input is "" , a empty copy is created, to fix this check for === ""
    if (existingItems[x][id] || existingItems[x][id] === "") {
      console.log("this id exists already");
      existingItems.splice(x, 1);
    }
  }
  //add the data object to the array
  existingItems.push(data);
  //set the array in local storage
  localStorage.setItem("tasks", JSON.stringify(existingItems));
  alert("Saved!");
}

function getLocalStorage() {
  var storedtasks = localStorage.getItem("tasks");

  // if there are no tasks return out of the function
  if (!storedtasks) {
    return false;
  }
  // change the array from strings to regular key value pairs
  storedtasks = JSON.parse(storedtasks);

  return storedtasks;
}

//when the document loads get local storage and append the tasks to the time slots
$(document).ready(function () {
  //get array of object from local storage and store it in a variable
  var dataToAdd = getLocalStorage();
  //.each will loop through the select node list of time-slots
  $(".time-slot").each(function (index) {
    //get the id value of the current time slot div
    var value = $(this).attr("id");
    //loop through the array of objects
    dataToAdd.forEach((data) => {
      //if the nth object key matches / returns true apply the value of it to the current time slot div
      if (data[value]) {
        $(this).text(data[value]);
      }
    });
  });
});
