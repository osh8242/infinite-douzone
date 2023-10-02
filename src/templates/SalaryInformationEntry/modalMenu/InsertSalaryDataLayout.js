import React  from "react";
import MenuTab from "../../../components/MenuTab";
import InsertSalaryAllowData from "./InsertSalaryAllowData";
import InsertSalartDeductData from "./InsertSalartDeductData";
import NontaxSetup from "./NontaxSetup";

const InsertSalaryDataLayout = (props) => {
  const { actions } = props;

  return (
    <div>
      <MenuTab
        menuList={["수당등록", "공제등록", "비과세감면설정"]}
      >
        {[
          <InsertSalaryAllowData actions={actions} />,
          <InsertSalartDeductData actions={actions} />,
          <NontaxSetup actions={actions}/>
        ]}
      </MenuTab>
    </div>
  );
};

export default InsertSalaryDataLayout;
