import React, {useState} from "react";

// 함수의 경우에는 생성자가 아니라 매개변수를 통한다.
// 부모가 자식한테 값을 보낼 때 매개변수를 통해서 보낸다.
// props -> JSON 객체가 온다.
function 과제과제(props) {
  //useState(변수의 초기값)
  const [name, setName] = useState("홍길동");
  const [kor, setKor] = useState(0);
  const [eng, setEng] = useState(0);
  const [math, setMath] = useState(0);
  const [result, setResult] = useState("");

  const nameChange = (e) => {
    setName(e.target.value);
  };

  const korChange = (e) => {
    setKor(parseInt(e.target.value));
  };

  const engChange = (e) => {
    setEng(parseInt(e.target.value));
  };

  const mathChange = (e) => {
    setMath(parseInt(e.target.value));
  };

  function resultChange(e) {
    let sum = parseInt(kor) + parseInt(eng) + parseInt(math);
    let avg = sum / 3;

    setResult(`${name}의 총점은 ${sum}, 평균은 ${avg}입니다.`);
  }
  return (
    <div>
      <br />
      이름 : <input type="text" onChange={nameChange} /> <br />
      <br />
      국어 : <input type="text" onChange={korChange} /> <br />
      <br />
      영어 : <input type="text" onChange={engChange} /> <br />
      <br />
      수학 : <input type="text" onChange={mathChange} />
      <br /> <br />
      <button type="button" onClick={resultChange}>
        결과확인
      </button>
      <div>{result}</div>
    </div>
  );
}

export default 과제과제;
