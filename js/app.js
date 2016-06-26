'use strict';
// IIFE - Immediately Invoked Function Expression
(function(x) {

    // The global jQuery object is passed as a parameter
  	x(window.jQuery, window, document);

  }(function($, window, document) {
  	// define private vars needed for retreiving random dates
  	let counter = 0,
	      arr = [];
    // The jQuery object ($) is now locally scoped 

   // Listen for the jQuery ready event on the document
   $(function() {
   	console.log("DOM is ready!");
   	// creat button, and append to DOM to be used to load picutres
     $('<button/>').text('Get Random Date').on('click', function () {
     		let $dates = $(returnDatesArr());

     		$dates.each((i, x) => {
     			return console.log(x.year + '-' + x.month + '-' + x.day);
     		});
     		// $.ajax({
				// 	url: `https://api.nasa.gov/planetary/apod?date=${year}-${month}-${day}&api_key=BlNiKpyUAovsd7JgTbofzaqUkFrYoFwpAI63SE8x`
				// }).done(function (data) { 
				//		console.log("data", data);
				// });
			}).appendTo($('body'));

   });

   console.log("DOM may not be ready.");
   // The rest of the code goes here!

   let getRandomDates = () => {
			// retrieve random date between 01 Jan 1995 ~ 31 Dec 2016
			let rndYear = Math.floor(Math.random() * (2017 - 1995)) + 1995,
				  rndMonth = Math.floor(Math.random() * (13 - 1)) + 1,
				  rndDay = Math.floor(Math.random() * (31 - 1)) + 1;
	
			// convert int to string for api call
			let year = rndYear.toString(),
			    month = rndMonth.toString(),
			    day = rndDay.toString();
	
			// format day/month to always contain 2 chars (req for api call)
			if (month.length === 1) {
				month = ('0' + month);
			}
			
			if (day.length === 1) {
				day = ('0' + day);
			}
	// build date obj and push to private array
			let dateObj =   {
												year: year,
												month: month,
												day: day
											};
					
				arr.push(dateObj);
				counter++;
  // call getRandomDates until counter reaches 10 (10 dates === 10 pictures)
				if (counter === 10) {
					return;
				} 
				
			getRandomDates();
    };

    let returnDatesArr = () => {getRandomDates(); return arr;};

}));
