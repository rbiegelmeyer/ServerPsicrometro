var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

var clients = {};

app.get("/", function (req, res) {
    res.sendfile("./views/index.html");
});


io.on('connection', function (client) {
    client.on('join', function (id) {
        console.log(id);
        client.id = id;
        clients[id] = client;
        console.log('\x1b[32m%s\x1b[0m', '\n===> Joined: ' + id);
        console.log('=======================');
    });

    client.on("data", function(data) {
        console.log(data);
        console.log('\n');
        io.emit("data", data);
    });
});



http.listen(3000, function () {
    console.log('listening on port 3000');
});
