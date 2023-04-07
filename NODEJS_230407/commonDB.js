//board.js에서 디비접근, member.js에서 디비접근 -- 디비에 데이터 읽고 쓰기 전문 코드

var mysql = require("mysql");
const {resolve} = require("path");
const DBInfo = {
  connectionLimit: 10,
  host: "localhost",
  user: "user01",
  password: "1234",
  database: "mydb",
  port: 3306,
};

let readpool = mysql.createPool(DBInfo);
async function mysqlRead(sql, params) {
  let promise = new Promise((resolve, reject) => {
    readpool.getConnection((err, conn) => {
      if (err) {
        console.log(err);
        reject(err);
      }

      conn.query(sql, params, (err, rows) => {
        console.log(sql);
        console.log(rows);
        if (err) reject(err);
        else resolve(rows);
        conn.release();
      });
    });
  });
  await promise;
  return promise;
}

exports.mysqlRead = mysqlRead;
exports.DBInfo = DBInfo;

/* 
select * from tb_board where id=${id}
'select` * from tb_board where id =?', [id] */
