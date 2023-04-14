import "bootstrap/dist/css/bootstrap.min.css";
import React, {useState, useEffect} from "react";
import axios from "axios";
import {SERVERIP} from "../../CommonUtil";
import {Link, useNavigate, useParams} from "react-router-dom";

function BoardWrite(props) {
  let {id} = useParams(); // 보내는 쪽에서 JSON 객체로 보냄
  let history = useNavigate();

  const [title, setTitle] = useState("");
  const [writer, setWriter] = useState("");
  const [contents, setContents] = useState("");

  useEffect(() => {
    console.log("id", id);
    async function loadData(id) {
      let results = await axios.get(SERVERIP + "/board/view/" + id);
      console.log(results.data.board.title);
      console.log(results.data.board.writer);

      setTitle(results.data.board.title);
      setWriter(results.data.board.writer);
      setContents(results.data.board.contents);
    }
    if (id != undefined) {
      loadData(id);
    }
  }, []);

  /*   const nameChange = (e) => {
    setHeroName(e.target.value);
  };
 */

  const titleChange = (e) => {
    setTitle(e.target.value);
  };

  const writerChange = (e) => {
    setWriter(e.target.value);
  };

  const contentsChange = (e) => {
    setContents(e.target.value);
  };

  // 서버로 전송하기
  const postData = () => {
    // 데이터를 json으로 묶어서 보내야 한다.
    let data = {title: title, writer: writer, contents: contents};
    axios
      .post(SERVERIP + "/rest_board/write", data)
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
            <td>제목</td>
            <td>
              <div className="mb-3" style={{marginTop: "13px"}}>
                <input
                  type="text"
                  className="form-control"
                  value={title}
                  placeholder="제목을 입력하세요."
                  onChange={titleChange}
                />
              </div>
            </td>
          </tr>
          <tr>
            <td>작성자</td>
            <td>
              <div className="mb-3" style={{marginTop: "13px"}}>
                <input
                  type="text"
                  className="form-control"
                  value={writer}
                  placeholder="작성자를 입력하세요."
                  onChange={writerChange}
                />
              </div>
            </td>
          </tr>
          <tr>
            <td>내용</td>
            <td>
              <div className="mb-3" style={{marginTop: "13px"}}>
                <input
                  type="text"
                  className="form-control"
                  value={contents}
                  placeholder="내용을 입력하세요."
                  onChange={contentsChange}
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
