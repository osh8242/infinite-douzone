import CommonConstant from "../../src/model/CommonConstant";
const { genderRadioList } = CommonConstant();
export const SignUpField = [
  {
    component: "TextBoxComponent",
    label: "아이디",
    type: "textbox",
    md: 3,
    stateName: "id",
  },
  {
    component: "TextBoxComponent",
    label: "비밀번호",
    type: "password",
    md: 3,
    placeholder: "영문, 숫자를 포함하여 8자 이상 입력하세요.",
    stateName: "password",
  },
  {
    component: "TextBoxComponent",
    label: "이름",
    type: "textbox",
    md: 3,
    stateName: "name",
  },
  {
    component: "TextBoxComponent",
    label: "Email",
    type: "email",
    md: 3,
    stateName: "email",
  },
  {
    component: "TextBoxComponent",
    label: "생년월일",
    type: "date",
    md: 3,
    stateName: "birthday",
  },
  {
    component: "TextBoxComponent",
    label: "연락처",
    type: "tel",
    md: 3,
    stateName: "phone",
  },
  {
    component: "RadioForm",
    label: "성별",
    md: 3,
    options: genderRadioList,
    stateName: "selectedGender",
  },
  {
    component: "TempAdd",
    label: "주소",
    md: 3,
    stateName: "address",
  },
];
