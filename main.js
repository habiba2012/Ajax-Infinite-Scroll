

$(document).ready(function(){
	$('footer').hide();
	search_for_movie();

	$('#button-wrapper button').click(function(){
		get_num_of_movies(9);
		$(window).scroll(function(){
			if($(window).scrollTop() == $(document).height() - $(window).height()) {
				get_num_of_movies(9);	
			}
		});
	});

})
.ajaxStart(function() {
	$('footer').show();
})
.ajaxStop(function() {
	$('footer').hide();
});



var create_poster = function(title, img){
	return $('<li style="display: inline-block"><p title="' + title + '">' + title + '</p><img src='+ img + '></li>').fadeIn();
}

var search_for_movie = function(){
	var search = $('#search-field');
	$('.movie-form').submit(function(event){
		if( search.val().length > 0){	
			clear_list();
			$(window).unbind('scroll');
			$.ajax({
				type: 'GET',
				url: 'http://www.omdbapi.com/?',
				data: {
					s: search.val(),
					type: 'movie',
				},
				success: function(movies){
					console.log(movies);
					for(var i = 0; i < 9; i++){
						if(typeof movies.Search === 'undefined')
							break;
						var img = movies.Search[i].Poster?movies.Search[i].Poster:"";
						var title = movies.Search[i].Title
						$('#movie-list').append(create_poster(title,img));
					}
				},
				error: function( xhr, status, errorThrown ) {
			        alert( "Sorry, there was a problem!" );
			        console.log( "Error: " + errorThrown );
			        console.log( "Status: " + status );
			        console.dir( xhr );
			    }
			});
			search.val("");
			event.preventDefault();
		}
	});
};

var get_random_movie = function(){
	var rand = ""+ (Math.floor(Math.random()*7000000));
	var pad = "0000000";
	var id = "tt"+pad.substring(0,pad.length-rand.length)+rand;
	console.log(id);
	$.ajax({
		type: 'GET',
		url: 'http://www.omdbapi.com/?',
		data: {
			i: id,
			type: 'movie'
		},
		success: function(movie){
			console.log(movie);

			if(typeof movie.Title !== 'undefined'){
				var img = movie.Poster?movie.Poster:"";
				var title = movie.Title
				$('#movie-list').append(create_poster(title,img));
				$(window).scrollTop($(window).scrollTop());
			}else{
				get_random_movie();
			}
			
		},
		error: function( xhr, status, errorThrown ) {
	        alert( "Sorry, there was a problem!" );
	        console.log( "Error: " + errorThrown );
	        console.log( "Status: " + status );
	        console.dir( xhr );
	    }
	});

};

var get_num_of_movies = function(num){
	for(var i = 0; i < num; i++){
		get_random_movie();
	}
}

var clear_list = function(){
	var myNode = document.getElementById("movie-list");
	while (myNode.firstChild) {
	    myNode.removeChild(myNode.firstChild);
	}
};


var opts = {
  lines: 13 // The number of lines to draw
, length: 28 // The length of each line
, width: 14 // The line thickness
, radius: 42 // The radius of the inner circle
, scale: 0.5 // Scales overall size of the spinner
, corners: 1 // Corner roundness (0..1)
, color: '#FFF' // #rgb or #rrggbb or array of colors
, opacity: 0.25 // Opacity of the lines
, rotate: 0 // The rotation offset
, direction: 1 // 1: clockwise, -1: counterclockwise
, speed: 1 // Rounds per second
, trail: 60 // Afterglow percentage
, fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
, zIndex: 2e9 // The z-index (defaults to 2000000000)
, className: 'spinner' // The CSS class to assign to the spinner
, top: '50%' // Top position relative to parent
, left: '95%' // Left position relative to parent
, shadow: false // Whether to render a shadow
, hwaccel: false // Whether to use hardware acceleration
, position: 'absolute' // Element positioning
}
var target = document.getElementById('spinner')
var spinner = new Spinner(opts).spin(target);