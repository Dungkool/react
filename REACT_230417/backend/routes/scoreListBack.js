var express = require("express");
var router = express.Router();
let commonDB = require("./commonDB");

/* GET home page. */
/* http://localhost:9090/score/list */
router.get("/list", async function (req, res, next) {
  let sql = `
  SELECT A.id, A.student_name, A.kor, A.eng, A.mat, DATE_FORMAT(A.wdate, '%y-%m-%d') wdate
  FROM tb_score A;`;

  let results = await commonDB.mysqlRead(sql, []);
  res.json(results);
});

/* http://localhost:9090/score/view/1 */

router.get("/view/:id", async function (req, res, next) {
  try {
    let id = req.params.id;
    let sql = `select * from tb_score where id=${id}`;
    let results = await commonDB.mysqlRead(sql, []);
    res.json({result: "success", score: results[0]});
  } catch (e) {
    console.log(e);
    res.json({result: "fail"});
  }
});

module.exports = router;
