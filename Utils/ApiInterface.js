var https = require('https');

/**
 *  EXAMPLE API Endpoint:
 *    "https://api.nasa.gov/planetary/apod?api_key=UaAIllM9nsUCKrsaiXhlsEDXF23pwV8iZ4U2ApCw&format=JSON"
 **/

// Constructor
function ApiInterface(params) {
  this.url = params.url;
  this.host = params.host;
  this.path = params.path;
  this.query = params.query;
  console.log("creating");
}

// class methods
ApiInterface.prototype.get = function(callback) {
  console.log("calling get");
  
  var options = {
    host: this.path,
    port: 443,
    path: this.path + "?" + this.query,
    method: 'GET'
  };

  var req = https.request(this.url || options, function(res) {
    res.on('data', function(d) {
      callback(d);
    });
  });
  req.end();

  req.on('error', function(e) {
    console.error("error", e);
    callback(e);
  });
};

// export the class
module.exports = ApiInterface;