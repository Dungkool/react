// 백엔드 서버로부터 데이터를 가져온다.
// axios - 설치 필요
import React, {useState, useEffect} from "react";
import axios from "axios";

function HeroList(props) {
  const [heroList, setHeroList] = useState([]);
  const [loading, setLoading] = useState(false); // 데이터를 수신하면 true로 변경
  // useState 함수가 값을 초기화 해주면 해당 값을 저장할 변수와 해당 값을 변경하는 함수를 반환함
  // [] -> 배열을 저장할 변수 반환, 배열 값을 변환할 함수 주소

  // 첫 번째 매개변수 - mount 될 때, update 될 때 호출된다.
  // [] - 변수 : 변수들이 바뀔 때 호출된다.
  useEffect(() => {
    /* console.log("나 호출된다.");
    setHeroList(
      heroList.concat([
        {id: 1, name: "이순신", descr: "임란승리"},
        {id: 2, name: "고주몽", descr: "고구려"},
        {id: 3, name: "대조영", descr: "발해"},
      ])
    ); */

    //Promise 기반 컴포넌트라서 return 불가
    axios
      .get("http://localhost:9090/hero/list")
      .then((res) => {
        console.log("***********");
        console.log(res);
        setHeroList(res.data);
        setLoading(true);
      })
      .catch((res, status, error) => {
        console.log(status);
      });
  }, []);

  return (
    <div>
      <table>
        {loading === true
          ? heroList.map((item) => {
              return (
                <tr>
                  <td>{item.id}</td>
                  <td>{item.hero_name}</td>
                  <td>{item.hero_desc}</td>
                </tr>
              );
            })
          : ""}
      </table>
    </div>
  );
}

export default HeroList;
