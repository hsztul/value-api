// BASE SETUP
// =============================================================================

// call the packages we need
var express      = require('express');
var bodyParser   = require('body-parser');
var app          = express();
var morgan       = require('morgan');
var ApiInterface = require('./Utils/ApiInterface');

// configure app
app.use(morgan('dev')); // log requests to the console

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port     = process.env.PORT || 8080; // set our port

// ROUTES FOR OUR API
// =============================================================================

// create our router
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
	// do logging
	console.log('Something is happening.');
	next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!' });	
});

// on routes that end in /bears
// ----------------------------------------------------
router.route('/value')

	// get all the bears (accessed at GET http://localhost:8080/api/value)
	.get(function(req, res) {
    console.log("[Request] host Param: ", req.query.host);
    console.log("[Request] path Param: ", req.query.path);
    console.log("[Request] query Param: ", req.query.query_params);
  
    console.log(decodeURI(req.query.url));
  
    var apiInfo = {
      url: decodeURI(req.query.url),
      host: req.query.host,
      path: req.query.path,
      query: req.query.query
    };
        
    var apiInterface = new ApiInterface(apiInfo);
    
    apiInterface.get(function(d){      
      var jsonResponse = JSON.parse(d.toString('utf8'));  
      console.log(jsonResponse);
      res.json(jsonResponse[req.query.key]);
    });
		
	});


// REGISTER OUR ROUTES -------------------------------
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);