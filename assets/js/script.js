//set a variable to the current date
var CurrentDayVariable = moment().format("LL");
//set a interval is run every 12 hours to update the time
setInterval(() => {
  CurrentDayVariable = moment().format("LL");
}, 1000 * 60 * 60 * 12);
//display the date use the element with the id "currentDay"
$("#currentDay").text(CurrentDayVariable);

//add a click listner on all the elements with the class of time-slot
$(".row").on("click", ".time-slot", function () {
  //get the text of the element clicked and trim it then store it in a variable
  let text = $(this).text().trim();
  console.log(text)
  //create a textarea element and add a class to it
  let textInput = $("<textarea>");
  textInput.addClass("col-9 text-field-input").text(text);
  //replace the target of the event with the textarea element and trigger the focus state
  $(this).replaceWith(textInput);
  //auto focuses the textarea
  textInput.trigger("focus");
});

//on blur of a textarea with a parent of ".row"
$(".row").on("blur", "textarea", function () {
  var text = $(this).val().trim();
  var timeSlot = $("<div><div/>");
  timeSlot.addClass("col-9 bg-secondary time-slot").text(text);
  $(this).replaceWith(timeSlot);
});
