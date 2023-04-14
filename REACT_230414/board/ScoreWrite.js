import "bootstrap/dist/css/bootstrap.min.css";
import React, {useState, useEffect} from "react";
import axios from "axios";
import {SERVERIP} from "../../CommonUtil";
import {Link, useNavigate, useParams} from "react-router-dom";

function ScoreWrite(props) {
  let {id} = useParams(); // 보내는 쪽에서 JSON 객체로 보냄
  let history = useNavigate();

  const [studentName, setStudentName] = useState("");
  const [kor, setKor] = useState("");
  const [eng, setEng] = useState("");
  const [mat, setMat] = useState("");

  useEffect(() => {
    console.log("id", id);
    async function loadData() {
      let results = await axios.get(SERVERIP + "/score/view/" + id);
      setStudentName(results.data.score.STUDENT_NAME);
      setKor(results.data.score.KOR);
      setEng(results.data.score.ENG);
      setMat(results.data.score.MAT);
    }
    if (id != undefined) {
      loadData();
    }
  }, []);

  const nameChange = (e) => {
    setStudentName(e.target.value);
  };

  const korChange = (e) => {
    setKor(e.target.value);
  };

  const engChange = (e) => {
    setEng(e.target.value);
  };
  const matChange = (e) => {
    setMat(e.target.value);
  };

  // 서버로 전송하기
  const postData = () => {
    // 데이터를 json으로 묶어서 보내야 한다.
    let data = {student_name: studentName, kor: kor, eng: eng, mat: mat};
    axios
      .post(SERVERIP + "/score/write", data)
      .then((res) => {
        console.log(res.data);
        history("/score/list"); // redirect에 대응
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container">
      <h1>게시판 글쓰기</h1>
      <table className="table table-hover" style={{marginTop: "30px"}}>
        <colgroup>
          <col width="25%" />
          <col width="*" />
        </colgroup>
        <tbody>
          <tr>
            <td>이름</td>
            <td>
              <div className="mb-3" style={{marginTop: "13px"}}>
                <input
                  type="text"
                  className="form-control"
                  value={studentName}
                  placeholder="이름을 입력하세요."
                  onChange={nameChange}
                />
              </div>
            </td>
          </tr>
          <tr>
            <td>국어</td>
            <td>
              <div className="mb-3" style={{marginTop: "13px"}}>
                <input
                  type="text"
                  className="form-control"
                  value={kor}
                  placeholder="국어 점수를 입력하세요."
                  onChange={korChange}
                />
              </div>
            </td>
          </tr>
          <tr>
            <td>영어</td>
            <td>
              <div className="mb-3" style={{marginTop: "13px"}}>
                <input
                  type="text"
                  className="form-control"
                  value={eng}
                  placeholder="영어 점수를 입력하세요."
                  onChange={engChange}
                />
              </div>
            </td>
          </tr>
          <tr>
            <td>수학</td>
            <td>
              <div className="mb-3" style={{marginTop: "13px"}}>
                <input
                  type="text"
                  className="form-control"
                  value={mat}
                  placeholder="수학 점수를 입력하세요."
                  onChange={matChange}
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="container mt-3" style={{textAlign: "right"}}>
        <Link className="btn btn-secondary" onClick={postData}>
          등록
        </Link>
        &nbsp;&nbsp;
        <Link className="btn btn-secondary">취소</Link>
      </div>
    </div>
  );
}

export default ScoreWrite;
