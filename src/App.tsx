import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingScreen from "./components/common/atoms/LoadingScreen";
import ActivityPage from "./pages/ActivityPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import MemberPage from "./pages/MemberPage";
import MyPage from "./pages/MyPage";
import PendingPage from "./pages/PendingPage";
import RecruitPage from "./pages/RecruitPage";
import SignupPage from "./pages/SignupPage";
import SchedulePage from "./pages/SchedulePage";
import AdminPage from "./pages/AdminPage/AdminPage";
import MemberManagePage from "./pages/AdminPage/MemberManagePage";
import PostManagePage from "./pages/AdminPage/PostManagePage";
import ScheduleManagePage from "./pages/AdminPage/ScheduleManagePage";
import Header from "./components/common/atoms/Header";
import Footer from "./components/common/atoms/Footer";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/activity" element={<ActivityPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/member" element={<MemberPage />} />
          <Route path="/recruit" element={<RecruitPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/pending" element={<PendingPage />} />
          <Route path="/schedule" element={<SchedulePage />} />
          <Route path="/admin" element={<AdminPage />}>
            <Route path="member-manage" element={<MemberManagePage />} />
            <Route path="post-manage" element={<PostManagePage />} />
            <Route path="schedule-manage" element={<ScheduleManagePage />} />
          </Route>
        </Routes>
        <Footer />
      </Router>
      <LoadingScreen />
    </>
  );
}

export default App;
