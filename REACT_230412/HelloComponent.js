import React, {Component} from "react";

class HelloComponent extends Component {
  sayHello() {
    alert("***");
  }
  render() {
    return (
      <div>
        <h1>함수 호출하기</h1>
        <button type="button" onClick={this.sayHello}>
          누르기
        </button>
        <HelloComponent />
      </div>
    );
  }
}

export default HelloComponent;
