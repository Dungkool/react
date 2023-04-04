const {response} = require("express");

application.get("/gugu", (request, response) => {
  let dan = request.query.dan;
  let result = "";
  for (i = 1; i <= 9; i++) {
    result += `${dan} * ${i} = ${dan * i}<br/>`;
  }
  console.log(result);
  response.writeHead(200, {"Content-type": "text/html"});
  response.end(result);
  //response.end("hello"); 이미 데이터 보내기를 완료해서 에러가 발생
});

//http://127.0.0.1:4000/gugu/4
application.get("/gugu/:dan", (request, response) => {
  let dan = request.params.dan;
  let result = "";
  for (i = 1; i <= 9; i++) {
    result += `${dan} * ${i} = ${dan * i}<br/>`;
  }
  console.log(result);
  response.writeHead(200, {"Content-type": "text/html"});
  response.end(result);
  //response.end("hello"); 이미 데이터 보내기를 완료해서 에러가 발생
});

app.listen(4000, () => {
  console.log("server start http://127.0.0.1:4000");
});
