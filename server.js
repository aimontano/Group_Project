// server.js
var express = require('express');
var path = require('path');
var serveStatic = require('serve-static');
app = express();
app.use(serveStatic(__dirname + "/dist"));
// Catch all routes and redirect to the index file
app.get('*', function (req, res) {
    res.sendFile(__dirname + '/dist/index.html')
})
var port = process.env.PORT || 5000;
app.listen(port);