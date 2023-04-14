import "bootstrap/dist/css/bootstrap.min.css"; // 부트스트랩 라이브러리 (min은 압축 버전이라 빠름)
import {Outlet, Link, NavLink} from "react-router-dom";

function Layout() {
  return (
    /* anchor 말고 NavLink를 사용하자, anchor 쓰면 페이지 전체가 새로고침 된다. */
    <div>
      <nav className="navbar navbar-expand-sm bg-primary navbar-dark">
        <div className="container-fluid">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link active" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/board/list">
                게시판
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/hero/list">
                영웅
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link disabled" href="#">
                Disabled
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>

      {/* {컴포넌트가 출력되는 위치} */}
      <div style={{marginTop: "20px"}}></div>
      <Outlet />
    </div>
  );
}

export default Layout;
