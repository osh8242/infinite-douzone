import React, { useEffect, useState } from "react";
import SelectForm from "../../../components/SelectForm";
import TextBoxComponent from "../../../components/TextBoxComponent";
import { modal_insertSalaryData } from "../../../model/SalaryInformationEntry/SalConstant";
import { fetchData } from "../../../utils/codeHelperUtils";
import { Button } from "react-bootstrap";

const AddSalAllowPay = (props) => {
  const { actions } = props;

  const [searchOptionOption, setSearchOptionOption] = useState([]);
  const [allowPay, setAllowPay] = useState('');
  const [cdAllow, setCdAllow] = useState('');

  useEffect(() => {
    const fetchSearchOption = async () => {
      if (modal_insertSalaryData.url) {
        try {
          const searchOption = await fetchData(
            modal_insertSalaryData.url,
            modal_insertSalaryData.params
          );
          const options = searchOption.map((row) => ({
            key: row.item,
            value: row.item.nmAllow,
          }));
          setSearchOptionOption(options);

          setCdAllow(searchOption[0].item); // 첫번째 cdAllow setting

        } catch (error) {
          console.error("데이터 가져오기 오류:", error);
        }
      }
    };
    fetchSearchOption();
  }, []);

  const onClickHandler = () => {
    actions.setAddSalAllowPayRow({...cdAllow, allowPay: allowPay });
  };

  return (
    <div>
      <SelectForm
        label="급여항목"
        optionList={searchOptionOption}
        onChange={(e, value) => setCdAllow(value)}
      />
      <TextBoxComponent
        label="지급금액"
        id="allowPay"
        onChange={(e, value) => setAllowPay(value)}
      />
      <Button onClick={() => onClickHandler()}>입력</Button>
    </div>
  );
};

export default AddSalAllowPay;
