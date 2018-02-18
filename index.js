const express = require('express')
const app = express()

function v23m(res){
	//res.send('hello world');
  	console.log("VISION23MEDIA");
  	res.render('index');
}

app.get('/index.html', (req, res) => v23m(res))

app.listen(3000, () => console.log('Example app listening on port 3000!'))