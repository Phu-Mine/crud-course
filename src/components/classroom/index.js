import { Statistic, Card, Row, Col, Divider } from 'antd';
import { HighlightOutlined, TeamOutlined, IdcardOutlined } from '@ant-design/icons/'
// import { useSelector } from 'react-redux';
import "./style.css"
import { useState, useEffect } from 'react';
import axios from 'axios';
const { Meta } = Card;

const TabCourse = ({ data }) => {
    return (
        <div className='card_item'>
            {/* {console.log(getData)} */}
            <Col style={{ marginBottom: '10px' }}>
                <Card hoverable title={<h2><center>{data.course.name}</center></h2>}>
                    <Row>
                        <Col span={12}>
                            <Statistic prefix={<TeamOutlined />} suffix="Sinh Viên" value={data.countStudents} />
                        </Col>
                        <Col span={12}>
                            <Meta
                                style={{ textAlign: 'right', float: 'right' }}
                                title={<><IdcardOutlined /> {data.course.teacherName}</>}
                                description={<><HighlightOutlined /> {data.course.specialized}</>}
                            />
                        </Col>
                    </Row>
                </Card>
            </Col>
        </div>

    )
}

const Classroom = () => {

    const [Courses, setCourses] = useState([]); // useSelector(state => state.courses)

    useEffect(() => {
        axios.get("http://localhost:8080/Courses/count")
            .then(res => {
                setCourses(res.data);
            })
            .catch(error => console.log(error));
    }, [])

    return (
        <div>
            <Divider style={{ marginTop: '20px' }} ><center><h2>Tổng Quan Lớp Học</h2></center></Divider>
            <Row gutter={12} >
                <div className="card_container">
                    {Courses.map((item) => <TabCourse data={item} key={item.course.key} />)}
                </div>
            </Row>
        </div>
    )
}

export default Classroom;