const express = require('express')
const hbs = require('hbs')
const fs = require('fs')
const blogEngine = require('./blog')
const app = express()

app.set('view engine', 'html');
app.engine('html', hbs.__express);

var partialsDir = __dirname + '/views/partials';
var filenames = fs.readdirSync(partialsDir);

console.log(filenames);

filenames.forEach(function (filename) {
  var matches = /^([^.]+).html$/.exec(filename);
  if (!matches) {
    return;
  }
  var name = matches[1];
  var template = fs.readFileSync(partialsDir + '/' + filename, 'utf8');
  hbs.registerPartial(name, template);
});


function v23m(res){
	res.send('hello world');
  	console.log("VISION23MEDIA");
  	//res.render('index');
}

hbs.registerPartial('myPartial', 'metoo');

app.get('/vision', (req, res) => v23m(res))
app.get('/about', (req, res) =>  res.render('about'))

//app.get('/', (req, res) => res.sendFile(__dirname + '/views/index.html'))

app.get('/', function(req, res) {
    res.render('index',{title:"My Blog", entries:blogEngine.getBlogEntries()});
});

app.listen(3000, () => console.log('Example app listening on port 3000!'))