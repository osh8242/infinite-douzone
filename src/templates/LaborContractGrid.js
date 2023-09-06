import { Route, Router, browserHistory, IndexRoute } from "react-router";
import { useContext, useEffect, useState, useHistory } from "react";
import LaborContractSearch from "./LaborContractSearch";
import LaborContract from "./LaborContract";
import LaborContractHeader from "./LaborContractHeader";
import { Container } from "react-bootstrap";
import LaborContractModel from "../model/LaborContractModel";
import SwsmConstant from "../model/SwsmConstant";
import MenuTab from "../components/MenuTab";

function LaborContractGrid() {
  const { state, actions } = LaborContractModel();
  const [selected, setSelected] = useState({});
  const {
    mainTabMenuList, // 전체 구분 목록
  } = SwsmConstant();

  const [tab, setTabl] =
    (useState < "LaborContractSearch") |
    ("LaborContract" > "LaborContractSearch");

  let history = useHistory();

  const handleSearchMenu = () => {
    setSelected(!selected);
    history.push("/search");
  };

  const handleEditMenu = () => {
    setSelected(!selected);
    history.push("/edit");
  };
  const handlerMainTab = (e) => {
    // 탭에 따라 다른 경로로 이동
    switch (e.target.value) {
      case "LaborContract":
        history.push("/edit");
        break;
      case "LaborContractSearch":
        history.push("/search");
        break;
      default:
        break;
    }
  };
  return (
    <>
      <LaborContractHeader deleteButtonHandler={actions.deleteSelectedRows} />
      <Container fluid>
        <MenuTab menuList={mainTabMenuList} onChange={handlerMainTab} />
        <Router history={browserHistory}>
          <IndexRoute
            component={LaborContractSearch}
            onChange={handleSearchMenu}
          />
          <Route path="LaborContract" component={LaborContract} />
        </Router>
      </Container>
    </>
  );
}

export default LaborContractGrid();
