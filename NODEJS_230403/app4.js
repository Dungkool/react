var express = require("express");
var app = express();
var ejs = require("ejs");
var fs = require("fs");
const {error} = require("console");

app.set("view engine", ejs); //내부변수에 값을 설정한다.
// 미들웨어를 사용한다.

app.use(express.urlencoded({extended: false}));

app.get("/gugu", (request, response) => {
  console.log(request.params);
  let dan = parseInt(request.params.i);
  for (dan = 1; dan < 10; dan++) {
    for (j = 1; j < 10; j++) response.send((4 * dan).toString());
  }
  //send 함수를 이용해 json 송신
});

app.get("/", (request, response) => {
  fs.readFile("html/index.html", "utf-8", (error, data) => {
    response.end(data);
  });
});

app.use((request, response) => {
  response.writeHead(200, {"Content-Type": "text/html"});
  response.end("<H1>Express</H1>");
});

//http://127.0.0.1:4000/add/45/7
app.get("/add/:x/:y", (request, response) => {
  console.log(request.params);
  let x = parseInt(request.params.x);
  let y = parseInt(request.params.y);
  /*   let cal = {
    x: request.params.x,
    y: request.params.y,
    "x+y": parseInt(request.params.x) + parseInt(request.params.y),
  }; */
  response.send((x + y).toString()); //send 함수를 이용해 json 송신
});

app.use("/test", (request, response) => {
  response.writeHead(200, {"Content-type": "text/html"});
  response.end("<H1>Test</H1>");
});

app.get("/get", (request, response) => {
  response.writeHead(200, {"Content-type": "text/html"});
  response.end("<H1>Get</H1>");
});

app.get("/userinfo", (req, res) => {
  let userinfo = {name: "Tom", phone: "010-0000-0000"};
  res.send(userinfo); // send 함수를 이용해서 JSON 데이터 송신
});

app.get("/userinfo2", (req, res) => {
  // req.query.name;
  let userinfo = {name: req.query.name, phone: req.query.phone};
  res.send(userinfo); // send 함수를 이용해서 JSON 데이터 송신
});

// get 방식 - 새롭게 추가된 url 방식
// http://127.0.0.1:4000/userinfo3/Brown/user01
app.get("/userinfo3/:username/:userid", (req, res) => {
  console.log(req.params); //.name;
  let userinfo = {
    username: req.params.username,
    userid: req.params.userid,
  };
  res.send(userinfo); // send 함수를 이용해서 JSON 데이터 송신
});

app.post("/post", (request, response) => {
  response.writeHead(200, {"Content-type": "text/html"});
  response.end("<H1>Post</H1>");
});

app.listen(4000, () => {
  console.log("server start http://127.0.0.1:4000");
});
