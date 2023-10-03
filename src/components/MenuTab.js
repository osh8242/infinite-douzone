import { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

function MenuTab(props) {
  const { menuList, onSelect, k, children } = props;
  const [key, setKey] = useState(k);

  const handleSelect = (k) => {
    setKey(k);
    if (onSelect) {
      onSelect(k);
    }
  };

  return (
    <Tabs
      id="menuTab"
      activeKey={key}
      onSelect={onSelect && handleSelect}
      className="mb-3"
    >
      {menuList.map((menu, index) => (
        <Tab eventKey={index} title={menu} key={index}>
          {children?.[index]}
        </Tab>
      ))}
    </Tabs>
  );
}

export default MenuTab;
