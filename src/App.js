import { useEffect, useState, useContext } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import "./App.scss";
import EmpRegisterationLayout from "./templates/EmpRegister/EmpRegisterationLayout";
import Header from "./templates/Header";
import HrManagementLayout from "./templates/HrManagement/HrManagementLayout";
import LoginGrid from "./Login/LoginGrid";
import LaborContractLayout from "./templates/LaborContract/LaborContractLayout";
import SalaryInformationEntryLayout from "./templates/SalaryInformationEntry/SalaryInformationEntryLayout";
import MainHome from "./templates/MainHome";
import MyPage from "./templates/myPage";
import { LoginProvider } from "./Login/LoginProvider";
import LoginFindId from "./member/loginFindId";
import LoginFindPwd from "./member/loginFindPwd";
import MainTestPage from "./templates/MainTestPage";
import ErrorPage from "./templates/ErrorPage";
import SuccessSignUp from "./templates/SuccessSignUp";
import { LoadingContext } from "./Loading/LoadingProvider";
import Loading from "./components/Loading";
import SignUpLayout from "./SignUp/SignUpLayout";
import Footer from "./templates/Footer";
import axios from "axios";
import TimeProvider from "./Login/TimeProvider";

function ConditionalHeader() {
  const location = useLocation();

  if (location.pathname === "/login") {
    return <LoginGrid />;
  } else if (location.pathname === "/loginFindId") {
    return <LoginFindId />;
  } else if (location.pathname === "/loginFindPwd") {
    return <LoginFindPwd />;
  } else if (location.pathname === "/signup") {
    return <SignUpLayout />;
  } else if (location.pathname === "/error") {
    return <ErrorPage />;
  } else if (location.pathname === "/successSignup") {
    return <SuccessSignUp />;
  } else {
    return <Header />;
  }
}

function ProtectedRoutesWrapper({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    const publicRoutes = [
      "/",
      "/login",
      "/loginFindId",
      "/loginFindPwd",
      "/signup",
      "/error",
      "/successSignup",
    ];

    // 공인IP 주소 얻기 => 세션 스토리지 저장
    sessionStorage.setItem("clientIp", "0.0.0.0");
    async function fetchIP() {
      try {
        const response = await axios.get(
          `http://52.78.198.96:8888/auth/getClientIp`
        );
        sessionStorage.setItem("clientIp", response.data);
        console.log("접속IP 주소 :", response.data);
      } catch (error) {
        console.error("Error fetching IP address:", error);
      }
    }

    fetchIP();

    if (!authToken && !publicRoutes.includes(location.pathname)) {
      navigate("/login");
    } else {
      setIsChecking(false);
    }
  }, [location, navigate]);

  if (isChecking) return null;

  return children;
}

function App() {
  const { loading } = useContext(LoadingContext);
  return (
    <div>
      <TimeProvider>
        <LoginProvider>
          <BrowserRouter>
            <ConditionalHeader />
            {loading && <Loading />}
            <ProtectedRoutesWrapper>
              <Routes>
                <Route path="/mypageTest" element={<MainTestPage />} />
                <Route path="/" element={<MainHome />} />
                <Route path="/er" element={<EmpRegisterationLayout />} />
                <Route path="/hr" element={<HrManagementLayout />} />
                <Route path="/lc/*" element={<LaborContractLayout />} />
                <Route path="/si" element={<SalaryInformationEntryLayout />} />
                <Route path="/mypage" element={<MyPage />} />
              </Routes>
            </ProtectedRoutesWrapper>
            <Footer />
          </BrowserRouter>
        </LoginProvider>
      </TimeProvider>
    </div>
  );
}

export default App;
