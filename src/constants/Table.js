// Import necessary dependencies
import { Tag } from 'antd';
import moment from 'moment';

// Function to get status tag based on task status
const getStatusTag = (text) => {
    switch (text) {
        case "INPROGRESS":
            return { color: "blue", label: "IN PROGRESS" };
        case "DONE":
            return { color: "green", label: "DONE" };
        case "TODO":
            return { color: "volcano", label: "TO DO" };
        default:
            return { color: "default", label: text.toUpperCase() };
    }
};

// Define columns for all tasks
export const allTasks = [
    {
        title: "Task Name", // Column title
        dataIndex: "task_name", // Data index/key
        key: "task_name", // Unique key
        width: 200, // Column width
        fixed: "left", // Fix the column on the left side
        ellipsis: true, // Show ellipsis for overflow text
    },
    {
        title: "Description", // Column title
        dataIndex: "task_description", // Data index/key
        key: "task_description", // Unique key
        width: 150, // Column width
        ellipsis: true, // Show ellipsis for overflow text
    },
    {
        title: "Status", // Column title
        dataIndex: "task_status", // Data index/key
        key: "task_status", // Unique key
        width: 100, // Column width
        // Render the color and status of the task accordingly
        render: (text) => {
            const { color, label } = getStatusTag(text); // Get color and label based on status
            return (
                <Tag color={color}> {/* Render status tag with color */}
                    {label} {/* Display status label */}
                </Tag>
            );
        }
    },
    {
        title: "Tag", // Column title
        dataIndex: "task_tag", // Data index/key
        key: "task_tag", // Unique key
        width: 100, // Column width
        ellipsis: true, // Show ellipsis for overflow text
    },
    {
        title: "Created By", // Column title
        dataIndex: "created_by", // Data index/key
        key: "created_by", // Unique key
        width: 150, // Column width
        align: "center", // Align content to center
    },
    {
        title: "Date Created", // Column title
        dataIndex: "created_at", // Data index/key
        key: "created_at", // Unique key
        width: 150, // Column width
        align: "center", // Align content to center
        // Render date in YYYY-MM-DD format using moment.js
        render: (record) => {
            return moment(record).format("YYYY-MM-DD"); // Format date
        }
    }
];
