import api from "../config/ApiConfig";
import { Notification } from "../constants/notification";

const taskService = {

    fetchAllTasks: async (page, limit, status) => {
        try {
            return await api.get("/tasks", { params: { page, limit, status } });
        } catch (error) {
            Notification('error', 'Something went wrong while fetching tasks')
        }
    },
    updateTask: async (id, taskData) => {
        try {
            return await api.put(`/task-update/${id}`, taskData);
        } catch (error) {
            Notification('error', 'Something went wrong while updating task');
        }
    },
    deleteTask: async (id) => {
        try {
            return await api.delete(`/task-delete/${id}`);
        } catch (error) {
            Notification('error', 'Something went wrong while deleting task');
        }
    },
    createTask: async (taskData) => {
        try {
            return await api.post('/task-create', taskData);
        } catch (error) {
            Notification('error', 'Something went wrong while updating task');
        }
    }


}

export default taskService;