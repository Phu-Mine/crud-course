import { Divider, Tabs } from 'antd';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ClassDetail from './classDetail';

// import { useSelector } from "react-redux";
import { Link, useParams } from 'react-router-dom';

const { TabPane } = Tabs;

const RegisterCourse = () => {
    // const Courses = useSelector(state => state.courses)
    // const Students = useSelector(state => state.students);
    const [Courses, setCourse] = useState([]);
    const [Students, setStudents] = useState([]);

    let { id } = useParams();

    useEffect(() => {
        axios.get("http://localhost:8080/courses")
            .then(res => {
                setCourse(res.data);
            })
        axios.get("http://localhost:8080/students")
            .then(res => {
                setStudents(res.data);
            })
    }, [Students])

    const setTitlePage = (list) => {
        for (var value of list) {
            if (value.key == id) {
                document.title = "ĐK | " + value.name;
            }
        }
    }

    return (
        <Tabs tabPosition="left" type="card" style={{ height: '80vh' }} activeKey={id + ""}>
            {setTitlePage(Courses)}
            {Courses.map(course => (
                <TabPane
                    tab={<Link to={`/courses/manager/${course.key}`}>{course.name}</Link>}
                    key={course.key + ""}
                    style={{ height: '100vh' }}
                >
                    <h2 style={{ textAlign: "center", margin: "20px 0 0 0" }}>Khoá học: {course.name.toUpperCase()}</h2>
                    <h2 style={{ textAlign: "right", margin: "0px 50px" }}>Giảng viên: {course.teacherName}</h2>
                    <Divider />
                    <ClassDetail course={course} listStudent={Students} />
                </TabPane>
            ))}
        </Tabs>
    )
}

export default RegisterCourse;