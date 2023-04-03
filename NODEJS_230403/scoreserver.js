let http = require("http");
let fs = require("fs");
let ejs = require("ejs");
let scoreData = [
  {name: "홍길동", kor: 80, eng: 90, mat: 50},
  {name: "임꺽정", kor: 80, eng: 90, mat: 50},
  {name: "장길산", kor: 80, eng: 90, mat: 50},
  {name: "강감찬", kor: 80, eng: 90, mat: 50},
  {name: "이순신", kor: 80, eng: 90, mat: 50},
];
let server = http.createServer((request, response) => {
  fs.readFile("./html/score.html", "utf-8", (error, data) => {
    if (error) {
      response.writeHead(500, {"Content-Type": "text/html; charset=utf-8"});
      response.end("error");
      return;
    }
    response.writeHead(200, {"Content-Type": "text/html;charset=utf-8"});
    response.end(
      ejs.render(data, {
        scoreData: scoreData,
      })
    ); //ejs 템플릿 엔진을 통해 html과 nodejs의 데이터를 렌더링(결합)한다
  });
});
server.listen(4000, () => {
  console.log("server start http://127.0.0.1:4000");
});
//먼저 여기서 실행 후 접속
