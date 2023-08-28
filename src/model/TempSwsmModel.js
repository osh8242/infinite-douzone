import { useEffect, useState } from "react";
import axios from "../../node_modules/axios/index";
import Swsm from "../vo/SwsmGrid/Swsm";
import SwsmConstant from "../model/SwsmConstant";

const TempSwsmModel = () => {
  const url = "http://localhost:8888";
  const { labels } = SwsmConstant();
  const [mainTablePkValue, setMainTablePkValue] = useState(); // cdEmp
  const [cdEmp, setCdEmp] = useState("hong");
  const [editedEmp, setEditedEmp] = useState();
  const [leftTableData, setLeftTableData] = useState([]);
  const [rightTabData, setRightTabData] = useState([]);
  const [mainTabData, setMainTabData] = useState({});
  const [subTabData, setSubTabData] = useState({});
  const [subTableData, setSubTableData] = useState([]);

  // leftTableData load
  useEffect(() => {
    setLeftTableData([]);
    axios
      .get(url + "/emp/getAll")
      .then((response) => {
        console.log("SwsmModel > /emp/getAll", response);
        const data = response.data.map((item) => {
          // console.log(item);
          const swsmData = {
            cdEmp: item.cdEmp,
            nmKrname: item.nmKrname,
            noSocial: item.noSocial,
          };
          // console.log("swsmData" + swsmData.cdEmp);
          return Swsm(swsmData);
        });
        setLeftTableData(data);
      })
      .catch((error) => {
        console.log("ERROR : " + error);
      });
  }, []);

  // 메인 데이터 // PK; cdEmp 에 따라
  useEffect(() => {
    setMainTabData({});
    if (mainTablePkValue)
      axios
        .post(url + "/swsm/getSwsmByCdEmp", mainTablePkValue, {
          "Content-Type": "application/json",
        })
        .then((response) => {
          console.log("pk");
          console.log(mainTablePkValue);
          console.log("response : ");
          console.log(response);
          let data = response.data;
          if (response.data === "") data = {};
          setMainTabData(data);
          console.log("mainTabData: ");
          console.log(mainTabData[0].item);
        })
        .catch((error) => {
          console.error("에러발생: ", error);
        });
  }, [mainTablePkValue]);

  // 처음 로드시 가져오고 이씀
  useEffect(() => {
    setMainTabData([]);
    axios
      .get(url + "/swsm/getAllSwsm")
      .then((response) => {
        console.log("SwsmModel > /swsm/getAllSwsm", response);
        const data = response.data.map((item) => {
          // console.log(item);
          const swsmData = {
            cdEmp: item.cdEmp,
            nmKrname: item.nmKrname,
            residentState: item.residentState,
            noSocial: item.noSocial,
            startEmpContractPeriod: item.startEmpContractPeriod,
            endEmpContractPeriod: item.endEmpContractPeriod,
            address: item.address,
            addDetail: item.addDetail,
          };
          // console.log("swsmData" + swsmData.cdEmp);
          return Swsm(swsmData);
        });
        setMainTabData(data);
      })
      .catch((error) => {
        console.log("ERROR : " + error);
      });
  }, []);

  // left 클릭시마다 데이터 로드됨
  useEffect(() => {
    setSubTableData([]);
    if (mainTablePkValue)
      axios
        .get(url + "/swsmOther/getAllSwsmOther ")
        .then((response) => {
          console.log("pk");
          console.log(mainTablePkValue);
          console.log("SwsmOther > /swsmOther/getAllSwsmOther", response.data);
          console.log(typeof response.data);
          const data = response.data.map((item) => {
            return {
              item: {
                otherType: item.othertype,
                otherMoney: item.otherMoney,
                cd_emp: item.cdEmp,
              },
              checked: false,
              selected: false,
              isEditable: false,
            };
          });
          setSubTableData(data);
        })
        .catch((error) => {
          console.error("에러발생: ", error);
        });
  }, [mainTablePkValue]);

  // subTableData
  // useEffect(() => {
  //   setSubTableData([]);
  //   if (mainTablePkValue)
  //     axios
  //       .post(url + "/swsmOther/getSwsmOtherListByCdEmp ", mainTablePkValue)
  //       .then((response) => {
  //         console.log(
  //           "SwsmOther > /empFam/getEmpFamListByCdEmp",
  //           response.data
  //         );
  //         console.log(typeof response.data);
  //         const data = response.data.map((item) => {
  //           return {
  //             item: {
  //               otherType: item.othertype,
  //               otherMoney: item.otherMoney,
  //               cd_emp: item.cdEmp,
  //             },
  //             checked: false,
  //             selected: false,
  //             isEditable: false,
  //           };
  //         });
  //         setSubTableData(data);
  //       })
  //       .catch((error) => {
  //         console.error("에러발생: ", error);
  //       });
  // }, [mainTablePkValue]);

  //  mainTabData
  // useEffect(() => {
  //   console.log("get Main Test=======");
  //   setMainTabData({});
  //   if (mainTablePkValue)
  //     axios
  //       .post(url + "/swsm/getSwsmByCdEmp", mainTablePkValue, {
  //         "Content-Type": "application/json",
  //       })
  //       .then((response) => {
  //         let data = response.data;
  //         if (response.data === "") data = {};
  //         console.log("getSwsmByCdEmp");
  //         console.log(response.data);
  //         setMainTabData(response.data);
  //       })
  //       .catch((error) => {
  //         console.log("ERROR -> swsm/getSwsmByCdEmp : " + error);
  //       });
  //   else console.log("no data");
  // }, [mainTablePkValue]);

  //   axios
  //     .get(url + "/emp/getAll")
  //     .then((response) => {
  //       console.log("SwsmModel > /emp/getAllEmp", response.data);
  //       const data = response.data.map((item) => ({
  //         item: {
  //           cdEmp: item.cdEmp,
  //           nmKrname: item.nmKrname,
  //           noSocial: item.noSocial,
  //         },
  //         isEditable: false,
  //         isChecked: false,
  //         selected: false,
  //       }));
  //       setLeftTableData(data);
  //     })
  //     .catch((error) => {
  //       console.error("에러 : ", error);
  //     });
  // }, []);

  // useEffect(() => {
  //   setMainTabData({});
  //   axios
  //     .get(url + "/swsm/getSwsmByCdEmp")
  //     .then((response) => {
  //       console.log("SwsmModel -> /swsm/getSwsmByCdEmp", response);

  //       // let data = response.data;
  //       // if (response.data === "") data = {};
  //       // setMainTabData(data);
  //     })
  //     .catch((error) => {
  //       console.log("ERROR - getByCdEmp: " + error);
  //     });
  // }, []);

  return {
    leftTableData: leftTableData,
    mainTablePk: mainTablePkValue,
    cdEmp: cdEmp,
    mainTabData: mainTabData,
    rightTabData: rightTabData,
    subTabData: subTabData,
    actions: {
      setMainTablePkValue,
      setLeftTableData,
      setRightTabData,
      setMainTabData,
      setSubTabData,
      setCdEmp,
      setEditedEmp,
    },
  };
};
export default TempSwsmModel;
