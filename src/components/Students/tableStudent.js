import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Drawer, Form, Button, Input, Select, DatePicker, Space, message, Modal, Result } from 'antd';
import { EditOutlined, DeleteOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { listSpecialized } from './../common/configOfTables';
import moment from 'moment';
const { Option } = Select;

// import { useDispatch } from 'react-redux';
// import { updateStudent } from '../../redux/actions';
// import { useSelector } from "react-redux";
// import DrawerFormDel from './delete';
// import DrawerFormEdit from './edit.js';

const handleLoading = (stateFunc) => {
    setTimeout(() => stateFunc(false), 700);
}

const TableSV = () => {
    const [form] = Form.useForm();

    const [isLoading, setIsLoading] = useState(true);
    const [allStudent, setAllStudent] = useState([]);
    const [cStudent, setCStudent] = useState({});
    const [cStudentCourses, setCStudentCourses] = useState([]);

    const [visible, setVisible] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isChildModalVisible, setIsChildModalVisible] = useState(false);

    useEffect(() => {
        if (visible == false && isModalVisible == false) {
            axios.get("http://localhost:8080/students")
                .then(res => {
                    setAllStudent(res.data);
                })
                .catch(error => console.log(error));
        }

        if (isChildModalVisible == true) {
            axios.get(`http://localhost:8080/students/${cStudent.key}/courses`)
                .then(res => setCStudentCourses(res.data))
        }

    }, [visible, isModalVisible, isChildModalVisible, cStudent.key])

    const columns = [
        {
            title: 'Họ và tên',
            dataIndex: 'name',
            key: 'name',
            render: text => <b>{text}</b>,
            sorter: (a, b) => a.name.toLowerCase() < b.name.toLowerCase(),
            sortDirections: ['descend'],
        },
        {
            title: 'Giới tính',
            dataIndex: 'gender',
            key: 'gender',
            render: text => <b>{text === "male" ? "Nam" : "Nữ"}</b>,
            sorter: (a, b) => a.gender.toLowerCase() < b.gender.toLowerCase(),
            sortDirections: ['descend'],
        },
        {
            title: 'Ngày sinh',
            dataIndex: 'birthday',
            key: 'birthday',
            render: text => <b><i>{text}</i></b>
        },
        {
            title: 'Mã khoa',
            dataIndex: 'specialized',
            key: 'specialized',
            render: text => <b><i>{text}</i></b>,
            sorter: (a, b) => a.specialized.toLowerCase() < b.specialized.toLowerCase(),
            sortDirections: ['descend'],
            filters: [
                {
                    text: 'NDMC',
                    value: 'NDMC',
                },
                {
                    text: 'CNTT',
                    value: 'CNTT',
                },
                {
                    text: 'TTYK',
                    value: 'TTYK',
                },
                {
                    text: 'BKCC',
                    value: 'BKCC',
                },
                {
                    text: 'BDCC',
                    value: 'BDCC',
                },
                {
                    text: 'BFFC',
                    value: 'BFFC',
                },
                {
                    text: 'BXZC',
                    value: 'BXZC',
                },
            ],
            onFilter: (value, record) => record.specialized.indexOf(value) === 0,
        },
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
                            onClick={() => { setVisible(true); setCStudent(record); }}
                        >
                            Sửa
                        </Button>
                        {/* <DrawerFormDel data={record} /> */}
                        <Button
                            type='danger'
                            icon={<DeleteOutlined />}
                            onClick={() => { setIsModalVisible(true); setCStudent(record) }}
                        >
                            Xóa
                        </Button>
                        <Button
                            icon={<UnorderedListOutlined />}
                            onClick={() => { setIsChildModalVisible(true); setCStudent(record) }}
                        >
                            Khoá học
                        </Button>
                    </>
                )
            }
        }
    ];

    const columnsCourse = [
        {
            title: 'Khóa học',
            dataIndex: 'name',
            key: 'name',
            render: text => <b>{text}</b>,
            sorter: (a, b) => a.name.toLowerCase() < b.name.toLowerCase(),
            sortDirections: ['descend'],
        },
        {
            title: 'Giảng viên',
            dataIndex: 'teacherName',
            key: 'teacherName',
            sorter: (a, b) => a.teacherName.toLowerCase() < b.teacherName.toLowerCase(),
            sortDirections: ['descend'],
            render: text => <b>{text}</b>
        },
        {
            title: 'Mã ngành',
            dataIndex: 'specialized',
            key: 'specialized',
            render: text => <b><i>{text}</i></b>,
            sorter: (a, b) => a.specialized.toLowerCase() < b.specialized.toLowerCase(),
            sortDirections: ['descend'],
            filters: [
                {
                    text: 'NDMC',
                    value: 'NDMC',
                },
                {
                    text: 'CNTT',
                    value: 'CNTT',
                },
                {
                    text: 'TTYK',
                    value: 'TTYK',
                },
                {
                    text: 'BKCC',
                    value: 'BKCC',
                },
                {
                    text: 'BDCC',
                    value: 'BDCC',
                },
                {
                    text: 'BFFC',
                    value: 'BFFC',
                },
                {
                    text: 'BXZC',
                    value: 'BXZC',
                },
            ],
            onFilter: (value, record) => record.specialized.indexOf(value) === 0,
        }
    ];

    // --------------------------------------------------------
    form.setFieldsValue({
        username: cStudent.name,
        gender: cStudent.gender,
        birthday: moment(cStudent.birthday + 'T10:00:00', 'DD/MM/YYYY'),
        specialized: cStudent.specialized,
    })

    const onFinish = (values: any) => {
        onSubmitForm();
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const onSubmitForm = () => {
        message.loading('Đang sửa...', 1).then(() => {
            // dispatch(updateStudent(user));

            axios.post(`http://localhost:8080/students`, cStudent)
                .then(res => {
                    message.success('Thông tin đã được cập nhật');
                })
            setVisible(false);
        });
    }

    const onCloseEdit = () => {
        setVisible(false);
        message.info('Thông tin chưa được cập nhật');
    };

    const handleDelete = () => {
        message.loading('Đang xóa...', 0.5).then(() => {
            // dispatch(deleteStudent(data));
            // dispatch(updateCourseAfterRemove(data.key));
            axios.delete(`http://localhost:8080/students/${cStudent.key}`)
                .then(res => {
                    console.log("Đã xoá: ", res);
                    message.success('Đã xoá thành công');
                    setIsModalVisible(false);
                })
        });
    }


    //------------------------------------------------------------

    return (
        <>
            {handleLoading(setIsLoading)}
            {/* {console.log("data selecter: ", useSelector(state => state.students))} */}
            <Table
                bordered={true}
                dataSource={allStudent}
                columns={columns}
                pagination={{ pageSize: 5 }}
                scroll={{ y: 500 }}
                loading={isLoading}
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
                        <Button type="default">
                            Các môn đăng ký
                        </Button>
                    </Space>
                }
            >
                {/* --------------------------------------------------- */}

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
                        label="fullName"
                        name="username"
                        rules={[{ required: true, message: 'Tên sinh viên không được để trống!' }, { max: 50, message: 'Tên dài quá 50 ký tự' }]}
                    >
                        <Input placeholder="Họ và tên" onChange={e => setCStudent({ ...cStudent, name: e.target.value })} />
                    </Form.Item>

                    <Form.Item
                        name="gender"
                        label="Giới tính"
                        rules={[{ required: true, message: 'Hãy chọn giới tính' }]}
                    >
                        <Select allowClear placeholder="Chọn giới tính" onChange={value => setCStudent({ ...cStudent, gender: value })}>
                            <Option value="male">Nam</Option>
                            <Option value="female">Nữ</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name='birthday'
                        label="Ngày sinh nhật"
                        rules={[{ required: true, message: 'Hãy chọn đúng ngày' }]}
                    >
                        <DatePicker
                            placeholder="Chọn ngày sinh"
                            defaultValue={moment(cStudent.birthday + 'T10:00:00', 'DD/MM/YYYY')}
                            value={moment(cStudent.birthday + "T10:00:00", 'DD/MM/YYYY')}
                            format={['DD/MM/YYYY', 'DD/MM/YY']}
                            defaultPickerValue={moment(cStudent.birthday + 'T10:00:00', 'DD/MM/YYYY')}
                            onChange={e => setCStudent({ ...cStudent, birthday: moment(e).format('DD/MM/YYYY') })}
                        />
                    </Form.Item>

                    <Form.Item
                        name="specialized"
                        label="Chuyên ngành"
                        rules={[{ required: true, message: 'Please choose the type' }]}
                    >

                        <Select
                            allowClear
                            placeholder="Chuyên ngành"
                            onChange={value => setCStudent({ ...cStudent, specialized: value })}
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

            {/* Modal delete */}
            <Modal visible={isModalVisible} onOk={handleDelete} onCancel={() => { setIsModalVisible(false) }}>
                <Result
                    status="info"
                    title={<h3>Xác Nhận Xóa Sinh Viên <b>{cStudent.name}</b></h3>}
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
                    dataSource={cStudentCourses}
                    columns={columnsCourse}
                    pagination={{ pageSize: 6 }}
                    scroll={{ y: 400 }}
                />
            </Drawer>
        </>
    )
}

export default TableSV;









