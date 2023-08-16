// 작성자 : 오승환
import { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

function MenuTab({ menuList }) {
  const [key, setKey] = useState(0);

  return (
    <Tabs
      id="menuTab"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3"
    >
      {menuList.map((menu, index) => (
        <Tab eventKey={index} title={menu} key={index}></Tab>
      ))}
    </Tabs>
  );
}

export default MenuTab;
