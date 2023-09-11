import SearchPanel from "../components/SearchPanel";
import React, { useState, useEffect } from "react";
import { Row, Col, Button, Container } from "react-bootstrap";
import imgLogo from "../../src/styles/img/wehago_logo.png";
import TextBoxComponent from "../../src/components/TextBoxComponent";
import CommonConstant from "../../src/model/CommonConstant";
import RadioForm from "../../src/components/RadioForm";
import TempAdd from "../../src/components/TempAdd";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import { Scrollbars } from "react-custom-scrollbars";
import DateTest from "../../src/components/DateTest";
import MenuTab from "../../src/components/MenuTab";
import { LaborContractField } from "./LaborContractField";
import SelectForm from "../../src/components/SelectForm";
import SwsmAddress from "../../src/components/SwsmAddress";
import SwsmText from "../../src/components/SwsmText";
import TableForm from "../../src/components/TableForm";
import TempSelect from "../../src/components/TempSelect";
import LaborContractModel from "../../src/model/LaborContractModel";
import Swsm from "../../src/vo/SwsmGrid/Swsm";
import SwsmOther from "../../src/vo/SwsmGrid/SwsmOther";
import SwsmConstant from "../../src/model/SwsmConstant";

function GridHeader() {
  const [formState, setFormState] = useState({});
  const handleInputChange = (stateName, value) => {
    setFormState((prevState) => ({ ...prevState, [stateName]: value }));
  };

  const renderComponent = (field) => {
    switch (field.component) {
      case "TextBoxComponent":
        return (
          <TextBoxComponent
            type={field.type}
            label={field.label}
            md={field.md}
            value={formState[field.stateName] || ""}
            onChange={(e) => handleInputChange(field.stateName, e.target.value)}
          />
        );
      case "RadioForm":
        return (
          <RadioForm
            label={field.label}
            optionList={field.options}
            md={field.md}
            selectedOption={formState[field.stateName] || ""}
            onSelectOption={(option) =>
              handleInputChange(field.stateName, option)
            }
          />
        );
      case "TempAdd":
        return (
          <TempAdd
            label={field.label}
            md={field.md}
            value={formState[field.stateName] || ""}
            onChange={(e) => handleInputChange(field.stateName, e.target.value)}
          />
        );
      case "DateTest":
        return (
          <DateTest
            label={field.label}
            type={field.type}
            labelKey={field.labelKey}
          />
        );
      case "SelectForm":
        return <SelectForm label={field.label} optionList={field.optionList} />;
      default:
        return null;
    }
  };
  return (
    <>
      <SearchPanel>
        {LaborContractField.map((field, idx) => (
          <Row key={idx}>
            <Col md="4">{renderComponent(field)}</Col>
          </Row>
        ))}
      </SearchPanel>
    </>
  );
}

export default GridHeader;
