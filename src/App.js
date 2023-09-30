import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import EmpRegisterationLayout from "./templates/EmpRegister/EmpRegisterationLayout";
import Header from "./templates/Header";
import HrManagementLayout from "./templates/HrManagement/HrManagementLayout";
import LoginGrid from "./Login/LoginGrid";
import LaborContractGrid from "./templates/LaborContract/LaborContractLayout";
import SalaryInformationEntryLayout from "./templates/SalaryInformationEntry/SalaryInformationEntryLayout";
import SignUp from "./SignUp/SignUp";
import MainHome from "./templates/MainHome";
import MyPage from "./templates/myPage";
import { LoadingContext } from "./Loading/LoadingProvider";
import { useContext } from "react";
import Loading from "./components/Loading";

function App() {
  const { loading } = useContext(LoadingContext);

  return (
    <div>
      <BrowserRouter>
        <Header />
        {loading && <Loading />} {/* 로딩 상태에 따라 로딩 화면을 조건부로 렌더링 */}
        <Routes>
          <Route path="/" element={<MainHome />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/er" element={<EmpRegisterationLayout />} />
          <Route path="/hr" element={<HrManagementLayout />} />
          <Route path="/lc/*" element={<LaborContractGrid />} />
          <Route path="/si" element={<SalaryInformationEntryLayout />} />
          <Route path="/login" element={<LoginGrid />} />
          <Route path="/mypage" element={<MyPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
