var express = require('express');
var path = require('path');
var friendsRoute = require("./app/routing/apiRoutes");

var app = express();

var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('./app/public'));
app.use(express.static('./app/public/css'));
app.use(express.static('./app/public/javascript'));

// NOT THE BEST WAY OF HANDLING
// require("./app/routing/apiRoutes.js")(app);
require("./app/routing/htmlRoutes.js")(app);
// BETTER WAY TO HANDLE THIS
app.use(friendsRoute);

app.listen(PORT, function () {
   console.log(`App listening on PORT: ${PORT}`);
});