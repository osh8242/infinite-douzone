import React from 'react';
import { Accordion } from 'react-bootstrap';
import SiEmpDetail from './SiEmpDetail';

const RigtSideLayout = (props) => {
    const {
        state,
        actions
    } = props;
    return (
        <div>
            <div>
                <Accordion activeKey="0" flush>               
                  <Accordion.Item eventKey="0">
                  <Accordion.Header>사원 상세정보</Accordion.Header>
                    <Accordion.Body style={{height: '80vh'}}>  
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