import React, { useState } from 'react';
import { Form, Button, Row, Input, Select, message, Card, } from 'antd';
import axios from 'axios';
import { listSpecialized } from '../common/configOfTables';

// import { useDispatch } from 'react-redux';
// import { addCourse } from '../../redux/actions';
// import { v4 as uuid } from 'uuid';

const { Option } = Select;
const styleCSS = { textAlign: 'center', margin: '5px' }

const AddCourse = () => {
    // const dispatch = useDispatch();

    const [courseName, setCourseName] = useState('');
    const [teacher, setTeacherName] = useState('');
    const [specialized, setSpecialized] = useState('CNTT');

    const handleAddCourse = () => {
        message.loading('Đang thêm...', 1)
            .then(() => {
                var newCourse = {
                    key: 0,
                    name: courseName,
                    teacherName: teacher,
                    specialized: specialized,
                }
                // dispatch(addCourse(newCourse));
                axios.put("http://localhost:8080/courses", newCourse)
                    .then((res) => {
                        console.log("Đã thêm thành công: ", res.data)
                        message.success('Đã thêm thành công');
                    })
            })
        handleReset();
    }


    const onFinish = (values: any) => {
        handleAddCourse();
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const [form] = Form.useForm();

    const handleReset = () => {
        setCourseName('');
        setTeacherName('');
        setSpecialized('CNTT');

        form.setFieldsValue({
            courseName: '',
            teacherName: '',
            specialized: 'CNTT',
        })

    }

    return (
        <Row gutter={16}>
            <Card style={{ margin: '0 auto', width: '500px' }} title={(<b>{"Khoá học mới: " + courseName}</b>)}>
                {/* ------------------------------------------- */}
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
                        <Input placeholder="Khoá học" onChange={e => setCourseName(e.target.value)} />
                    </Form.Item>
                    <Form.Item
                        label="Tên Giảng Viên"
                        name="teacherName"
                        rules={[{ required: true, message: 'Tên giảng viên không được để trống!' }, { max: 50, message: 'Tên dài quá 50 ký tự' }, { min: 10, message: 'Tên không ngắn quá 10 ký tự' }]}
                    >
                        <Input
                            placeholder="Họ và tên giảng viên"
                            value={teacher}
                            onChange={e => setTeacherName(e.target.value)}
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
                        <Button style={styleCSS} type='danger' onClick={handleReset}>Reset</Button>
                    </Form.Item>
                </Form>
            </Card>
        </Row>
    )
}
export default AddCourse;