import React from 'react';
import { Accordion } from 'react-bootstrap';
import SiEmpDetail from './SiEmpDetail';
import PayrollLedgerEntry from './PayrollLedgerEntry';

const RigtSideLayout = (props) => {
    const {
        state,
        actions
    } = props;
    return (
        <div>
            <div>
                <Accordion defaultActiveKey="1" flush>
                  <Accordion.Item eventKey="0">
                  <Accordion.Header>임금대장 기재 사항</Accordion.Header>
                    <Accordion.Body> 
                      {/* 임금대장 기재 사항 영역 */}
                        <PayrollLedgerEntry
                          actions={actions}
                          siEmpDetailData = {state.saInfoDetailData}
                        />
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="1">
                  <Accordion.Header>사원 상세정보</Accordion.Header>
                    <Accordion.Body> 
                      {/* 사원 상세정보 영역 */}
                      <SiEmpDetail
                        actions={actions}
                        siEmpDetailData = {state.saInfoDetailData}
                      />
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </div>
        </div>
    );
};

export default RigtSideLayout;