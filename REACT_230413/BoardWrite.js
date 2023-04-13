import "bootstrap/dist/css/bootstrap.min.css";
import React, {useState, useEffect} from "react";
import axios from "axios";
import {SERVERIP} from "../../CommonUtil";
import {Link, useNavigate, useParams} from "react-router-dom";

function BoardWrite(props) {
  let {id} = useParams(); // 보내는 쪽에서 JSON 객체로 보냄
  let history = useNavigate();

  const [heroName, setHeroName] = useState("");
  const [heroDesc, setHeroDesc] = useState("");

  useEffect(() => {
    console.log("id", id);
    async function loadData(id) {
      let results = await axios.get(SERVERIP + "/hero/view/" + id);
      console.log(results.data.hero.hero_name);
      console.log(results.data.hero.hero_desc);

      setHeroName(results.data.hero.hero_name);
      setHeroDesc(results.data.hero.hero_desc);
    }
    if (id != undefined) {
      loadData(id);
    }
  }, []);

  const nameChange = (e) => {
    setHeroName(e.target.value);
  };

  const descChange = (e) => {
    setHeroDesc(e.target.value);
  };

  // 서버로 전송하기
  const postData = () => {
    // 데이터를 json으로 묶어서 보내야 한다.
    let data = {hero_name: heroName, hero_desc: heroDesc};
    axios
      .post(SERVERIP + "/hero/write", data)
      .then((res) => {
        console.log(res.data);
        history("/board/list"); // redirect에 대응
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
                  value={heroName}
                  placeholder="이름을 입력하세요."
                  onChange={nameChange}
                />
              </div>
            </td>
          </tr>
          <tr>
            <td>업적</td>
            <td>
              <div className="mb-3" style={{marginTop: "13px"}}>
                <input
                  type="text"
                  className="form-control"
                  value={heroDesc}
                  placeholder="업적을 입력하세요."
                  onChange={descChange}
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

export default BoardWrite;
