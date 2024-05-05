import React, { useState } from "react";
import { Table, Button, Modal, Form, Input, Popconfirm } from "antd";
import { Select } from 'antd';
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import taskService from "../actions/tasks";
import { Notification } from "./notification";

const DynamicListTable = ({
    dataSource,
    columns,
    rowKey = "id",
    onRowClick,
    pagination,
    onPageChange,
}) => {
    const [visible, setVisible] = useState(false);
    // eslint-disable-next-line
    const [record, setRecord] = useState(null);
    const [editedRecord, setEditedRecord] = useState(null);

    const showModal = (record) => {
        setRecord(record);
        setEditedRecord(record);
        setVisible(true);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    const handleUpdate = async () => {
        const { id, ...updatedData } = editedRecord;
        const response = await taskService.updateTask(editedRecord.id, updatedData);
        if (response.status === 200) {
            setVisible(false);
            Notification('success', 'Task Updated');
            setTimeout(() => {
                window.location.reload();
            }, 800);
        }
       
    };

    const handleChange = (key, value) => {
        setEditedRecord({ ...editedRecord, [key]: value });
    };

    const handleDelete = async(record)=>{
        const response = await taskService.deleteTask(record.id);
        if (response.status === 200) {
            setVisible(false);
            Notification('success', 'Task Deleted');
            setTimeout(() => {
                window.location.reload();
            }, 800);
            
        }
    }

    return (
        <>
            <div>
                <Table
                    columns={[
                        ...columns,
                        {
                            title: "Edit",
                            key: "actions",
                            size:"small",
                            width:60,
                            render: (_, record) => (
                                <Button
                                    icon={<EditOutlined />}
                                    onClick={() => showModal(record)}
                                    style={{ color: "blue" }}
                                />
                            ),
                        },
                        {
                            title: "Delete",
                            key: "actions",
                            size: "small",
                            width: 60,
                            render: (_, record) => (
                                <Popconfirm
                                    title="Are you sure you want to delete this item?"
                                    onConfirm={() => handleDelete(record)}
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    <Button
                                        icon={<DeleteOutlined />}
                                        style={{ color: "red" }}
                                    />
                                </Popconfirm>
                            ),
                        },

                    ]}
                    scroll={{ x: 1300 }}
                    dataSource={dataSource}
                    rowKey={rowKey}
                    onRow={onRowClick}
                    pagination={false}
                    bordered
                />
            </div>
            <Modal
                title="Task Details"
                visible={visible}
                onCancel={handleCancel}
                footer={[
                    <Button key="update" type="primary" onClick={handleUpdate}>
                        Update
                    </Button>,
                    <Button key="back" onClick={handleCancel}>
                        Close
                    </Button>,
                ]}
                style={{ textAlign: 'center' }}
                width={600}
            >
                <Form layout="vertical" style={{ fontFamily: 'Poppins' }}>
                    <Form.Item label="Task Name">
                        <Input
                            value={editedRecord?.task_name}
                            onChange={(e) => handleChange("task_name", e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item label="Task Description">
                        <Input.TextArea
                            value={editedRecord?.task_description}
                            onChange={(e) => handleChange("task_description", e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item label="Task Status">
                        <Select
                            value={editedRecord?.task_status}
                            onChange={(value) => handleChange("task_status", value)}
                            style={{ width: '100%' }}
                        >
                            <Select.Option value="INPROGRESS">IN PROGRESS</Select.Option>
                            <Select.Option value="DONE">DONE</Select.Option>
                            <Select.Option value="TODO">TO DO</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Task Tag">
                        <Select
                            value={editedRecord?.task_tag}
                            onChange={(value) => handleChange("task_tag", value)}
                            style={{ width: '100%' }}
                        >
                            <Select.Option value="FAMILY">FAMILY</Select.Option>
                            <Select.Option value="WORK">WORK</Select.Option>
                            <Select.Option value="ACADEMIC">ACADEMIC</Select.Option>
                            <Select.Option value="PERSONAL">PERSONAL</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Created By">
                        <Input
                            value={editedRecord?.created_by}
                            onChange={(e) => handleChange("created_by", e.target.value)}
                            readOnly
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default DynamicListTable;
