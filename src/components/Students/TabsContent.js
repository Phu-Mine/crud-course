import { Tabs, Divider } from 'antd';
import TableSV from './tableStudent';
import { UnorderedListOutlined, UserAddOutlined } from '@ant-design/icons';
import AddStudent from './add';
import { Link, } from 'react-router-dom';

const { TabPane } = Tabs;

export default function TabsContent({ tabSelected }) {
    return (
        <Tabs defaultActiveKey={tabSelected} type="line">
            <TabPane tab={<Link to="/students"><UnorderedListOutlined />Danh sách</Link>} key="1">
                <Divider style={{ margin: 0 }} >
                    <center><h2>Danh Sách Sinh Viên</h2></center>
                </Divider>
                <TableSV />
            </TabPane>
            <TabPane tab={<Link to="/students/addStudent"><UserAddOutlined />Thêm Sinh Viên</Link>} key="2">
                <Divider style={{ margin: 0 }} >
                    <center><h2>Thêm Sinh Viên</h2></center>
                </Divider>
                <AddStudent />
            </TabPane>
        </Tabs>
    )
}