


var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
//var exphbs = require('express-handlebars');

var app = express();

var routes = require('./index');

// View Engine
    //app.set('views', path.join(__dirname, 'clients'));
    // app.engine('handlebars', exphbs({defaultLayout:'layout'}));
    // app.set('view engine', 'handlebars');

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

// Set Port
app.set('port', (process.env.PORT || 3000));

//set app to listen to port 3000
app.listen(app.get('port'), function(){
	console.log('Server started on port '+app.get('port'));
});
