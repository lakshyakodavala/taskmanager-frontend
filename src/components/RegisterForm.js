// components/RegisterForm.js
import React from 'react';
import { Form, Input, Button, Card, Typography } from 'antd';
import styles from '../css/RegisterForm.module.css';
import { Notification } from '../constants/notification';
import userService from '../actions/users';
import logo from '../logo.png'; // Ensure this path is correct

const { Title } = Typography;

const RegisterForm = () => {

    const handleSubmit = async (values) => {
        try {
            if (values.password.length < 6) {
                Notification('warning', 'Password Length must be greater than 6 characters');
            } else {
                const response = await userService.registerUser({ 'email': values.email, 'password': values.password });
                console.log("Response", response);
                if (response.status === 201) {
                    Notification('success', 'User Registered Successfully');
                }
                if (response.status === 200) {
                    Notification('info', 'A user already exists with the same email');
                }
            }
        } catch (error) {
            console.error(error);
            Notification('error', 'Something went wrong, please try again later');
        }
    }

    return (
        <div className={styles.container}>
            <Card
                className={styles.card}
                cover={<img alt="background" src={logo} />}
            >
                <div className={styles.content}>
                    <Title level={4} className={styles.title}>Task Manager - Register</Title>
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
                                Register
                            </Button>
                        </Form.Item>
                    </Form>
                    <p style={{ textAlign: 'center' }}>

                        <strong>Already have an account? </strong>
                        <a href="/">Sign In</a>


                    </p>
                </div>
            </Card>
        </div>
    );
};

export default RegisterForm;
