'use strict';



$('<button/>').text('Get Random Date').on('click', function () {

	var rndYear = Math.floor(Math.random() * (2017 - 1995)) + 1995;
	var rndMonth = Math.floor(Math.random() * (13 - 1)) + 1;
	var rndDay = Math.floor(Math.random() * (32 - 1)) + 1;
	
	var year = rndYear.toString();
	var month = rndMonth.toString();
	var day = rndDay.toString();
	
	if (month.length === 1) {
		month = ('0' + month);
	}
	
	if (day.length === 1) {
		day = ('0' + day);
	}

	$.ajax({
		url: `https://api.nasa.gov/planetary/apod?date=${year}-${month}-${day}&api_key=BlNiKpyUAovsd7JgTbofzaqUkFrYoFwpAI63SE8x`
	}).done(function (data) { 
			let apodInfo = data;
			$('<img/>').attr('src', apodInfo.url).appendTo($('body'));
			console.log("data", apodInfo);
	});


}).appendTo($('body'));

