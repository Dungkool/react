import React, {useState} from "react";

function Fortest2(props) {
  const [fruitList, setFruitList] = useState([
    "사과",
    "배",
    "포도",
    "수박",
    "머루",
  ]);
  const [fruit, setFruit] = useState("");

  // input 태그에서 값 입력하면 fruit 변수에 값을 저장한다.
  const onChange = (e) => {
    setFruit(e.target.value);
  };

  // 추가 버튼을 누르면, fruit 변수의 값을 fruitlist에 추가한다.
  const goAppend = () => {
    // 배열의 push 함수 사용 못함, 원래 배열에 데이터 추가
    // 배열 자체를 새로 만들어 바꿔치기를 해야 한다.
    // push - 원래 배열 메모리에 추가
    // concat - 새로운 배열을 만들어서 기존 배열 내용을 복사하고 한 개 추가
    setFruitList(fruitList.concat(fruit));
    setFruit(""); // input 태그 공백 채우기
  };

  const goSelect = (index) => {
    alert(fruitList[index]);
  };

  return (
    <div>
      <input type="text" onChange={onChange} value={fruit} />
      <button type="button" onClick={goAppend}>
        추가하기
      </button>
      <br />
      <ul>
        {fruitList.map((item, index) => {
          return (
            <li key={index}>
              <a href="#none" onClick={() => goSelect(index)}>
                {item}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Fortest2;
