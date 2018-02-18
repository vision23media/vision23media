const express = require('express')
const app = express()

function v23m(res){
	res.send('hello world');
  	console.log("VISION23MEDIA");
  	//res.render('index');
}

app.get('/vision', (req, res) => v23m(res))

app.get('/', (req, res) => res.status(404).sendFile('/public/404.jpg'))

app.listen(3000, () => console.log('Example app listening on port 3000!'))