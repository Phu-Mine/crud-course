import { Avatar, Result, message, Tooltip, Modal, } from 'antd';
import { RobotOutlined } from '@ant-design/icons';
import "./UserOptionStyle.css";
import { useState } from 'react';

export default function UserOptions() {

    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleLogout = () => {
        localStorage.clear();
        message.info("Đã đăng xuất");
        setTimeout(() => {
            window.location.href = "/login";
        }, 500)
    }

    return (
        <div className="UserOption">
            <Tooltip title="Nhấn để đăng xuất" placement="bottomRight">
                <b>Admin</b>
                <Avatar
                    size={45}
                    style={{
                        backgroundColor: "#888",
                        verticalAlign: 'middle',
                    }}
                    onClick={() => { setIsModalVisible(true) }}
                >
                    <RobotOutlined style={{ color: '#002562' }} />
                </Avatar>
            </Tooltip>
            <div>
                <Modal
                    title={<center>Đăng xuất</center>}
                    visible={isModalVisible}
                    onOk={handleLogout}
                    onCancel={() => { setIsModalVisible(false) }}
                    bodyStyle={{ height: "50px" }}
                >
                    <center>
                        <h3>Bạn có muốn đăng xuất</h3>
                    </center>
                </Modal>
            </div>
        </div>
    )
};
