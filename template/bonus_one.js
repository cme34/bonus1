// The anonymous function below will fire on page load

// Some things to consider
// $.ajax(); to make your requests a little easier. Or the vanilla js way, it's up to you.
// $.on(); for event handling
// Remember, selecting elements in jQuery is like selecting them in CSS
// You'll probably have to manipulate some strings
// some jQuery functions to help display results
// $.show(), $.hide(), $.slideup(), $.slidedown(), $.fadein(), $.fadeout()
// Add content from requests with something like
// $.html(), $.text(), etc.
// keyup events could be helpful to get value of field as the user types

(function() {
	$(".results").hide();
	var searchTerms = new Array();
	
	//Get searchTerms from json
	$.ajax({
		url: "http://www.mattbowytz.com/simple_api.json?data=all",
		success: function(result) {
			var arr = result["data"];
			var interests = arr["interests"];
			var programming = arr["programming"];
			$.each(interests, function(index, value) {
				searchTerms.push(value);
			});
			$.each(programming, function(index, value) {
				searchTerms.push(value);
			});
		}
	});
	
	//Called every time the text in the input is changed
	$(".flexsearch-input").on("keyup", function() {
		var searchText = $(this).val();
		$(".results").empty();
		
		//If input feild is empty, then don't display search results
		if (searchText.length == 0) {
			$(".results").hide();
			return;
		}
		
		var found = 0;
		//Check each search term
		$.each(searchTerms, function(index, value) {
			if (value.length >= searchText.length && value.substring(0, searchText.length).toLowerCase() == searchText.toLowerCase()) {
				//Add text with link to google search
				$(".results").append("<a href=\"https://www.google.com/webhp?sourceid=chrome-instant&ion=1&espv=2&ie=UTF-8#q=" 
					+ value + "\"><p class=\"result\">" + value +"</p></a>");
				found++;
			}
		});
		
		if (found > 0) {
			$(".results").show();
		}
	});
	
	//On submit
	$("#mainForm").on("submit", function(e) {
		window.location = "https://www.google.com/webhp?sourceid=chrome-instant&ion=1&espv=2&ie=UTF-8#q=" + $(".flexsearch-input").val();
		return false;//The search will not redirect without this return statement
	});
})();
