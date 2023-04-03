const express = require('express')
const app = express()
const path = require('path')
var methodOverride = require('method-override')
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.set('views', './views');
app.set('view engine', 'pug');
app.use('', require('./routes/Route'))

app.listen(3030, function() {
	console.log(`The server is running on localhost and listening to port number which is 3030`);
});

