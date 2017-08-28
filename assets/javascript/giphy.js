



// array holding 
var topics = ["ice hockey", "rock climbing", "snow skiing", "ballet", "swimming", "cricket", "boxing", "gymnastics", "badminton", "tennis", "football", "baseball", "soccer", "judo"];
var startStop = [false, false, false, false, false, false, false, false, false, false];
var lastResponse;

function displayButtons() {
	$("#buttons").html("");
	for (var i = 0; i < topics.length; i++) {
 		var btn = $("<button>");
 		btn.html(topics[i]);
 		btn.attr("data-sport", topics[i]);
 		$("#buttons").append(btn);
 		playBackground();
	}
}

$(document).ready(function() {
	displayButtons();
	

 	$("#buttons").on("click", "button", function() {
    	var sport = $(this).data("sport");
     	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        sport + "&api_key=05c80a66e99b47009dd0b2c6a1cc77ab&limit=10";
        console.log(queryURL);
        $.ajax({url: queryURL, method: "GET"})
        	.done(function(response) {
        		console.log("response:", response);
        		$("#gifs").html("");
        		lastResponse = response;
        		for (var i= 0; i < response.data.length; i++) {
        			var imgDiv = $("<div>");
        			imgDiv.attr("style", "float: left");
           			var img = $("<img>");
           			img.attr("src", response.data[i].images.fixed_height_still.url);
           			img.attr("id", i);
           			console.log("img=" + response.data[i].images.fixed_height_still.url);
           			var p = $("<p>").text("Rating: " + response.data[i].rating);
           			imgDiv.append(img);
           			imgDiv.append(p);
           			$("#gifs").append(imgDiv);	
           			startStop[i] = false;
           			
        		}
        		console.log(startStop);
        	})
    });

 	$("body").on("click", "img", function(){
 		console.log(this.id);
 		var img = $("#" + this.id);
 		if  (startStop [this.id] === false) {
 			startStop[this.id] = true;
 			console.log("Starting Animation");
 			img.attr("src", lastResponse.data[this.id].images.fixed_height.url);
 		}
 		else {
 			startStop [this.id] = false;
 			console.log("Stopping Animation");
 			img.attr("src", lastResponse.data[this.id].images.fixed_height_still.url);
 		}

 		
 	});

 	$("#sports-forms").submit(function(event) {
 		console.log("in submit");
 		event.preventDefault();
 		var $inputs = $("#sports-forms :input");
 		if ($inputs[0].value.length > 0) {
 			topics.push($inputs[0].value);
 			displayButtons();
 			$inputs[0].value = "";
 		}
 	});

});




  	function playBackground() {
  	var x=document.getElementById("backgroundmusic");
 	x.play();
}