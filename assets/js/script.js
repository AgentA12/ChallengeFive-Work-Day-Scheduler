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

  var timeSlot = $("<div><div/>");
  timeSlot.removeClass("past present future");
  //call getbackgroundcolor to assign the right color dynamically
  timeSlot = getBgColor(timeSlot, secondId);
  timeSlot
    .addClass("col-md-9 col-8 time-slot pt-3 text-md-left")
    .text(text)
    .attr("id", secondId);

  $(this).replaceWith(timeSlot);
});

function getBgColor(div, id) {
  //declare an array to hold time of day
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
  //correct way of indexing into a array of objects. NOT: timeOfDay[i].index
  //console.log(timeOfDay[1][id])

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
      //  else if (firstMoment.isbetween(timeOfDay[i - 1][id], timeOfDay[i][id])) {
      //   div.addClass("present");
      //   return div;
      // }
    }
  }
}

//setInterval(() => {
//   //declare an array to hold time of day
//   let timeOfDay = [
//     "9:00am",
//     "10:00am",
//     "11:00am",
//     "12:00pm",
//     "1:00pm",
//     "2:00pm",
//     "3:00pm",
//     "4:00pm",
//     "5:00pm",
//   ];

//   let secondMoment = moment();

//   timeOfDay.forEach((time) => {
//     let firstMoment = moment(time, "h:mma");
//     if (firstMoment.isBefore(secondMoment)) {

//     }
//   });
// }, 1000);
