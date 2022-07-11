import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './components/classroom/dashboardRoute';
import CourseRoute from './components/courses/CourseRoute';
import StudentRoute from './components/Students/StudentsRoute.js'
import LoginForm from './components/Login/Login';
import NotFoundPage from './components/common/NotFound';

function App() {
    return (
        <BrowserRouter forceRefresh={true}>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="dashboard" element={<Dashboard />} />

                <Route path="students" element={<StudentRoute />} />
                <Route path="/students/addStudent" element={<StudentRoute pathOder="add" />} />

                <Route path="courses" element={<CourseRoute />} />
                <Route path="courses/addCourse" element={<CourseRoute pathOder="add" />} />
                <Route path="courses/manager/" element={<CourseRoute pathOder="manager" />}>
                    <Route path=":id" element={<CourseRoute pathOder="manager" />} />
                </Route>

                <Route path="login/" element={<LoginForm />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
