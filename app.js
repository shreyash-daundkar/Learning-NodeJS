const http = require('http');

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/html');
    let text = req.url == '/home' ? 'Home page' : req.url == '/about' ? 'About us page' : req.url == '/node' ? 'My Project' : 'Server';
    res.write(`<html><head><title>Responce</title></head><body><h1>Welcome to ${text}</h1></body></html>`);
    res.end();
});

server.listen(4000);