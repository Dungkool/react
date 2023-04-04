var express = require("express");
var fs = require("fs");
var ejs = require("ejs");
var app = express();

//bodyParse -- npm install bodyParser를 하고 해야 한다.
//새 버전에서는 express가 갖고 있다.
//post로 전송할 때 request.body에 보낸 정보를 추가해서 사용이 간편하도록 도와주는 미들웨어이다.

app.use(express.urlencoded({extended: false}));

app.get("/input", (request, response) => {
  fs.readFile("./input.html", "utf-8", (err, data) => {
    response.writeHead(200, {"Content-type": "text/html"});
    response.end(ejs.render(data));
  });
});

app.get("/login", (request, response) => {
  let userid = request.query.userid;
  let password = request.query.password;

  if (userid == "test" && password == "1234") {
    response.send("login success");
  } else {
    response.send("login fail");
  }
});

app.listen(4000, () => {
  console.log("server start http://127.0.0.1:4000");
});
