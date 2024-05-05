// components/LoginForm.js
import React from 'react';
import { Form, Input, Button, Card, Typography } from 'antd';
import styles from '../css/RegisterForm.module.css';
import userService from '../actions/users';
import logo from '../logo.png';
import { Notification } from '../constants/notification';
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const LoginForm = () => {
    const navigate = useNavigate();

    const handleSubmit = async (values) => {
        try {
            const response = await userService.loginUser({ 'email': values.email, 'password': values.password });
            if (response.data.message === 'USER_DOES_NOT_EXIST') {
                Notification('error', 'User does not exist, please register before logging in')
            } else if (response.data.message === 'LOGIN_FAILED') {
                Notification('error', 'Incorrect Password')
            } else {
                Notification('success', 'Login successfull')
                localStorage.setItem('email', response.data.data.email);
                navigate("/tasks")
            }
        } catch (error) {
            console.error(error);
            Notification('error', 'Something went wrong, please try again later');
        }
    };

    return (
        <div className={styles.container}>
            <Card
                className={styles.card}
                cover={<img alt="background" src={logo} />}
            >
                <div className={styles.content}>
                    <Title level={4} className={styles.title}>Task Manager - Login</Title>
                    <br />
                    <br />
                    <Form onFinish={handleSubmit}>
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                            wrapperCol={{ span: 15, offset: 2 }}
                        >
                            <Input placeholder="Username" className={styles.formItem} />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                            wrapperCol={{ span: 15, offset: 1 }}
                        >
                            <Input.Password placeholder="Password" className={styles.formItem} />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" block className={styles.button}>
                                Login
                            </Button>
                        </Form.Item>
                    </Form>
                    <p style={{ textAlign: 'center' }}>

                        <strong>Don't have an account? </strong>
                        <a href="/signup">Sign Up</a>


                    </p>

                </div>
            </Card>
        </div>
    );
};

export default LoginForm;
