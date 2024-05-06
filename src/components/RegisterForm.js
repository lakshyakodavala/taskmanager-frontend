// Import necessary components and dependencies
import React from 'react';
import { Form, Input, Button, Card, Typography } from 'antd'; // Import UI components from Ant Design
import styles from '../css/RegisterForm.module.css'; // Import CSS styles
import { Notification } from '../constants/notification'; // Import notification constants
import userService from '../actions/users'; // Import userService for user-related actions
import logo from '../logo.png'; // Import logo image

// Destructure Typography components from Ant Design
const { Title } = Typography;

// Define RegisterForm functional component
const RegisterForm = () => {

    // Define handleSubmit function to handle form submission
    const handleSubmit = async (values) => {
        try {
            // Check if password length is less than 6 characters
            if (values.password.length < 6) {
                Notification('warning', 'Password Length must be greater than 6 characters');
            } else {
                // Send register user request to userService
                const response = await userService.registerUser({ 'email': values.email, 'password': values.password });
                console.log("Response", response);
                // Handle different responses from the server
                if (response.status === 201) {
                    Notification('success', 'User Registered Successfully');
                }
                if (response.status === 200) {
                    Notification('info', 'A user already exists with the same email');
                }
            }
        } catch (error) {
            console.error(error);
            Notification('error', 'Something went wrong, please try again later'); // Display error notification
        }
    }

    // Return JSX for RegisterForm component
    return (
        <div className={styles.container}>
            <Card
                className={styles.card}
                cover={<img alt="background" src={logo} />} // Set logo as card cover
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

// Export RegisterForm component as default
export default RegisterForm;

