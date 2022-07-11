import React, { useState } from 'react';
import { Form, Button, Row, Input, Select, DatePicker, message, Card, Tooltip } from 'antd';
import moment from 'moment';
// import { useDispatch } from 'react-redux';
// import { addStudent } from '../../redux/actions';
import axios from 'axios';
import { listSpecialized } from '../common/configOfTables';

const { Option } = Select;


const AddStudent = () => {

    // const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [gender, setGender] = useState('male');
    const [birthday, setBirthday] = useState('12/12/2022T10:00:00');
    const [specialized, setSpecialized] = useState('CNTT');

    const handleAddStudent = () => {
        message.loading('Đang thêm...', 1)
            .then(() => {
                var newUser = {
                    key: 0,
                    name: name,
                    gender: gender,
                    birthday: birthday,
                    specialized: specialized,
                }
                // dispatch(addStudent(newUser));
                axios.put('http://localhost:8080/students', { ...newUser })
                    .then(response => {
                        console.log("Sinh viên mới: ", response);
                        message.success('Đã thêm thành công');
                    })
                    .catch(error => {
                        message.error("Thêm thất bại", error);
                    });
            });
        handleReset();
    }

    const handleReset = () => {
        setBirthday('1/1/2000');
        setGender('male');
        setName('');
        setSpecialized('CNTT');
    }

    const onFinish = (values: any) => {
        handleAddStudent();
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const [form] = Form.useForm();
    form.setFieldsValue({
        username: name,
        gender: gender,
        // birthday: birthday,
        specialized: specialized,
    })

    return (
        <div>
            <Row gutter={16}>
                <Card style={{ margin: '0 auto', width: '500px' }} title={(<b>{"Sinh viên mới: " + name}</b>)}>
                    <Form
                        form={form}
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="on"
                    >
                        <Form.Item
                            label="fullName"
                            name="username"
                            rules={[{ required: true, message: 'Tên sinh viên không được để trống!' }, { max: 50, message: 'Tên dài quá 50 ký tự' }]}
                        >
                            <Input placeholder="Họ và tên" onChange={e => setName(e.target.value)} />
                        </Form.Item>

                        <Form.Item
                            name="gender"
                            label="Giới tính"
                            rules={[{ required: true, message: 'Hãy chọn giới tính' }]}
                        >
                            <Select allowClear placeholder="Chọn giới tính" onChange={value => setGender(value)}>
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
                                defaultPickerValue={null}
                                value={moment(birthday, 'DD/MM/YYYY')}
                                format={['DD/MM/YYYY', 'DD/MM/YY']}
                                onChange={e => setBirthday(moment(e).format('DD/MM/YYYY'))}
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
                                onChange={value => setSpecialized(value)}

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
                                Submit
                            </Button>
                            {/* <Button style={styleCSS} type='primary' onClick={handleAddStudent}>Thêm</Button> */}
                        </Form.Item>
                    </Form>
                </Card>
            </Row>
        </div>
    )
}
export default AddStudent;