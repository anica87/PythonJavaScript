function myservices($scope){
    $scope.services=[
        { title: 'web development', price: 200},
        { title: 'web design', price: 250},
        { title: 'photography', price: 100},
        { title: 'coffee drinking', price: 10}];
    $scope.total=function(){
        var t = 0;
        angular.forEach($scope.services, function(s){
            if(s.selected)
                t+=s.price;
        });
        return t;
    };
	$scope.multiply = function(){
		var allOfMultiply = 1;
		angular.forEach($scope.services, function(s){
			if(s.selected)
				allOfMultiply = s.price * allOfMultiply;
		});
		return allOfMultiply;
	};
}
/* Define a model for our app. The array holds the names of dependencies if any
*/
var app = angular.module("instantSearch", []);

// Create the instant search filter
app.filter("searchFor", function(){
		
		return function(arr, searchString){
		
			if(!searchString){
				return arr;
			}
			
		var result = [];
		
		searchString = searchString.toLowerCase();
		
		angular.forEach(arr, function(item){
			
			if(item.title.toLowerCase().indexOf(searchString) !== -1){
				result.push(item);
			}
		
		});
			return result;
		};
});

// Define a new module. This time we declare a dependency on
// the ngResource module, so we can work with the Instagram API

var app = angular.module( "switchableGrid",["ngResource"]);

// Create and register the new "instagram" serice

app.factory('instagram', function($resource){

	return{
		fetchPopular: function(callback){
	
	var api = $resource('https://api.instagram.com/v1/media/popular?client_id=:client_id&callback=JSON_CALLBACK',{
		client_id: '642176ece1e7445e99244cec26f4de1f'
	},{
		fetch:{method:"JSONP"}
	});
	api.fetch(function(response){
		//Call the supplied callback information
		callback(response.data);
		
	});
	}
	}
});

angular.bootstrap(document.getElementById("module2"), ['switchableGrid']);
function InlineEditorController($scope){

		/* The controller is a regular JavaScript function. It is called once when AngularJS runs into the ng-controller declaration.
		$scope is a special object that makes its properties available to the view as variable. Here we set some default values */
		
		$scope.showtooltip = false;
		$scope.value = 'Edit me';
		
		$scope.hideTooltip = function(){
			/* When a model is changed, the view will be automatically updated by AngularJS. In this case it will hide the tooltip.
			*/
			
			$scope.showtooltip = false;
		}
		
		$scope.toggleTooltip = function(e){
			e.stopPropagation();
			$scope.showtooltip = !$scope.showtooltip;
		}
}

function InstantSearchController($scope){
	/*	The data model. These items would normally be requested via AJAX, 
		but are hardcoded here for simplicity. See the next example for tips on using AJAX.
	*/
	
	$scope.items = [
			{
			url: 'http://tutorialzine.com/2013/07/50-must-have-plugins-for-extending-twitter-bootstrap/',
			title: '50 Must-have plugins for extending Twitter Bootstrap',
			image: 'http://cdn.tutorialzine.com/wp-content/uploads/2013/07/featured_4-100x100.jpg'
		},
		{
			url: 'http://tutorialzine.com/2013/08/simple-registration-system-php-mysql/',
			title: 'Making a Super Simple Registration System With PHP and MySQL',
			image: 'http://cdn.tutorialzine.com/wp-content/uploads/2013/08/simple_registration_system-100x100.jpg'
		},
		{
			url: 'http://tutorialzine.com/2013/08/slideout-footer-css/',
			title: 'Create a slide-out footer with this neat z-index trick',
			image: 'http://cdn.tutorialzine.com/wp-content/uploads/2013/08/slide-out-footer-100x100.jpg'
		},
		{
			url: 'http://tutorialzine.com/2013/06/digital-clock/',
			title: 'How to Make a Digital Clock with jQuery and CSS3',
			image: 'http://cdn.tutorialzine.com/wp-content/uploads/2013/06/digital_clock-100x100.jpg'
		},
		{
			url: 'http://tutorialzine.com/2013/05/diagonal-fade-gallery/',
			title: 'Smooth Diagonal Fade Gallery with CSS3 Transitions',
			image: 'http://cdn.tutorialzine.com/wp-content/uploads/2013/05/featured-100x100.jpg'
		},
		{
			url: 'http://tutorialzine.com/2013/05/mini-ajax-file-upload-form/',
			title: 'Mini AJAX File Upload Form',
			image: 'http://cdn.tutorialzine.com/wp-content/uploads/2013/05/ajax-file-upload-form-100x100.jpg'
		},
		{
			url: 'http://tutorialzine.com/2013/04/services-chooser-backbone-js/',
			title: 'Your First Backbone.js App – Service Chooser',
			image: 'http://cdn.tutorialzine.com/wp-content/uploads/2013/04/service_chooser_form-100x100.jpg'
		}
	];
}

/* The controller. Notice that I've included our instagram service which we defined above. It will be available inside the function automatically

*/
function SwitchableGridController($scope, instagram){
	
	// Default layout of the app . Clicking the buttons in the toolbar changes this value
	
	$scope.layout = "list";
	
	$scope.pics = [];
	// Use the instagram service and fetch a list of the popular pics
	instagram.fetchPopular(function(data){
	
		// Assigning the pics array will cause  the view to be automatically redrawn by Angular
		
		$scope.pics = data;
	})
}