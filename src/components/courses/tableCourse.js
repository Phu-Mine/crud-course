import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Table, Result, Modal, message, Button, Drawer, Space, Form, Select, Input, } from "antd";
import { EditOutlined, DeleteOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { indexColumnCourse, indexColumnStudent, listSpecialized } from "../common/configOfTables";
const { Option } = Select;

// import { useSelector } from "react-redux";
// import DrawerFormEdit from './edit.js';
// import DrawerFormDel from './delete';

const TableKH = () => {

    const [visible, setVisible] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isChildModalVisible, setIsChildModalVisible] = useState(false);

    const [allCourse, setAllCourse] = useState([]);
    const [cCourse, setCcourse] = useState({});
    const [cCourseStudents, setCCourseStudents] = useState([]);

    useEffect(() => {
        if (isChildModalVisible == 1) {
        }
        axios.get(`http://localhost:8080/courses/${cCourse.key}/students`)
            .then(res => setCCourseStudents(res.data))

        if (isModalVisible == false && visible == false && isChildModalVisible == false) {
        }
        axios.get("http://localhost:8080/courses")
            .then(res => {
                setAllCourse(res.data);
            })
            .catch(error => console.log(error));
        // window.location.reload();
    }, [isChildModalVisible, isModalVisible, visible])

    //visible, isModalVisible, isChildModalVisible, cCourse.key
    const columns = [
        ...indexColumnCourse,
        {
            title: "Hành động",
            dataIndex: 'action',
            key: 'action',
            render: (text, record) => {
                return (
                    <>
                        {/* <DrawerFormEdit data={record} /> */}
                        <Button
                            type="primary"
                            icon={<EditOutlined />}
                            onClick={() => { setVisible(true); setCcourse(record); }}
                        >
                            Sửa
                        </Button>

                        {/* <DrawerFormDel data={record} /> */}
                        <Button
                            type='danger'
                            icon={<DeleteOutlined />}
                            onClick={() => { setIsModalVisible(true); setCcourse(record) }}
                        >
                            Xóa
                        </Button>
                        <Button
                            type='ghost'
                            icon={<UnorderedListOutlined />}
                            onClick={() => { setIsChildModalVisible(true); setCcourse(record) }}
                        >
                            Sinh viên
                        </Button>
                    </>
                )
            }
        }
    ];

    const columnsStudent = indexColumnStudent;

    const handleDelete = () => {
        message.loading('Đang xóa...', 0.5).then(() => {
            // console.log(cCourse);
            // dispatch(deleteCourse(data));
            axios.delete(`http://localhost:8080/courses/${cCourse.key}`)
                .then(res => {
                    message.success('Đã xoá khoá học');
                    setIsModalVisible(false);
                })
        });
    }

    const onCloseEdit = () => {
        setVisible(false);
        message.info('Thông tin chưa được cập nhật');
    }

    const onSubmitFormEdit = () => {
        message.loading('Đang sửa...', 1).then(() => {
            // dispatch(updateCourse({
            //     key: data.key,
            //     name: courseName,
            //     teacher: teacherName,
            //     specialized: specialized,
            //     submit: true,
            //     listStudent: [],
            // }));
            axios.post('http://localhost:8080/courses', cCourse)
                .then(res => {
                    console.log("Đã cập nhật: ", res);
                    message.success('Thông tin đã được cập nhật');
                    setVisible(false);
                })
        });
    }

    const onFinish = (values: any) => {
        onSubmitFormEdit();
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const [form] = Form.useForm();
    form.setFieldsValue({
        courseName: cCourse.name,
        teacherName: cCourse.teacherName,
        specialized: cCourse.specialized,
    })

    return (
        <>
            <Table
                bordered={true}
                // useSelector(state => state.courses)
                dataSource={allCourse}
                columns={columns}
                pagination={{ pageSize: 6 }}
                scroll={{ y: 600 }}
            />

            {/* edit components */}
            <Drawer
                title="Sửa Thông Tin"
                width={560}
                onClose={onCloseEdit}
                visible={visible}
                bodyStyle={{ paddingBottom: 80 }}
                extra={
                    <Space>
                    </Space>
                }
            >
                {/* ---------------------- */}
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    form={form}
                >
                    <Form.Item
                        label="Tên Khoá Học"
                        name="courseName"
                        rules={[{ required: true, message: 'Tên khoá học không được để trống!' }, { max: 60, message: 'Tên dài quá 60 ký tự' }, { min: 10, message: 'Tên không ngắn quá 10 ký tự' }]}
                    >
                        <Input placeholder="Họ và tên" onChange={e => setCcourse({ ...cCourse, name: e.target.value })} />
                    </Form.Item>
                    <Form.Item
                        label="Tên Giảng Viên"
                        name="teacherName"
                        rules={[{ required: true, message: 'Tên khoá học không được để trống!' }, { max: 50, message: 'Tên dài quá 50 ký tự' }, { min: 10, message: 'Tên không ngắn quá 10 ký tự' }]}
                    >
                        <Input
                            placeholder="Tên Giảng Viên"
                            value={cCourse.teacherName}
                            onChange={e => setCcourse({ ...cCourse, teacherName: e.target.value })}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Chuyên ngành"
                        name="specialized"
                        rules={[{ required: true, message: 'Hãy chọn chuyên ngành của khoá học!' }]}
                    >
                        <Select
                            allowClear
                            placeholder="Chuyên ngành"
                            onChange={value => setCcourse({ ...cCourse, specialized: value })}
                        >
                            {listSpecialized.map(value => {
                                return (
                                    <Option value={value.value}>{value.text}</Option>
                                )
                            })}
                        </Select>
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit" >
                            Cập nhật
                        </Button>
                    </Form.Item>
                </Form>
            </Drawer>

            {/* delete components */}
            <Modal visible={isModalVisible} onOk={handleDelete} onCancel={() => { setIsModalVisible(false) }}>
                <Result
                    status="info"
                    title={<h3>Xác Nhận Xóa Môn Học <b>{cCourse.name}</b></h3>}
                />
            </Modal>

            <Drawer
                visible={isChildModalVisible}
                onClose={() => { setIsChildModalVisible(false) }}
                title="Khoá học đã đăng ký"
                width={"50vw"}
            >
                <Table
                    bordered={true}
                    dataSource={cCourseStudents}
                    columns={columnsStudent}
                    pagination={{ pageSize: 6 }}
                    scroll={{ y: 400 }}
                />
            </Drawer>
        </>
    )
}

export default TableKH;