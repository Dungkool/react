import React, {useState} from "react";

function Fortest1(props) {
  const [fruitList] = useState(["사과", "배", "포도", "수박", "머루"]);

  const goSelect = (index) => {
    alert(fruitList[index]);
  };

  return (
    <div>
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

export default Fortest1;
