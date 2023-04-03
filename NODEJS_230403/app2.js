var express = require("express");
var app = express();

//express 모듈 자체가 use, get, post 함수 3개가 있음
//use - get, post가 오던
//get - get 방식으로 온 것만
//post - post 방식으로 온 것만

//http://127.0.0.1:4000/add?x=45&y=7
app.get("/add", (req, res) => {
  let x = parseInt(req.query.x);
  let y = parseInt(req.query.y);
  res.send((x + y).toString());
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
