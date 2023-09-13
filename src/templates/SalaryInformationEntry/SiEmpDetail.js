import React from "react";
import { Card, Container } from "react-bootstrap";
import TextBoxComponent from "../../components/TextBoxComponent";
import { labels } from "../../model/CommonConstant";
import "../../styles/SalaryInformationEntry/SalaryInformationEntryLayout.scss";
// 사원 상세정보 영역 

const SiEmpDetail = (props) => {
  const { state} = props;

  return (
    <div className="siEmpDetail-container">
      <Container className="siEmpDetail-container">
        <Card style={{ fontSize: "8px" }}>
          <Card.Header as="h5">사원정보</Card.Header>
          <Card.Body>
            <>
              <TextBoxComponent
                label={labels.daEnter}
                value={state.saInfoDetailData.daEnter}
              />
              <TextBoxComponent
                label="배우자공제"
                value={state.saInfoDetailData.ynMateDed}
              />
              <TextBoxComponent
                label="20세/60세/다자녀"
                value={
                  state.saInfoDetailData.num20Family +
                  "/" +
                  state.saInfoDetailData.num60Family +
                  "/" +
                  state.saInfoDetailData.numManyFamily
                }
              />
              <TextBoxComponent label="조정율" value="구현중" />
              <TextBoxComponent
                label="거주구분"
                value={state.saInfoDetailData.ynResident}
              />
              <TextBoxComponent
                label="생산/국외"
                value={
                  state.saInfoDetailData.ynUnit +
                  "/" +
                  state.saInfoDetailData.ynForLabor
                }
              />
              <TextBoxComponent
                label="연장근로비과세"
                value={state.saInfoDetailData.ynOverwork}
              />
              <TextBoxComponent
                label="퇴사일"
                value={state.saInfoDetailData.daRetire}
              />
              <TextBoxComponent
                label={labels.cdOccup}
                value={state.saInfoDetailData.cdOccup}
              />
              <TextBoxComponent
                label={labels.cdDept}
                value={state.saInfoDetailData.cdDept}
              />
              <TextBoxComponent
                label={labels.cdField}
                value={state.saInfoDetailData.cdField}
              />
              <TextBoxComponent
                label={labels.cdProject}
                value={state.saInfoDetailData.cdProject}
              />
              <TextBoxComponent
                label="주민(외국인)번호"
                value={state.saInfoDetailData.noSocial}
              />
            </>
          </Card.Body>
        </Card>
        </Container>
    </div>
  );
};

export default SiEmpDetail;
