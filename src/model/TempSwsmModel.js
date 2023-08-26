import { useEffect, useState } from "react";
import axios from "../../node_modules/axios/index";
import Swsm from "../vo/SwsmGrid/Swsm";
import SwsmConstant from "../model/SwsmConstant";

const TempSwsmModel = () => {
  const url = "http://localhost:8888";
  const { labels } = SwsmConstant();
  const { cdEmp, setCdEmp } = useState("hong");
  const { leftTableData, setLeftTableData } = useState({});
  const { mainTabData, setMainTabData } = useState({});
  const { subTabData, setSubTabData } = useState({});

  useEffect(() => {
    setLeftTableData();

    axios
      .get(url + "/emp/getAll")
      .then((response) => {
        console.log("SwsmModel > /emp/getAll", response);
        const data = response.data.map((item) => {
          const swsmData = {
            [labels.empCode]: item.cdEmp,
            [labels.name]: item.name,
            [labels.rrn]: item.rrn,
          };
          return Swsm(swsmData);
        });
        setLeftTableData(data);
      })
      .catch((error) => {
        console.log("ERROR : " + error);
      });
  });

  return {
    leftTableData: leftTableData,
    cdEmp: cdEmp,
    mainTabData: mainTabData,
    subTabData: subTabData,
    actions: {
      setLeftTableData,
      setMainTabData,
      setSubTabData,
      setCdEmp,
    },
  };
};
export default TempSwsmModel;
