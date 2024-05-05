import {Tag} from 'antd';
import moment from 'moment';




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


export const allTasks = [
    {
        title: "Campaign Name",
        dataIndex: "task_name",
        key: "task_name",
        width: 200,
        fixed: "left",
        ellipsis: true,
    },
    {
        title: "Description",
        dataIndex: "task_description",
        key: "task_description",
        width: 150,
        ellipsis: true,
    },
    {
        title: "Status",
        dataIndex: "task_status",
        key: "task_status",
        width: 100,
        // Render the color and status of the task accordingly
        render: (text) => {
            const { color, label } = getStatusTag(text);
            return (
                <Tag color={color}>
                    {label}
                </Tag>
            );
        }
    },
    {
        title: "Tag",
        dataIndex: "task_tag",
        key: "task_tag",
        width: 100,
        ellipsis: true,
    },
    {
        title: "Created By",
        dataIndex: "created_by",
        key: "created_by",
        width: 150,
        align: "center",
    },
    {
        title: "Date Created",
        dataIndex: "created_at",
        key: "created_at",
        width: 150,
        align: "center",
        render: (record) => {
            return moment(record).format("YYYY-MM-DD")
        }
    }
];
