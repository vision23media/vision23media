const express = require('express')
const hbs = require('hbs')
const fs = require('fs')
const blogEngine = require('./blog')
const app = express()
const http = require('http')
const connect = require('connect')

app.set('view engine', 'html');
app.engine('html', hbs.__express);

var partialsDir = __dirname + '/views/partials';
var filenames = fs.readdirSync(partialsDir);


filenames.forEach(function (filename) {
  var matches = /^([^.]+).html$/.exec(filename);
  if (!matches) {
    return;
  }
  var name = matches[1];
  var template = fs.readFileSync(partialsDir + '/' + filename, 'utf8');
  hbs.registerPartial(name, template);
});



var MongoClient = require('mongodb').MongoClient;
MongoClient.connect('mongodb://localhost:27017/', function(err, db) {
    if(err) {
        console.log('Sorry, there is no mongo db server running.');
    } else {
    	console.log("got the db");
        var attachDB = function(req, res, next) {
            req.db = db;
            //next();
        };

        var collectionz = db.collection('primer');
        var findQueens = collectionz.find({ borough: 'Queens' });

        //console.log(collection);
        //console.log(findQueens.count);


        app.get('/vision', (req, res) => v23m(res))
        app.get('/about', (req, res) =>  res.render('about'))

        //app.get('/', (req, res) => res.sendFile(__dirname + '/views/index.html'))

        app.get('/', function(req, res) {
            res.render('index',{title:"My Blog", entries:blogEngine.getBlogEntries()});
        });

        http.createServer(app).listen(27017, function(){
            console.log('Express server listening on port 27017');
        });
    }

});







function v23m(res){
	res.send('hello world');
  	console.log("VISION23MEDIA");
  	//res.render('index');
}

hbs.registerPartial('myPartial', 'metoo');



app.listen(3000, () => console.log('Example app listening on port 3000!'))