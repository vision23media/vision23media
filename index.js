const express = require('express')
const hbs = require('hbs')
const fs = require('fs')
const blogEngine = require('./blog')
const app = express()
const http = require('http')
const connect = require('connect')
const mongoose = require('mongoose');

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



// var MongoClient = require('mongodb').MongoClient
// 	MongoServer = require('mongodb').Server;

// var mongoData = new MongoClient(new MongoServer('localhost', 27017));
// mongoData.open(function(err, mongoClientR) {
//   var db1 = mongoClientR.db("ace");

//   mongoData.close();
// });



// mongoose.connect('mongodb://localhost:27017/ace');

// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   // we're connected!
//   var kittySchema = mongoose.Schema({
//     name: String
//   }, {collection: 'ace'});
//   var Kitten = mongoose.model('Kitten', kittySchema);
//   var Queens = Kitten.find({'borough': 'Queens'}).lean().exec(function(err, ppl){
//   	var pplData = JSON.stringify(ppl);
//   });
// });

var MongoClient = require('mongodb').MongoClient;
MongoClient.connect('mongodb://localhost:27017/ace', function(err, db) {
    if(err) {
        console.log('Sorry, there is no mongo db server running.');
    } else {
    	console.log("got the db");
        var attachDB = function(req, res, next) {
            req.db = client.db;
            //next();
        };

        var db = db.db('ace');

        var queensPass;
        // var prim = db.collection('primer').find({'borough': 'Queens'});
        var prim2 = db.collection('primer').findOne({'borough': 'Queens'}).then(function(result){queensPass = result});;
        //var primCount = db.collection('primer').count().then(function(result){console.log(result)});

        //var db2 = db.collection('primer');
        //var prime = db.collection('primer');
	    //var theOne = db.getCollection('admin');

	    //console.log(theOne);
	    //console.log(theOne.count());

        // var collectionz = db.collection('primer');
        // var findQueens = collectionz.find({ 'borough': 'Bronx' });

        // console.log(findQueens);
        // //console.log(findQueens.count);

        //var yoyo = db.getCollection('primer').find({'borough': 'Queens'});



        app.get('/vision', (req, res) => v23m(res))
        app.get('/about', (req, res) =>  res.render('about'))

        //app.get('/', (req, res) => res.sendFile(__dirname + '/views/index.html'))

        app.get('/', function(req, res) {
            res.render('index',{title:"My Blog", entries:blogEngine.getBlogEntries(), queens: queensPass});
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