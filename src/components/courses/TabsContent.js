import { useState } from 'react';
import { Tabs, Divider } from 'antd';
import TableCs from './tableCourse.js';
import { UnorderedListOutlined, AppstoreAddOutlined, AuditOutlined } from '@ant-design/icons';
import AddCourse from './add';
import RegisterCourse from './register';
import { Link } from 'react-router-dom';
const { TabPane } = Tabs;

export default function TabsContent({ tabSelected }) {
    const [tabChange, setTabChange] = useState("")

    return (
        <Tabs defaultActiveKey={tabSelected} type="line" onChange={() => { setTabChange(tabSelected) }}>
            <TabPane tab={<Link to="/courses"><UnorderedListOutlined />Danh Sách</Link>} key="1">
                <Divider style={{ margin: 0 }} ><center><h2>Danh Sách Khóa Học</h2></center> </Divider>
                <TableCs />
            </TabPane>
            <TabPane tab={<Link to="/courses/addCourse"><AppstoreAddOutlined />Thêm Khóa Học</Link>} key="2">
                <Divider style={{ margin: 0 }} ><center><h2>Thêm Khoá Học</h2></center></Divider>
                <AddCourse />
            </TabPane>
            <TabPane tab={<Link to="/courses/manager"><AuditOutlined />Quản Lý Đăng Ký</Link>} key="3">
                <Divider style={{ margin: 0 }} />
                <RegisterCourse />
            </TabPane>
        </Tabs>
    )
}