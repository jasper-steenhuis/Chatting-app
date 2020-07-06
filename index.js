var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var os = require('os');
var interfaces = os.networkInterfaces();
var addresses = [];


for (var k in interfaces) {
    for(var k2 in interfaces[k]){
        var address = interfaces[k][k2];
        if(address.family === 'IPv4' && !address.internal){
            addresses.push(address.address);
        }
    }
}
console.log(addresses);

app.get('/', (req,res) => {
    res.sendFile(__dirname + '/index.html');

});
io.on('connection', (socket) =>{
    socket.on('chat message', (msg) => {
    io.emit('chat message', msg);    
    });
});
io.on('disconnect',() => {
    console.log('user disconnected');
});
http.listen(3000,addresses,()=> {
    console.log('listening on ' + addresses);
});