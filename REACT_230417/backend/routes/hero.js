var express = require("express");
var router = express.Router();
let commonDB = require("./commonDB");

/* GET home page. */
//http://localhost:9090/hero/view/1
router.get("/view/:id", async function (req, res, next) {
  try {
    let id = req.params.id;
    let sql = `select * from tb_hero where id=${id}`;
    let results = await commonDB.mysqlRead(sql, []);
    res.json({result: "success", hero: results[0]});
  } catch (e) {
    console.log(e);
    res.json({result: "fail"});
  }
});

router.get("/update", async function (req, res, next) {
  try {
    let id = req.params.id;
    let hero_name = req.body.hero_name;
    let hero_desc = req.body.hero_desc;
    let sql = `
      update tb_hero set hero_name=?
      , hero_desc=? where id=?`;
    await commonDB.mysqlRead(sql, [hero_name, hero_desc, id]);
    res.json({result: "success"});
  } catch (e) {
    console.log(e);
    res.json({result: "fail"});
  }
});

router.get("/list", async function (req, res, next) {
  let sql = `
    SELECT A.id
    , A.hero_name
    , A.hero_desc
    , DATE_FORMAT(A.wdate, '%Y-%m-%d') wdate 
    FROM tb_hero A;
    `;
  let results = await commonDB.mysqlRead(sql, []);
  res.json(results);

  // res.json(
  //   [
  //     {id:1, name:"이순신", descr:"임진왜란승리"},
  //     {id:2, name:"서지영", descr:"디올큰손"},
  //     {id:3, name:"조현손", descr:"무신사큰손"},
  //     {id:4, name:"이나은", descr:"디올애기"},
  //     {id:5, name:"장은정", descr:"밥플큰손"}
  //   ])
});

router.post("/write", async function (req, res, next) {
  try {
    let hero_name = req.body.hero_name;
    let hero_desc = req.body.hero_desc;
    let sql = `
    INSERT INTO tb_hero(hero_name, hero_desc, wdate)
    VALUES(?,?, now());
    `;
    await commonDB.mysqlRead(sql, [hero_name, hero_desc]);
    res.json({result: "success"});
  } catch (e) {
    console.log(e);
    res.json({result: "fail"});
  }
});

module.exports = router;
