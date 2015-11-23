var movieList = [];

var MoviePrototype = {
	init: function(id){
		this.id = id;
		this.retrieved = false;
	},
	get_id: function(){
		return this.id;
	}
}

$(document).ready(function(){
	$('footer').hide();
	search_for_movie();

	$('#scrollToTop').click(function(){
		$('html, body').animate({scrollTop : 0},600);
		return false;
	});

	$('#button-wrapper button').click(function(){
		get_num_of_movies(9);
		$(window).scroll(function(){
			if($(window).scrollTop()+ $(window).height() > $(document).height() - 10) {
				get_num_of_movies(9);	
			}
		});
		scroll_to_top();
	});

	$('#movie-list').delegate('.movie-content>img', 'click', function(event){
		$(this).toggleClass('reduce-size');
		var movie_index = $(event.target).closest('li').index('li');
		var $el = $(event.target).closest('.movie-content');
		//console.log(movie_index);
		if(movieList[movie_index].retrieved === false){
			get_movie_content(movie_index, $el);
			movieList[movie_index].retrieved = true;
		}else{
			$(this).siblings('.rating, .synopsis').fadeToggle('fast');
		}	
	});

	$('.btn').click(function(){
		$('.header').addClass('move-header');
	});

})
.ajaxStart(function() {
	$('footer').show();
})
.ajaxStop(function() {
	$('footer').hide();
});


var create_poster = function(movie){
	var img = movie.Poster?movie.Poster:"";
	var newMovie = Object.create(MoviePrototype);
	newMovie.init(movie.imdbID);
	movieList.push(newMovie);
	return $('<li><div><p title="' + movie.Title + '">' + movie.Title + '</p><div class="movie-content"><img src='+ img + '></div></div></li>').fadeIn();
}

// p: the search parameter(i,t,s)
// val: the value of the search parameter
// onSuccess: the function to call when a movie is retrieved
var ajax_call = function(p, val, onSuccess){
	var data = {type: 'movie'};
	data[p] = val;
	$.ajax({
		type: 'GET',
		url: 'https://www.omdbapi.com/?',
		data,
		success: function(movies){
			console.log(movies);
			onSuccess(movies);
		},
		error: function( xhr, status, errorThrown ) {
	        alert( "Sorry, there was a problem!" );
	        console.log( "Error: " + errorThrown );
	        console.log( "Status: " + status );
	        console.dir( xhr );
	    }
	});
}

var search_for_movie = function(){
	var search = $('#search-field');
	var onSuccess = function(movies){
		for(var i = 0; i < 10; i++){
			if(typeof movies.Search === 'undefined')
				break;
			$('#movie-list').append(create_poster(movies.Search[i]));
		}
	}
	$('.movie-form').submit(function(event){
		if( search.val().length > 0){	
			clear_list();
			ajax_call('s', search.val(), onSuccess);
			search.val("");
			event.preventDefault();
		}
		$(window).unbind('scroll');
		scroll_to_top();
	});



};

var get_random_movie = function(){
	var rand = ""+ (Math.floor(Math.random()*7000000));
	var pad = "0000000";
	var id = "tt"+pad.substring(0,pad.length-rand.length)+rand;
	//console.log(id);

	var onSuccess = function(movie){
		if(typeof movie.Title !== 'undefined'){
			$('#movie-list').append(create_poster(movie));
			$(window).scrollTop($(window).scrollTop());
		}else{
			get_random_movie();
		}
	}
	ajax_call('i', id, onSuccess);
};

var get_movie_content = function(index, el){
	var id = get_imbdID(index);
	var onSuccess = function(movie){
		el.append($('<div class="rating"></div><div class="synopsis"></div>').fadeIn());
		el.children('.rating').append('<p class="year">'+movie.Year+'</p><p class="genre">'+movie.Genre+'</p><div class="imbd"><img src="icons/imdb.png">'+movie.imdbRating+'</div>');
		el.children('.synopsis').append('<div><h2>Synopsis</h2>'+movie.Plot+'</div>');
	}
	ajax_call('i', id, onSuccess);
}


var get_imbdID = function(index){
	return(movieList[index].get_id());
}

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
	movieList = [];
};

var scroll_to_top = function(){
	$(window).scroll(function(){
		if($(window).scrollTop() > 100){
			$('#scrollToTop').fadeIn();
		}else{
			$('#scrollToTop').fadeOut();
		}
	});
}





var opts = {
  lines: 13 // The number of lines to draw
, length: 28 // The length of each line
, width: 14 // The line thickness
, radius: 42 // The radius of the inner circle
, scale: 0.5 // Scales overall size of the spinner
, corners: 1 // Corner roundness (0..1)
, color: '#000' // #rgb or #rrggbb or array of colors
, opacity: 0.25 // Opacity of the lines
, rotate: 0 // The rotation offset
, direction: 1 // 1: clockwise, -1: counterclockwise
, speed: 1 // Rounds per second
, trail: 60 // Afterglow percentage
, fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
, zIndex: 2e9 // The z-index (defaults to 2000000000)
, className: 'spinner' // The CSS class to assign to the spinner
, top: '50%' // Top position relative to parent
, left: '50%' // Left position relative to parent
, shadow: false // Whether to render a shadow
, hwaccel: false // Whether to use hardware acceleration
, position: 'absolute' // Element positioning
}
var target = document.getElementById('spinner')
var spinner = new Spinner(opts).spin(target);