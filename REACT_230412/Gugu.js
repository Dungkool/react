import React, {useState} from "react";

function Gugu(props) {
  const [dan, setDan] = useState(0);
  const [iList] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  const [show, setShow] = useState(false); // true일 때만 구구단 출력

  const danChange = (e) => {
    setShow(false); // show가 false라서 화면에 출력 X
    setDan(e.target.value); // 몇단인지 입력
  };

  const goConfirm = () => {
    setShow(true);
  };

  return (
    <div>
      몇단? : <input type="text" onChange={danChange}></input>&nbsp;&nbsp;
      <button type="button" onClick={goConfirm}>
        보기
      </button>
      <ul>
        {show
          ? iList.map((item, index) => {
              return (
                <li key={index}>
                  {dan} X {item} = {dan * item}
                </li>
              );
            })
          : ""}
      </ul>
    </div>
  );
}

export default Gugu;
