'use strict';
// IIFE - Immediately Invoked Function Expression
(function(x) {
  // The global jQuery object is passed as a parameter
	x(window.jQuery, window, document);

  }(function($, window, document) {
   // The jQuery object ($) is now locally scoped 
   // Listen for the jQuery ready event on the document

   $(function() {
   	console.log("DOM is ready!");
   	// creat button, and append to DOM to be used to load picutres
     $('<button/>').text('Get Random Date').on('click',() => {
     		let $dates = $(returnDatesArr()),
     				$images = $(returnImgArray()),
     				$output = $('#imgOutput'),
     				htmlString = '';

     		$dates.each((i, x) => {
     			loadImageAJAX(x)
     			.then((y) => {pushData(y);})
     			.then(() => {
     				let $data = $(returnImgArray());
     				$data.each((i, x) => {
     					htmlString = `<imgcard class="col-xs-6">
														<header>
															<h3 id="title">${x.title}</h3>
														</header>
														<section id="imgSection">
															<img src="${x.url}" id="url"/>
														</section>
														<footer>
															<p id="explanation">${x.explanation}</p>
															<p id='date'>${x.date}</p>
															<h5 id="copywright">&copy;${x.copywright}</h5>
														</footer>
													</imgcard>`;
     				});
 			  	$output.append(htmlString);
     			});
     		});
			}).appendTo($('body'));

   });
  	// define private vars needed for retreiving random dates
  	let counter = 0,
	      dateArray = [],
	      imgArray = [];


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
					
				dateArray.push(dateObj);
				counter++;
  // call getRandomDates until counter reaches 10 (10 dates === 10 pictures)
				if (counter === 10) {
					return;
				} 
				
			getRandomDates();
    };

    let returnDatesArr = () => {getRandomDates(); return dateArray;};
    let returnImgArray = () => {return imgArray;};
    let loadImageAJAX = (x) => {
     			return new Promise ((resolve, reject) => {
	     			$.ajax({
							url: `https://api.nasa.gov/planetary/apod?date=${x.year}-${x.month}-${x.day}&api_key=BlNiKpyUAovsd7JgTbofzaqUkFrYoFwpAI63SE8x`
						}).done((data) => { 
								resolve(data);
						}).fail((data) => {
								reject(data);
						});
					});
     		};
     let pushData = (y) => {imgArray.push(y);};
}));




