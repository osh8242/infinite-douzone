// get TableData


import { objectToQueryString } from "./StringUtils";
import { url } from "../model/CommonConstant";
import { useApi } from "../model/Api";

const fetchData = async (api, urlPattern, params) => {
  try {
    const response = await api.get(url + urlPattern + objectToQueryString(params));
    const data = response.data;
    const tableDataList = data.map((object) => {
      const dynamicProperties = { item: {} };
      for (const key in object) {
        dynamicProperties.item[key] = object[key];
      }
      return dynamicProperties;
    });
    return tableDataList;
  } catch (error) {
    console.error("API 호출 중 오류 발생:", error);
    throw error;
  }
};

export default fetchData;

  