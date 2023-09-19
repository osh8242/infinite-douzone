// get TableData

import axios from "axios";
import { objectToQueryString } from "./StringUtils";
import { url } from "../model/CommonConstant";

export async function fetchData(url, params) {
    try {
      const tableDataList = await apiDataForTable(url, params);
      // console.log(tableDataList);
      return tableDataList;
    } catch (error) {
      console.error("API 호출 중 오류 발생:", error);
    }
  }

  export const apiDataForTable = (urlPattern, params) => {
    
    return axios.get(url + urlPattern + objectToQueryString(params))
      .then((response) => {
        const data = response.data;
        const tableDataList = data.map((object) => {
          const dynamicProperties = { item: {} };
            for (const key in object) {
              dynamicProperties.item[key] = object[key];
            }
          return dynamicProperties;
        });
        return tableDataList;
      })
      .catch((error) => {
        console.error("API 호출 중 오류 발생:", error);
        throw error;
      });
  };

  