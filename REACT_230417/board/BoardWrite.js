import "bootstrap/dist/css/bootstrap.min.css";
import React, {useState, useEffect} from "react";
import axios from "axios";
import {SERVERIP} from "../../CommonUtil";
import {Link, useNavigate, useParams} from "react-router-dom";

function BoardWrite(props) {
  let {id} = useParams(); // 보내는 쪽에서 JSON 객체로 보냄
  let history = useNavigate();

  /*   const [title, setTitle] = useState("");
  const [writer, setWriter] = useState("");
  const [contents, setContents] = useState("");
 */

  // 변수 4개를 하나의 JSON객체로 저장 - 필드가 많을 때 변수 하나씩 만들면 힘들다.
  const [inputs, setInputs] = useState({
    title: "",
    writer: "",
    contents: "",
    filename: "",
  });

  //모든 필드의 이벤트 처리를 여기서 한다.
  const onChange = (e) => {
    const {value, name} = e.target; // 입력 객체로부터 값과 이름을 가져온다.
    console.log(value, name);
    setInputs({...inputs, [name]: value}); //{...inpusts} - JSON객체 복사

    /*
    위 코드를 해석하면 아래처럼 나온다. 
    let temp = inputs;
    temp[name] = value;
    setInputs(temp)
     */
  };

  /* useEffect(() => {
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
  }, []); */

  /*   const nameChange = (e) => {
    setHeroName(e.target.value);
  };
 */

  /*   const titleChange = (e) => {
    setTitle(e.target.value);
  };

  const writerChange = (e) => {
    setWriter(e.target.value);
  };

  const contentsChange = (e) => {
    setContents(e.target.value);
  }; */

  // 서버로 전송하기
  const postData = () => {
    // 데이터를 json으로 묶어서 보내야 한다.
    let formData = new FormData();
    /* let data = {title: title, writer: writer, contents: contents}; */
    formData.append("title", inputs.title);
    formData.append("writer", inputs.writer);
    formData.append("contents", inputs.contents);
    formData.append("file", document.myform.file.files[0]);
    // 파일 첨부 시 자바스크립트가 파일이 여러개 첨부하는거로 처리한다.
    // 그래서 무조건 배열의 형태이다. document.폼이름.file태그의 name 속성.files[0];
    // 여러 개 추가할 수도 있다.

    axios
      .post(SERVERIP + "/rest_board/save", formData)
      .then((res) => {
        console.log(res.data);
        history("/board/list"); // redirect에 대응
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //JSON을 각개 변수로 해체(destruction)
  const {title, writer, contents, file} = inputs;

  return (
    <div className="container">
      <form name="myform" encType="multipart/form-data">
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
                    name="title"
                    placeholder="제목을 입력하세요."
                    onChange={onChange}
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
                    name="writer"
                    placeholder="작성자를 입력하세요."
                    onChange={onChange}
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
                    name="contents"
                    placeholder="내용을 입력하세요."
                    onChange={onChange}
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td>파일</td>
              <td>
                <div className="mb-3" style={{marginTop: "13px"}}>
                  <input
                    type="file"
                    className="form-control"
                    value={file}
                    name="file"
                    placeholder="파일을 첨부하세요."
                    onChange={onChange}
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
        </div>{" "}
      </form>
    </div>
  );
}

export default BoardWrite;
