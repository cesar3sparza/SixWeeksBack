$(document).ready(function(){
  $('.datepicker').datepicker({
    todayBtn: true
  });

  $('#dateInput').on('change',function(){
    //when the date is selected, grab that shit from the input field
    let selectedDate = $('.active').attr('data-date');

    //cram that shit into a date object
    let date = new Date(parseInt(selectedDate));

    //the datepicker returns a day prior to the date selected for whatever fucking reason. Add 1 to that shit
    date.setDate(date.getDate() + 1);
    
    //get month and day of month from selected date
    let month = date.getMonth();
    let day = date.getDate();
    
    //the object used to store the six weeks prior date
    let dateMinSix = new Date(date);
    
    //go back six weeks
    dateMinSix.setDate(dateMinSix.getDate() - 43);
    
    //get day of the week from six weeks back
    let weekday = dateMinSix.getDay();

    //instantiate the purchaseDate object
    let purchaseDate = new Date(dateMinSix);

    //find days difference between purchase date and nearest Tuesday(2)
    let addDays = findTuesday(weekday);

    //figure out if you need to add or subtract to get to Tuesday, else don't change it
    if(weekday > 2){
      purchaseDate.setDate(purchaseDate.getDate() - addDays);
    } else if(weekday < 2){
      purchaseDate.setDate(purchaseDate.getDate() + addDays);
    }
    
    //figure out how many days apart the flight date is from the purchase Tuesday date
    function findTuesday(start){
      let tuesday = 2;
      if(start < tuesday){
        return tuesday - start;
      } else if(start > tuesday){
        return start - tuesday;
        } else {
          return 0;
        }
      }

    //spit that shit out onto the page
    $('#dateInput').val(purchaseDate.toDateString());
  });
});