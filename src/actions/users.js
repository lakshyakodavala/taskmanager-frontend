import api from "../config/ApiConfig";
import { Notification } from "../constants/notification";

const userService = {

    registerUser: async (registerData) => {
        try {
            return await api.post("/register", registerData);
        } catch (error) {
            Notification('error', 'Something went wrong while registering user')
        }
    },
    loginUser: async (loginData) => {
        try {
            return await api.post("/login", loginData);
        } catch (error) {
            Notification('error', 'Something went wrong while registering user')
        }
    }
}

export default userService;