import { DeleteOutlined } from '@ant-design/icons';
import { Button, Modal, message, Result } from 'antd';
import { useState } from 'react';
import { deleteStudent } from '../../redux/actions';
import { useDispatch } from 'react-redux';

const DrawerFormDel = ({ data }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const dispatch = useDispatch();

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        message.loading('Đang xóa...', 0.5).then(() => {
            dispatch(deleteStudent(data));
            message.success('Thông tin đã xóa');
            setIsModalVisible(false);
        });
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <>
            <Button type='danger' icon={<DeleteOutlined />} onClick={showModal}>
                Xóa
            </Button>
            <Modal visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <Result
                    status="info"
                    title={<h3>Xác Nhận Xóa Sinh Viên <b>{data.name}</b></h3>}
                />
            </Modal>
        </>
    )
}

export default DrawerFormDel;