import "./App.css";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import Tasks from "./components/Tasks/Tasks";
import ProtectedRoute from "./constants/ProtectedRoutes";

function App() {
  return (
    <div className="container">
      <Router>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/signup" element={<RegisterForm />} />
          <Route path="/tasks" element={<ProtectedRoute element={Tasks} />} />


        </Routes>
      </Router>
    </div>
  );
}

export default App;
