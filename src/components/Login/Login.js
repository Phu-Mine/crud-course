import { Form, Input, Button, message } from 'antd';
import axios from 'axios';

const LoginForm = () => {

    document.title = 'Login';

    const onFinish = (values) => {
        // console.log('Success:', values);
        axios.post("http://localhost:8080/login", values)
            .then(res => {
                console.log("Token: ", res.data);
                if (res.data !== '') {
                    localStorage.setItem('token', res.data[0]);
                    localStorage.setItem("id", res.data[1]);
                    message.success("đăng nhập thành công");
                    window.location.href = "/dashboard";
                } else {
                    message.error("Đăng nhập thất bại, kiểm tra tên đăng nhập và password");
                }
            })
    };

    const onFinishFailed = (errorInfo) => {
        // console.log('Failed:', errorInfo);
    };

    const styles = {
        containerLogin: {
            background: "url(https://www.nikaiacours.fr/wp-content/uploads/2019/12/login-background.jpg)",
            backgroundSize: "cover",
            height: '100vh',
            padding: '10vh'
        },
        tag: {
            padding: '20px 10px',
            textAlign: 'center',
        },
        formLogin: {
            width: '80vw',
            margin: "0vh auto",
            background: "#0290ff",
            display: "flex",
        },
        block1: {
            width: "50%",
            minWidth: "200px",
            height: "55vh",
            background: "#40516e",
            padding: "20px",
            display: "inline-block",
        },
        block2: {
            width: "50%",
            minWidth: "200px",
            height: "55vh",
            display: "inline-block",
            background: "url(https://sfdo-knowledge-images.s3.amazonaws.com/images/public/af0ccae0-2886-11e8-8740-42010af00002/Product_Docs/Agnostic/EDU/Data_Model/_Model_images/EDU_Model_ERD_Courses.png)",
            backgroundSize: "cover",
        },
        button: {
            margin: "30px 37%",
            width: "26%",
            minWidth: "100px",
        }
    }

    return (
        <>
            <div style={styles.containerLogin}>
                <div style={styles.formLogin}>
                    <div style={styles.block1}>
                        <h1 style={styles.tag}>Đăng nhập</h1>
                        <Form
                            name="basic"
                            labelCol={{
                                span: 8,
                            }}
                            wrapperCol={{
                                span: 16,
                            }}
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
                            <Form.Item
                                label="Tên người dùng"
                                name="userName"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Hãy nhập tên tài khoản!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Mật khẩu"
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Hãy nhập mật khẩu!',
                                    },
                                ]}
                            >
                                <Input.Password />
                            </Form.Item>
                            <Button type="primary" htmlType="submit" style={styles.button}>
                                Đăng nhập
                            </Button>
                        </Form>
                    </div>
                    <div style={styles.block2}>
                        {/* {isLogin === "success" ? (<Navigate to="/Dashboard " />) : null} */}
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginForm;