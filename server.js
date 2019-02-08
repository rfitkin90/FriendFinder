var express = require('express');
var path = require('path');

var app = express();

var PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('./app/public'));
app.use(express.static('./app/public/css'));
app.use(express.static('./app/public/javascript'));

require("./app/routing/apiRoutes.js")(app);
require("./app/routing/htmlRoutes.js")(app);


app.listen(PORT, function () {
   console.log(`App listening on PORT: ${PORT}`);
});