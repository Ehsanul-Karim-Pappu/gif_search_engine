var giphy_apikey = "dc6zaTOxFJmzC";
var tenor_apikey = "47UF06P156TA";




var username = prompt("What's your name?");
var greetings = document.querySelector('.greetings');
greetings.innerHTML = "";
greetings.innerHTML = "<h1>Kire " + username + " khankir pola!!!!<h1/>";

document.querySelector('.js-userinput').setAttribute("placeholder", "Ei " + username + " madarchod, Search de!!!");



document.querySelector(".js-go").addEventListener('click', function () {
	var inputValue = document.querySelector('.js-userinput').value;
	var userInput = getUserInput();
	searchGiphy(userInput);
	searchTenor(userInput);
});

document.querySelector('.js-userinput').addEventListener('keyup', function (e) {
	if (e.which === 13) {
		var userInput = getUserInput();
		searchGiphy(userInput);
		searchTenor(userInput);
	}
});

function getUserInput() {
	var inputValue = document.querySelector('.js-userinput').value;

	return inputValue;
}



/**********  Giphy   *********/
function searchGiphy(searchQuery) {
	// console.log(searchQuery);
	var url = "https://api.giphy.com/v1/gifs/search?api_key=" + giphy_apikey + "&q=" + searchQuery + "&limit=15";


	// AJAX Request
	var GiphyAJAXCall = new XMLHttpRequest();
	GiphyAJAXCall.open('GET', url);
	GiphyAJAXCall.send();

	GiphyAJAXCall.addEventListener('load', function (data) {
		// console.log(data);
		var actualData = data.target.response;
		pushToDOM_giphy(actualData);
	});

}

function pushToDOM_giphy(response) {
	// turn response into real javascript object
	response = JSON.parse(response);
	// drill down to the data array
	var images = response.data;

	// find the container to hold this stuff in DOM
	var container = document.querySelector('.js-container');
	// clear it of old content since this function will be used on every search
	// we want to reset the div
	container.innerHTML = "";

	// loop through data array and add IMG html
	images.forEach(function (image) {
		// find img src
		var src = image.images.fixed_height.url;
		// concatenate a new IMG tag
		container.innerHTML += "<img src='" + src + "' class='container-image' />";
	});
}


/**********  Tenor   *********/
function searchTenor(searchQuery) {
	// console.log(searchQuery);
	var url = "https://api.tenor.com/v1/search?q=" + searchQuery + "&key=" + tenor_apikey + "&limit=15";


	// AJAX Request
	var GiphyAJAXCall = new XMLHttpRequest();
	GiphyAJAXCall.open('GET', url);
	GiphyAJAXCall.send();

	GiphyAJAXCall.addEventListener('load', function (data) {
		// console.log(data);
		var actualData = data.target.response;
		pushToDOM_tenor(actualData);
	});

}


function pushToDOM_tenor(response) {
	response = JSON.parse(response);
	// console.log(response);
	var result = response.results;

	var container = document.querySelector('.js-container');
	// container.innerHTML = "";papp

	result.forEach(function (item) {
		var src = item.media[0].gif.url;

		container.innerHTML += "<img src='" + src + "' class='container-image' />";
	});
}