import AddressForm from "../components/AddressForm";
import EmpRegisterationModel from "../model/EmpRegisterationModel";
import CommonConstant from "../model/CommonConstant";

function EmpTest() {
  //Model로 관리되는 state들
  const {
    cdEmp,
    setCdEmp,
    leftTableData,
    setLeftTableData,
    mainTableData,
    setMainTableData,
    subTableData,
    setSubTableData,
  } = EmpRegisterationModel();

  //고정된 값을 가지는 state들
  const {
    labels,
    mainTabMenuListForEmpRegister,
    ynForList,
    genderRadioList,
    emailList,
  } = CommonConstant();

  return (
    <>
      {mainTableData && (
        <AddressForm
          isZonecode={true}
          zipHomeData={mainTableData.zipHome ? mainTableData.zipHome : null}
          addHome1Data={mainTableData.addHome1 ? mainTableData.addHome1 : null}
          addHome2Data={mainTableData.addHome2 ? mainTableData.addHome2 : null}
        />
      )}
    </>
  );
}

export default EmpTest;
