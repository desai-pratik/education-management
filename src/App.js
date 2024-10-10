import { Route, Routes } from "react-router-dom";
import "./App.css";
import Signup from "./components/Signup";
import Login from "./components/Login";
import AuthProvider from "./context/AuthContext";
import AdminDashboard from "./pages/AdminDashboard";
import AddCourse from "./components/AddCourse";
import EditCourse from "./components/EditCourse";
import TeacherDashboard from "./pages/TeacherDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import TeachersCoursesCard from "./components/TeachersCoursesCard";
import TeachersCoursesCardDetails from "./components/TeachersCoursesCardDetails";
import StudentCoursesCard from "./components/StudentCoursesCard";
import StudentCoursesCardDetails from "./components/StudentCoursesCardDetails";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        <Route path="/admin" element={ <AdminDashboard />}>
          <Route path="add-course" element={<AddCourse />} />
          <Route path="edit-course/:id" element={<EditCourse />} />
        </Route>

        <Route path="/teacher" element={<TeacherDashboard />}>
          <Route path="" element={<TeachersCoursesCard />} />
          <Route path="details/:id" element={<TeachersCoursesCardDetails />} />
        </Route>

        <Route path="/student" element={<StudentDashboard />}>
          <Route path="" element={<StudentCoursesCard />} />
          <Route path="details/:id" element={<StudentCoursesCardDetails />} />
        </Route>

        <Route path="/" element={<Login />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
