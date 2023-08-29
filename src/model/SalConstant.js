const SalConstant = () => {
 return {
    tableHeader : {
        salEmp : [
            { field: "cdEmp", text: "사원번호", isPk:true },
            { field: "nmEmp", text: "사원이름" },
            { field: "rankNo", text: "직급" },
            { field: "mnReduction", text: "감면율" },
        ],
        salAllow : [
            { field: "nmAllow", text: "급여항목" , readOnly : true},
            { field: "allowPay", text: "지급금액" },
        ],
        salDeduct : [
            { field: "nmDeduct", text: "공제항목" },
            { field: "allowPay", text: "지급금액" },
        ],
        salAllowSum : [
            { field: "nmAllow", text: "항목" },
            { field: "ynTax", text: "TX" },
            { field: "sumAllowPay", text: "금액" },
        ],
        salDeductSum : [
            { field: "nmDeduct", text: "공제항목" },
            { field: "sumDeductPay", text: "지급금액" },
        ]
    },
    selectOption : {
        salOptionList : [       //구분 옵션
            { key: "sal"      , value: "1.급여" },
            { key: "sal+bonus", value: "2.급여+상여" },
            { key: "bonus"    , value: "3.상여" },
            { key: "plusSal"  , value: "5.추급" },
            { key: "plusBonus", value: "6.추상" },
        ],
        salOptionByPeriodList : [//조회구분 검색조건 옵션
            { key: "EmpAllThisMonth", value: "0.전체사원 당월" },
            { key: "EmpOneThisMonth", value: "1.현재사원 당월" },
            { key: "EmpAllCurrent",  value: "2.전체사원 현재" },
            { key: "EmpOneCurrent",   value: "3.현재사원 현재" },
            { key: "EmpAllThisMonth", value: "4.전체사원 연간" },
            { key: "EmpOneThisYear",  value: "5.현재사원 연간" },
        ],
        unitOption : [//생산직 여부 검색조건 옵션
            { key: "y", value: "생산직" },
            { key: "n", value: "비생산직" },
        ],
        forLaborOption : [//국외 근로여부 검색조건 옵션
            { key: "y", value: "국외근로" },
            { key: "n", value: "국내근로" },
        ],
    },
    codeHelperparams : {
        cdEmp : {
            title : '사원번호 조회',
            tableHeaders: [{ field: "cdEmp", text: "사원번호"}],
            tableData : [{pk:'Y701',name : '현소현'}, {pk:'Y702',name : '오승환'}, {pk:'Y703',name : '김진'}]
        },
        deptCd : {
            

        },
        rankNo : {

        },
        cdOccup : {

        },
        cdField : {

        },
        cdProject : {

        },

    },
    nodata : {
        // basicDeductData : [// nodata 사원별 공제항목
        //     {공제항목: "국민연금",  금액: ""},
        //     {공제항목: "건강보험",  금액: ""},
        //     {공제항목: "고용보험",  금액: ""},
        //     {공제항목: "장기요양보험료",  금액: ""},
        //     {공제항목: "대출",  금액: ""}
        // ],
        // basicSaEmpData : [// nodata 급여_사원리스트
        //     { 사원코드 : "", 사원이름 : "", 직급 : "", 감면율 : ""},
        // ],
        // basicSalData : [// nodata 급여항목
        //     { 공제항목 : "기본급", 지급금액 : ""},
        //     { 공제항목 : "연장근로", 지급금액 : ""},s
        //     { 공제항목 : "식대", 지급금액 : ""},
        //     { 공제항목 : "연구개발비", 지급금액 : ""}
        // ],
        
    },
}
    
};
export default SalConstant;