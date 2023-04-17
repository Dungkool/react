//rest_board.js
// https://songhee96.tistory.com/27  : multer 사용법

let express = require("express");
let router = express.Router();
let commonDB = require("./commonDB");
let commonUtil = require("./commonUtil");
const {checkout} = require("./scoreListBack");
//npm install murter : nodejs에서 파일 업로드를 담당

let multer = require("multer");
let path = require("path"); //파일이나 디스크 관리 모듈
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/board"); // 파일 업로드 경로 지정
    //cb - 파일 업로드 시 이 함수가 호출된다.
  },
  filename: function (req, file, cb) {
    // new Date => 현재 날짜와 시간, 분초까지 알아온다. => valueOf() 문자열로 변경
    // 본래 파일명이 중복될 가능성이 있어서 별도의 파일명을 부여한다.
    // 확장자는 본래 파일명으로 해야한다.
    // path.extname(파일명) - 파일의 확장자를 가져온다.
    // 두 번째 인자인 file이 업로되는 파일인데 이 파일의 originalfilename에 원래
    // 파일명이 있다.
    let newFilename = new Date().valueOf() + path.extname(file.originalname);
    cb(null, newFilename);
  },
});

//제한
const limits = {
  fieldNameSize: 200, //필드명 사이즈 최대값
  filedSize: 1024 * 1024, // 필드 사이즈 값 설정 (기본값 1MB)
  fields: 2, // 파일 형식이 아닌 필드의 최대 개수 (기본 값 무제한)
  fileSize: 20 * 1024 * 1024, //multipart 형식 폼에서 최대 파일 사이즈(bytes) "16MB 설정" (기본 값 무제한)
  files: 10, //multipart 형식 폼에서 파일 필드 최대 개수 (기본 값 무제한)
};

//확장자 필터
const fileFilter = (req, file, callback) => {
  const typeArray = file.mimetype.split("/");
  const fileType = typeArray[1];

  if (fileType == "jpg" || fileType == "jpeg" || fileType == "png") {
    callback(null, true);
  } else {
    return callback(null, false);
  }
};

let upload = multer({
  storage: storage, //이미지 업로드
  /*   limits: limits, //업로드 제한
  fileFilter: fileFilter, //파일 제한 */
});

/* GET home page. */
// http://localhost:9090/rest_board/list : X
// http://localhost:9090/rest_board/list/1 : O
router.get("/list/:pg", async function (req, res, next) {
  let pg = parseInt(req.params.pg);
  // pg=1, 0   --> (pg-1) * 10 = 0
  // pg=2, 10  --> (pg-1) * 10 = 10
  // pg=3, 20  --> (pg-1) * 10 = 20

  let sql = `
    SELECT count(*) cnt
	  FROM tb_board A
	  LEFT OUTER JOIN (SELECT @rownum:=0) B on 1=1
	  LEFT OUTER JOIN tb_member C ON A.writer=C.userid
  `;
  let results = await commonDB.mysqlRead(sql, []);
  let totalCnt = results[0]["cnt"];

  sql = `
    SELECT A.id, A.title, A.writer, A.num, A.username
		,date_format(A.wdate, '%Y-%m-%d') wdate
    ,A.filename, A.filelink
    FROM
    (
	    SELECT A.id, A.title, A.writer, A.wdate, C.username, A.filename, A.filelink
	    ,@rownum:=@rownum+1 num
	    FROM tb_board A
	    LEFT OUTER JOIN (SELECT @rownum:=0) B on 1=1
	    LEFT OUTER JOIN tb_member C ON A.writer=C.userid 
	    ORDER BY id DESC
    )A
    LIMIT ${(pg - 1) * 10}, 10
  `;

  results = await commonDB.mysqlRead(sql, []);
  console.log(results);
  res.json({
    boardList: results,
    totalCnt: totalCnt,
    pg: pg,
  });
});
// 한 함수 내에서 res.json 호출하고 또 다시 res.send나 render나 json 호출 못한다.

/* router.get("/view/:id", async function (req, res, next) {
  let id = req.params.id;
  let sql = `select * from tb_board where id=${id}`;
  let results = await commonDB.mysqlRead(sql, []);
  let reresult = results[0]; // The first item of the array contains the record data
  res.render("board/board_view", {board: reresult});
}); */

router.get("/view/:id", async function (req, res, next) {
  let id = req.params.id;
  let sql = `select A.id, A.title, A.writer, date_format(A.wdate, '%y-%m-%d') wdate, A.filename, A.filelink
              (select username from tb_member B where A.writer=B.userid) username
              FROM tb_board A
              where id=${id}`;

  let results = await commonDB.mysqlRead(sql, []);
  if (results.length == 0) {
    res.json({result: "fail", msg: "해당하는 데이터를 찾을 수 없습니다."});
    return;
  }

  res.json({result: "success", msg: "", boardData: results[0]});
});

//http://127.0.0.1:9090/rest_board/save
//{title : "제목", writer : "test", contents : "내용"}
//응답 성공 시 result : "success", msg : "등록 성공"
//응답 실패 시 result : "fail", msg : "등록실패"

router.post("/write", async function (req, res, next) {
  checkInfos = [
    {key: "title", type: "str", range: 200},
    {key: "writer", type: "str", range: 40},
    {key: "contents", type: "str", range: -1},
  ];

  // 수행 결과 값이 0이면 문제 없는 거고, 다른 숫자가 오면 오류
  insertInfo = commonUtil.checkInfo(req, checkInfos);
  if (insertInfo["result"] != 0) {
    res.json(insertInfo);
    return;
  }
  let title = req.body.title;
  let writer = req.body.writer;
  let contents = req.body.contents;

  let sql = `select count(*) cnt from tb_member where userid='${req.body.writer}'`;
  results = await commonDB.mysqlRead(sql, []);
  if (results[0]["cnt"] == 0) {
    res.json({result: "fail", msg: "해당하는 아이디가 없습니디."});
    return;
  }

  sql = `insert into tb_board(title, writer, contents, wdate)
  values( '${title}', '${writer}', '${contents}', now())`;
  await commonDB.mysqlRead(sql, []);

  res.json({result: "success", msg: "등록성공"});
});

/* router.use("/save", async (request, response, next) => {
  let sql = `
  INSERT INTO tb_board(title, writer, contents, wdate)
  VALUES("제목7","홍길동","내용7", NOW());
          `;
  await commonDB
    .mysqlRead(sql, [])
    .then(response.json({result: "success", msg: "등록성공"}))
    .catch((e) => {
      response.json({result: "fail", msg: "등록실패"});
      return;
    });
}); */

// upload.single("file") - 파일 업로드 부분만 중간에 따로 처리한다.
// upload.single(폼태그에서 file 속성의 name이 file이다.)
// <input type = "file" name="file"/> 이 때 name 속성값이다.
// 파일 전송 시 form 태그에 enctype = "form-data/multipart" 속성이 반드시 있어야 한다.
// ejs나 jsp 같은 데서 사용

// ajax로 전송할 때는 FormData라는 객체를 이용해서 보내야 한다.
// $.ajax나 axios 모던 스크립트 fetch라는 ajax 모듈 추가

router.post("/save", upload.single("file"), async function (req, res, next) {
  checkInfos = [
    {key: "title", type: "str", range: 200},
    {key: "writer", type: "str", range: 40},
    {key: "contents", type: "str", range: -1},
  ];

  let file = req.file;
  console.log(file.originalname); // 원래이름
  console.log(file.filename); // 부여한 이름

  // 수행결과 값이 0이면 문제 없는 것이고, 다른 숫자가 오면 오류임
  insertInfo = commonUtil.checkInfo(req, checkInfos);
  if (insertInfo["result"] != 0) {
    res.json(insertInfo);
    return;
  }
  let title = req.body.title;
  let writer = req.body.writer;
  let contents = req.body.contents;
  let filename = file.filename;
  let filelink = "uploads/board/" + filename;

  let sql = `select count(*) cnt from tb_member where userid='${req.body.writer}'`;
  results = await commonDB.mysqlRead(sql, []);
  if (results[0]["cnt"] == 0) {
    res.json({result: "fail", msg: "해당하는 아이디가 없습니디."});
    return;
  }

  sql = `insert into tb_board(title, writer, contents, wdate, filename, filelink)
  values( '${title}', '${writer}', '${contents}', now(), '${filename}', '${filelink}')`;

  await commonDB.mysqlRead(sql, []);
  res.json({result: "success", msg: "등록성공"});
});

module.exports = router;
