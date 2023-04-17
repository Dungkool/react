// routes 폴더에 넣을 것 commonUtil.js
function getPaging(pg, totalCnt, pageGroupSize = 10) {
  /*                                         그룹번호
     1  2  3  4  5  6  7  8  9 10   0 ~ 9       1   1, 10
    11 12 13 14 15 16 17 18 19 20   10~19       2   11,20
    21 22 23 24 25 26 27            20~26       3   21,30
    
    (1-1)/10 * 10       0/10*10 = 0
    (2-1)/10 * 10       1/10*10 = 0
    (3-1)/10 * 10       1/10*10 = 0
    (8-1)/10 * 10       1/10*10 = 0
    (9-1)/10 * 10       1/10*10 = 0
    (10-1)/10 * 10      1/10*10 = 0

    (11-1)/10 * 10      = 10
    (12-1)/10 * 10      = 10
    (13-1)/10 * 10      = 10

    (21-1)/10 * 10      = 20

    */
  // 전체 페이지 개수, 어느 그룹에 속하는지 확인해야 합니다.
  pnTotal = Math.ceil(totalCnt / 10); // 한 페이지당  데이터가 10개인데 총 데이터가 15건 -> 올림해서 2페이지 나와야 함

  pgGroupStart = parseInt((pg - 1) / pageGroupSize) * pageGroupSize + 1;
  pgGroupEnd = pgGroupStart + 10;
  if (pgGroupEnd > pnTotal) {
    pgGroupEnd = pnTotal + 1;
  }
  console.log(pg, pgGroupStart, pgGroupEnd);

  // 함수는 반환값이 하나여야 한다. -> json객체로 만들어 보내면 한 개로 됨
  return {pnTotal: pnTotal, pnStart: pgGroupStart, pnEnd: pgGroupEnd, pg: pg};
}

// for (i = 1; i <= 32; i++) {
//   getPaging(i, 320);
// }

function checkInfo(req, checkInfos) {
  msg = "";
  result = 0;
  resultInfo = {};

  for (info of checkInfos) {
    //undefined 상대방이 키값을 아예 안 보냄
    if (req.body[info.key] == undefined) {
      msg = info.key + " is empty\n";
      result = 1;
      req.body[info.key] = ""; // 다음 처리를 위해서 - 가급적 else를 사용하지 않기 위해서
    }

    //타입 or 범위 체크
    if (
      info.type == "str" &&
      info.range != -1 &&
      req.body[info.key].length > info.range
    ) {
      msg = msg += info.key + "range error";
    }
    resultInfo[info.key] = req.body[info.key];
    resultInfo["result"] = result;
    resultInfo["msg"] = msg;

    return resultInfo;
  }
}

exports.checkInfo = checkInfo;
exports.getPaging = getPaging;
