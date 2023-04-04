var express = require("express");
var app = express();

app.use((request, response, next) => {
  // request 브라우저 -> 서버
  // response 서버 -> 브라우저
  // next -> 다음 함수를 호출
  request.name = "홍길동";
  response.name = "John";
  console.log("aaaaa");
  next();
});

app.use((request, response, next) => {
  console.log("bbbbb");
  response.phone = "010-1234-5678";
  response.address = "서울시 영등포구";
  next();
});

app.use((request, response) => {
  response.writeHead(200, {"Content-type": "text/html;charset=utf-8"});
  console.log(request.name);
  console.log(response.name);
  console.log(response.phone);
  console.log(response.address);
  response.end("<H1>Express</H1>");
});

app.listen(4000, () => {
  console.log("server start http://127.0.0.1:4000");
});
