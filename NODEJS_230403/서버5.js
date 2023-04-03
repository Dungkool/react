let http = require("http");
let server = http.createServer((request, response) => {
  if (request.method == "POST") {
    //header먼저 전송. 이후 body 전송.
    //body 정보 별도로 수신하기.
    let body = "";
    //request의 on "data"
    request.on("data", (data) => {
      body += data;
      //오는 데이터를 계속 저장.
    });
    //데이터 수신 종료 시
    request.on("end", () => {
      //body변수
      let postData = new URLSearchParams(body);
      let name = postData.get("name");
      let age = postData.get("age");
      let temp = `<h1>post</h1> <h3>${name} ${age}</h3>`;

      response.writeHead(200, {"Content-Type": "text/html;charset=utf-8"});
      response.end(temp);
    });
  } else {
    response.writeHead(200, {"Content-Type": "text/html;charset=utf-8"});
    response.end("<H1>GET</H1>");
  }
});
server.listen(3000, () => {
  console.log("server start http://127.0.0.1:3000");
});
//먼저 여기서 실행 후 접속
