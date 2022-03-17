//set a variable to the current date
var CurrentDayVariable = moment().format("LL");
//set a interval is run every 12 hours to update the time
setInterval(() => {
  CurrentDayVariable = moment().format("LL");
}, ((1000 * 60) * 60) * 12);
//display the date use the element with the id "currentDay"
$("#currentDay").text(CurrentDayVariable);
