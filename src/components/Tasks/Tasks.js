import React, { useState, useEffect } from "react";
import { Input, Button, Spin, Pagination, Select, Modal, Form } from "antd";
import DynamicListTable from "../../constants/DynamicTable";
import taskService from "../../actions/tasks";
import { allTasks } from "../../constants/Table";
import SideNavbar from "../SideNavBar/SideNavBar";
import { Notification } from "../../constants/notification";
import {
    PlusCircleFilled
} from "@ant-design/icons";

const { Option } = Select;

function Tasks() {
    const [tableData, setTableData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [pagination, setPagination] = useState({ pageSize: 10, total: 0 });
    const [currentPage, setCurrentPage] = useState(1);
    const [statusFilter, setStatusFilter] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [newTask, setNewTask] = useState({
        task_name: "",
        task_description: "",
        task_status: "",
        task_tag: "",
    });

    useEffect(() => {
        fetchTasks();
    }, [currentPage, statusFilter]);

    const fetchTasks = async () => {
        setIsLoading(true);
        try {
            const response = await taskService.fetchAllTasks(currentPage, pagination.pageSize, statusFilter);
            let fetchedTableData = response.data?.data;
            setTableData(fetchedTableData);
            setPagination({ ...pagination, total: response.data?.count });
        } catch (error) {
            console.error("Error fetching tasks:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handlePageChange = (page, pageSize) => {
        setCurrentPage(page);
    };

    const handleFilterChange = (value) => {
        setStatusFilter(value);
    };

    const handleInputChange = (name, value) => {
        setNewTask({ ...newTask, [name]: value });
    };

    const handleSubmit = async () => {
        try {
            newTask.created_by = localStorage.getItem('email')
            const response = await taskService.createTask(newTask);
            if (response.status === 201) {
                Notification('success', 'Task Created Successfully')
            }
            fetchTasks();

            // Clear  form fields after submission
            setNewTask({
                task_name: "",
                task_description: "",
                task_status: "",
                task_tag: "",
            });
            setIsModalVisible(false);
        } catch (error) {
            console.error("Error creating task:", error);
        }
    };

    return (
        <div style={{ position: "relative", paddingLeft:'190px'}}> {/* Set position relative to ensure z-index works */}
            <SideNavbar />
            <div style={{ display: "flex", flexDirection: "column", flex: "1" }}>
                <div
                    style={{
                        margin: "30px",
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <Select
                        defaultValue={null}
                        onChange={handleFilterChange}
                        size="large"
                        style={{
                            width: '200px',
                            fontFamily: 'Poppins',
                            marginTop: '10px'
                        }}
                    >
                        <Option value={null}>All Tasks</Option>
                        <Option value="INPROGRESS">In Progress</Option>
                        <Option value="DONE">Done</Option>
                        <Option value="TODO">To Do</Option>
                    </Select>
                    <Button
                        size="large"
                        style={{
                            backgroundColor: "#3066be",
                            color: "#fff",
                            cursor: "pointer",
                        }}
                        onClick={() => setIsModalVisible(true)}
                        icon={<PlusCircleFilled />}
                    >
                        Create Task
                    </Button>
                </div>
                <Modal
                    title="Create Task"
                    visible={isModalVisible}
                    onCancel={() => setIsModalVisible(false)}
                    footer={[
                        // On form Cancel , close the form
                        <Button key="cancel" onClick={() => setIsModalVisible(false)}>
                            Cancel
                        </Button>,
                        <Button key="submit" type="primary" onClick={handleSubmit}>
                            Create
                        </Button>,
                    ]}
                    style={{ zIndex: 9999 }} // Set z-index to ensure modal appears above other content
                >

                    <Form layout="vertical">
                        <Form.Item label="Task Name">
                            <Input
                                value={newTask.task_name}
                                onChange={(e) => handleInputChange("task_name", e.target.value)}
                                placeholder="Enter Task Name"
                            />
                        </Form.Item>
                        <Form.Item label="Task Description">
                            <Input.TextArea
                                value={newTask.task_description}
                                onChange={(e) => handleInputChange("task_description", e.target.value)}
                                placeholder="Enter Task Description"
                            />
                        </Form.Item>
                        <Form.Item label="Task Status">
                            <Select
                                value={newTask.task_status}
                                onChange={(value) => handleInputChange("task_status", value)}
                                placeholder="Select Task Status"
                            >
                                <Select.Option value="INPROGRESS">In Progress</Select.Option>
                                <Select.Option value="DONE">Done</Select.Option>
                                <Select.Option value="TODO">To Do</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="Task Tag">
                            <Select
                                value={newTask.task_tag}
                                onChange={(value) => handleInputChange("task_tag", value)}
                                placeholder="Select Task Tag"
                            >
                                <Select.Option value="FAMILY">Family</Select.Option>
                                <Select.Option value="WORK">Work</Select.Option>
                                <Select.Option value="ACADEMIC">Academic</Select.Option>
                                <Select.Option value="PERSONAL">Personal</Select.Option>
                            </Select>
                        </Form.Item>
                    </Form>
                </Modal>
                <div style={{ margin: "30px" }}>
                    <Spin spinning={isLoading}>
                        <DynamicListTable
                            type="campaigns"
                            columns={allTasks}
                            dataSource={tableData}
                            rowKey={tableData.id}
                        />
                        <Pagination
                            current={currentPage}
                            pageSize={pagination.pageSize}
                            total={pagination.total}
                            onChange={handlePageChange}
                        />
                    </Spin>
                </div>
            </div>
        </div>
    );
}

export default Tasks;
