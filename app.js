const http = require('http');

const server = http.createServer((req, res) => {
    console.log('appa');
});

server.listen(4000);