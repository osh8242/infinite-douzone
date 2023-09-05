import { Route, Router, browserHistory, IndexRoute } from "react-router";
import { useContext, useEffect, useState, useHistory } from "react";
import LaborContractSearch from "./LaborContractSearch";
import LaborContract from "./LaborContract";
import LaborContractHeader from "./LaborContractHeader";
import { Container } from "react-bootstrap";
import LaborContractModel from "../model/LaborContractModel";

function LaborContractGrid() {
  const { state, actions } = LaborContractModel();
  const [selected, setSelected] = useState({});

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
  return (
    <>
      <LaborContractHeader deleteButtonHandler={actions.deleteSelectedRows} />
      <Container fluid>
        {/* <Router history={browserHistory}>
        <IndexRoute component={LaborContractSearch} onChange={handleSearchMenu} />
        <Route path="about" component={LaborContract}  />
      </Router> */}
      </Container>
    </>
  );
}

export default LaborContractGrid();
