const fs = require("fs");

const requestHandler = (req, res) => {
    res.setHeader("Content-Type", "text/html");
  
    if (req.url === "/") {
      return fs.readFile("msg.txt", "utf-8", (err, msg) => {
        res.write(
          `<html>
              <head>
                  <title>Responce</title>
              </head>
              <body>
                  <h1>${msg}</h1>
                  <form action="/msg" method="post">
                      <input type="text" name="text" />
                      <input type="submit" value="send" />
                  </form>
              </body>
          </html>`
        );
        res.end();
      });
    }
  
    if (req.url === "/msg" && req.method === "POST") {
      const body = [];
  
      req.on("data", (chunk) => body.push(chunk));
  
      return req.on("end", () => {
        const data = Buffer.concat(body).toString().split("=")[1];
  
        fs.writeFile("msg.txt", data, "utf8", (err) => {
          res.writeHead(302, { Location: "/" });
          res.end();
        });
      });
    }
  
    res.write(
      `<html>
           <head>
               <title>Responce</title>
           </head>
           <body>
               <h1>Welcome to Server</h1>
          </body>
       </html>`
    );
    res.end();
  }

  module.exports = requestHandler;