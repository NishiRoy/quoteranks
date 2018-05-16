const express = require('express');
const app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
var path=require("path");
var mongoose=require('mongoose');
mongoose.Promise = global.Promise;
app.use(express.static(__dirname + "/static"));

app.set('views', (__dirname+"/views"));

app.use(express.static( __dirname + '/authors/dist/authors' ));

app.set('view engine', 'ejs');

const flash = require('express-flash');
app.use(flash());

var session=require('express-session');
app.use(session({secret: '1955api'}));

require('./server/config/mongoose.js');
require('./server/config/routes.js')(app)

app.all("*", (req,res,next) => {
    res.sendFile(path.resolve("./authors/dist/authors/index.html"))
  });
// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
})