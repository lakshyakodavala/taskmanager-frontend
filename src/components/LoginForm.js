// Import necessary components and dependencies
import React from 'react';
import { Form, Input, Button, Card, Typography } from 'antd'; // Import UI components from Ant Design
import styles from '../css/RegisterForm.module.css'; // Import CSS styles
import userService from '../actions/users'; // Import userService for user-related actions
import logo from '../logo.png'; // Import logo image
import { Notification } from '../constants/notification'; // Import notification constants
import { useNavigate } from "react-router-dom"; // Import useNavigate hook for navigation

// Destructure Typography components from Ant Design
const { Title } = Typography;

// Define LoginForm functional component
const LoginForm = () => {
    const navigate = useNavigate(); // Initialize navigate function for navigation

    // Define handleSubmit function to handle form submission
    const handleSubmit = async (values) => {
        try {
            // Send login request to userService
            const response = await userService.loginUser({ 'email': values.email, 'password': values.password });
            
            // Handle different responses from the server
            if (response.data.message === 'USER_DOES_NOT_EXIST') {
                Notification('error', 'User does not exist, please register before logging in');
            } else if (response.data.message === 'LOGIN_FAILED') {
                Notification('error', 'Incorrect Password');
            } else {
                Notification('success', 'Login successfull');
                localStorage.setItem('email', response.data.data.email);
                navigate("/tasks"); // Navigate to '/tasks' route after successful login
            }
        } catch (error) {
            console.error(error);
            Notification('error', 'Something went wrong, please try again later'); // Display error notification
        }
    };

    // Return JSX for LoginForm component
    return (
        <div className={styles.container}>
            <Card
                className={styles.card}
                cover={<img alt="background" src={logo} />} // Set logo as card cover
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

// Export LoginForm component as default
export default LoginForm;

