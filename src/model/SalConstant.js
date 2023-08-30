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
        salOptionList : [ //구분 옵션
            { key: "SAL"        , value: "1.급여" },
            { key: ""           , value: "2.급여+상여" },
            { key: "BONUS"      , value: "3.상여" },
            { key: "EXTRASAL"   , value: "5.추급" },
            { key: "EXTRABONUS" , value: "6.추상" },
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
            tableHeaders: [
                { field: "cdEmp", text: "사원번호"},
                { field: "nmEmp", text: "사원이름"}],
            tableData : [
                { pk:'Y701', name : '현소현'}, 
                { pk:'Y702', name : '오승환'}, 
                { pk:'Y703', name : '김진'}]
            },
        cdDept : {
            title : '부서코드 조회',
            tableHeaders: [
                { field: "cdDept", text: "부서코드"},
                { field: "nmDept", text: "부서이름"},
                { field: "fDept", text: "부서이름2"}],
            tableData : [
                { pk:'D001', nmDept : '인사팀' , fDept : 'd'}, 
                { pk:'D002', nmDept : '경영지원팀' , fDept : 'd'}, 
                { pk:'D003', nmDept : '개발팀', fDept : 'd'}],
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
    cdDeduct : {
        NATIONAL_PENSION: 'DEDUCT_NATION',//국민연금
        HEALTH_INSURANCE: '502',//건강보험
        EMPLOYMENT_INSURANCE: '503'// 고용보험
    },
    cdAllow : {
        BASIC_SALARY : '503', //기본급
        OVERTIME_PAY : '599', //연장수당
        RND_EXPENSES : '523',//연구개발비
        EMPLOYEE_BENEFITS : '511',//복리후생비 
        MEALS : '597', //식대
        BONUS : '505' //상여금
    },
}
    
};
export default SalConstant;

//국민연금 계산식
export const calculationNationalPension = (value) => {
    return Number(value) + 1;
 }

 //건강보험 계산식
 export const calculationHealthinsurance = (value) => {
    return Number(value) + 100;
 }

//고용보험 계산식
export const calculationEmploymentInsurance = (value) => {
    return Number(value) + 1000;
 }
