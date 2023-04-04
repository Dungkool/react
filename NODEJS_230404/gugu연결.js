let express = require("express");
let fs = require("fs");
let ejs = require("ejs");
let app = express();
app.use(express.urlencoded({extended: false}));
app.get("/guguform", (request, response) => {
  fs.readFile("./html/gugu.html", "utf-8", (err, data) => {
    response.writeHead(200, {"Content-type": "text/html"});
    response.end(ejs.render(data));
  });
});
app.get("/gugu", (req, res) => {
  let x = parseInt(req.query.x);
  let result = "";
  for (let i = 1; i <= 9; i++) {
    result += `${x}x${i}=${x * i}<br>`;
  }
  res.send(result);
});
app.listen(4000, () => {
  console.log("server start http://127.0.0.1:4000");
});
