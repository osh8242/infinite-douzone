import { useContext, useEffect, useState, useCallback } from "react";

const CommonModel = () => {
  const [searchData, setSearchData] = useState({});

  useEffect(() => {
    console.log("searchData loading...");
    console.log("MODEL...");
  }, [searchData]);

  return {
    state: {
      searchData,
    },
    actions: {
      setSearchData,
    },
  };
};

export default CommonModel;
