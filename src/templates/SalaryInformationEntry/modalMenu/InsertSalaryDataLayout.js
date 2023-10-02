import React, { useState } from "react";
import MenuTab from "../../../components/MenuTab";
import InsertSalaryAllowData from "./InsertSalaryAllowData";
import InsertSalartDeductData from "./InsertSalartDeductData";
import NontaxSetup from "./NontaxSetup";
import StaticSalaryDeductData from "./StaticSalaryDeductData";

const InsertSalaryDataLayout = (props) => {
  const { actions } = props;

  const [selectedTab, setSelectedTab] = useState("1");

  const handleTabChange = (key) => {
    setSelectedTab(key);
  };

  const childComponents = [
    {
      key: "0",
      component: (
        <InsertSalaryAllowData actions={actions} />
      ),
    },
    {
      key: "1",
      component: <StaticSalaryDeductData actions={actions} selectedTab={selectedTab} />,
    },
    {
      key: "2",
      component: (
        <InsertSalartDeductData actions={actions} selectedTab={selectedTab} />
      ),
    },
    {
      key: "3",
      component: <NontaxSetup actions={actions} selectedTab={selectedTab} />,
    },
    
  ];

  return (
    <div>
      <MenuTab
        menuList={["수당등록"," 기본공제항목" ,"공제등록", "비과세감면설정"]}
        onSelect={handleTabChange} 
      >
        {childComponents.map((child) => (
          <div key={child.key}>{child.component}</div>
        ))}
      </MenuTab>
    </div>
  );
};

export default InsertSalaryDataLayout;
