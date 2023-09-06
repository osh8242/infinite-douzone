import { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

function MenuTab(props) {
  const { menuList, onSelect, k } = props;
  const [key, setKey] = useState(k);

  const handleSelect = (k) => {
    setKey(k);
    onSelect(k);
  };

  return (
    <Tabs id="menuTab" activeKey={key} onSelect={handleSelect} className="mb-3">
      {menuList.map((menu, index) => (
        <Tab eventKey={index} title={menu} key={index}></Tab>
      ))}
    </Tabs>
  );
}

export default MenuTab;
