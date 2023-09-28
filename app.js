const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
     res.setHeader('Content-Type', 'text/html');
     if(req.url === '/') res.write(`<html><head><title>Responce</title></head><body><form action="/msg" method="post"><input type="text" name="text"><input type="submit" value="send"></form></body></html>`);
     else if(req.url === '/msg' && req.method === 'POST') {
        const body = [];
        req.on('data', chunk => body.push(chunk));
        req.on('end', () => fs.writeFileSync('msg.txt', Buffer.concat(body).toString().split('=')[1]));
        res.writeHead(302, {'Location' : '/'});
     } else res.write(`<html><head><title>Responce</title></head><body><h1>Welcome to Server</h1></body></html>`);
    res.end();
});

server.listen(4000);