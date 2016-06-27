'use strict';
// IIFE - Immediately Invoked Function Expression
(function(x) {
  // The global jQuery object is passed as a parameter
	x(window.jQuery, window, document);

  }(function($, window, document) {
	
   // The jQuery object ($) is now locally scoped 
   // Listen for the jQuery ready event on the document
   $(function() {
   	let $carousel = $('.carousel'),
   			$loadImgButton = $('<button/>');
   	$carousel.hide();
   	// creat button, and append to DOM to be used to load picutres
    $loadImgButton
     .text('Get Random Images')
     .toggleClass('btn btn-primary loadButton')
     .on('click',() => {
     		$carousel.show(600);
     		let $dates = $(returnDatesArr()),
     				$output = $('#imgOutput'),
     				$carIndicator = $('#carouselIndicators'),
     				htmlString = '',
     				indString = '';

     		$dates.each((i, x) => {
     			loadImageAJAX(x)
     			.then((y) => {pushData(y);})
     			.then(() => {
     				let $images = $(returnImgArray());
     				$images.each((i, x) => {
     					let copyCheck = x.copyright;
     					if (copyCheck === undefined) {
     						copyCheck = 'Public Domain';
     					}
  					// set initial carousel item and indicator to active
							if (i === 0) {
								htmlString = `<div class="item active" id="img${i}">`;
								indString = `<li data-target="#img${i}" data-slide-to="${i}" class="active"></li>`;
							} else {
								htmlString = `<div class="item" id="img${i}">`;
								indString = `<li data-target="#img${i}" data-slide-to="${i}"></li>`;
							}
							htmlString = `${htmlString}	
															<img src="${x.url}" alt="${x.title}" id="url">
	    												  <div class="carousel-caption">
	    												    <h3>${x.title}</h3>
	    												    <h5>&copy;&nbsp;${copyCheck}</h5>
	    												    <p id="explanation">${x.explanation}</p>
	    												    <p id="explanation">(YYYY-MM-DD)&nbsp;${x.date}</p>
	    												    <button id="hdurl" class="btn btn-primary"><a href="${x.hdurl}" target="_blank">High-Definition</a></button>
	    												    <button class="btn btn-important clear">Clear</button>
	    												  </div>
	    												</div>`;
	    				
     				});
     				$carIndicator.append(indString);
 			  		$output.append(htmlString);
			    })
			    .then(() => {
   					let $clearCarouselButton = $('button.clear');
					   		
					   		$clearCarouselButton
					   		.on('click', () => {
					   			$output.empty();
					   			$carIndicator.empty();
					   			console.log("data", imgArray);
					   			console.log("counter", counter);
				   			  imgArray.length = 0;
				   				counter = 0;
					   			// $carousel.hide();
					   			$loadImgButton.show(200);
					   		});
			    });
     		});
			}).appendTo($('body'));

    $('body').on('click', (e) => {
    	 if ($carousel.is(':visible')) {
    	 	$loadImgButton.hide();
    	 }
    });
   });

// The rest of the code goes here!
// all code below is run asynch of DOM load
// define private vars needed for retreiving random dates

	 let counter = 0,
       dateArray = [],
       imgArray = [];


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




