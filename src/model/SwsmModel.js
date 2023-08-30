import { useEffect, useState } from "react";
import axios from "../../node_modules/axios/index";
import Swsm from "../vo/SwsmGrid/Swsm";
import SwsmOther from "../vo/SwsmGrid/SwsmOther";
import SwsmConstant from "../model/SwsmConstant";

const SwsmModel = () => {
  const url = "http://localhost:8888";
  const { labels } = SwsmConstant();
  const [mainTablePkValue, setMainTablePkValue] = useState(); // cdEmp
  const [currMenuTab, setCurrMenuTab] = useState(); // 계약서 작성 / 조회 탭 상태 값
  const [cdEmp, setCdEmp] = useState("hong");
  const [editedEmp, setEditedEmp] = useState();
  const [leftTableData, setLeftTableData] = useState([]);
  const [subTableData, setSubTableData] = useState([]);
  const [rightTabData, setRightTabData] = useState([]);
  const [mainTabData, setMainTabData] = useState({});
  const [subTabData, setSubTabData] = useState({});

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
          // console.log("pk");
          // console.log(mainTablePkValue);
          // console.log("response : ");
          // console.log(response);
          let data = response.data;
          if (response.data === "") data = {};
          setMainTabData(data);
          // console.log("mainTabData: ");
          // console.log(mainTabData[0].item);
        })
        .catch((error) => {
          console.error("에러발생: ", error);
        });
  }, [mainTablePkValue]);

  // // left 클릭시마다 데이터 로드됨
  // swsmOther
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
                seqVal: item.seqVal,
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
  }, []);

  return {
    leftTableData: leftTableData,
    subTableData: subTableData,
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
      setCurrMenuTab,
    },
  };
};
export default SwsmModel;
