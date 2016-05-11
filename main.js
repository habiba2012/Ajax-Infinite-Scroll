  // top 250 ranked movies on IMDB
  var movieIDs = [
    'tt0111161', 'tt0068646', 'tt0071562', 'tt0468569', 'tt0110912', 
    'tt0060196', 'tt0108052', 'tt0050083', 'tt0167260', 'tt0137523', 
    'tt0120737', 'tt0080684', 'tt1375666', 'tt0109830', 'tt0073486', 
    'tt0167261', 'tt0099685', 'tt0133093', 'tt0076759', 'tt0047478', 
    'tt0317248', 'tt0114369', 'tt0114814', 'tt0102926', 'tt0038650', 
    'tt0064116', 'tt0110413', 'tt0118799', 'tt0034583', 'tt0082971', 
    'tt0120586', 'tt0054215', 'tt0047396', 'tt0120815', 'tt0021749', 
    'tt0245429', 'tt1675434', 'tt0027977', 'tt0103064', 'tt0209144', 
    'tt0253474', 'tt0043014', 'tt0120689', 'tt0057012', 'tt0078788', 
    'tt0407887', 'tt0172495', 'tt1065073', 'tt0088763', 'tt0078748', 
    'tt1345836', 'tt0482571', 'tt0405094', 'tt1853728', 'tt0032553', 
    'tt0110357', 'tt0081505', 'tt0095765', 'tt0169547', 'tt0050825', 
    'tt2015381', 'tt0910970', 'tt0053125', 'tt0090605', 'tt0033467', 
    'tt0211915', 'tt0052357', 'tt0435761', 'tt0022100', 'tt0082096', 
    'tt0364569', 'tt0119698', 'tt0066921', 'tt0075314', 'tt0086190', 
    'tt0095327', 'tt0105236', 'tt0036775', 'tt0087843', 'tt0180093', 
    'tt0112573', 'tt0056592', 'tt0056172', 'tt0338013', 'tt0051201', 
    'tt0093058', 'tt0045152', 'tt0070735', 'tt0040522', 'tt0086879', 
    'tt0071853', 'tt0208092', 'tt0119488', 'tt0042192', 'tt0042876', 
    'tt0053604', 'tt0059578', 'tt0040897', 'tt0053291', 'tt0041959', 
    'tt0012349', 'tt0097576', 'tt0361748', 'tt1832382', 'tt0062622', 
    'tt0372784', 'tt0055630', 'tt0017136', 'tt0114709', 'tt0105695', 
    'tt0081398', 'tt0086250', 'tt0071315', 'tt1049413', 'tt0095016', 
    'tt0363163', 'tt0057115', 'tt0986264', 'tt0031679', 'tt0457430', 
    'tt0047296', 'tt0113277', 'tt0050212', 'tt2106476', 'tt1187043', 
    'tt0993846', 'tt0050976', 'tt0119217', 'tt0096283', 'tt0080678', 
    'tt0050986', 'tt0015864', 'tt0089881', 'tt0083658', 'tt0120735', 
    'tt0017925', 'tt0044741', 'tt0292490', 'tt1205489', 'tt1877832', 
    'tt1305806', 'tt0118715', 'tt0032976', 'tt0112641', 'tt1291584', 
    'tt0434409', 'tt0025316', 'tt0077416', 'tt0061512', 'tt1979320', 
    'tt0347149', 'tt0116282', 'tt0892769', 'tt0033870', 'tt0117951', 
    'tt0031381', 'tt0758758', 'tt0405508', 'tt0055031', 'tt0395169', 
    'tt0268978', 'tt2024544', 'tt0167404', 'tt0046912', 'tt0084787', 
    'tt0064115', 'tt0266697', 'tt0477348', 'tt0266543', 'tt0091763', 
    'tt0046268', 'tt0978762', 'tt0079470', 'tt2278388', 'tt0401792', 
    'tt0075686', 'tt0074958', 'tt0052311', 'tt0046911', 'tt1255953', 
    'tt0093779', 'tt0092005', 'tt0245712', 'tt0469494', 'tt0052618', 
    'tt0032138', 'tt0848228', 'tt0405159', 'tt0032551', 'tt0053198', 
    'tt1028532', 'tt0107207', 'tt0036868', 'tt0440963', 'tt0246578', 
    'tt0060827', 'tt0044079', 'tt0083987', 'tt0056801', 'tt0087544', 
    'tt0073195', 'tt0044706', 'tt0338564', 'tt1504320', 'tt0114746', 
    'tt0038787', 'tt0088247', 'tt0079944', 'tt1130884', 'tt1201607', 
    'tt1220719', 'tt0107048', 'tt0083922', 'tt0075148', 'tt0048424', 
    'tt0112471', 'tt0072890', 'tt0169102', 'tt0047528', 'tt0325980', 
    'tt0198781', 'tt1798709', 'tt0113247', 'tt0072684', 'tt0058946', 
    'tt0061184', 'tt0038355', 'tt0353969', 'tt0058461', 'tt0092067', 
    'tt0061722', 'tt0046250', 'tt1454029', 'tt0120382', 'tt1646971', 
    'tt0054997', 'tt0154420', 'tt0107290', 'tt0118694', 'tt0101414', 
    'tt1010048', 'tt0046359', 'tt0040746', 'tt0085334', 'tt0049406', 
    'tt0381681', 'tt0070511', 'tt1555149', 'tt0450259', 'tt0367110'
  ];

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
	var rand = (Math.floor(Math.random()*250));
	var id = movieIDs[rand];
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