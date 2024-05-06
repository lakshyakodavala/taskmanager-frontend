import "./App.css"; // Import CSS styles for the entire app
import { Routes, Route, BrowserRouter as Router } from "react-router-dom"; // Import necessary components from React Router
import RegisterForm from "./components/RegisterForm"; // Import RegisterForm component
import LoginForm from "./components/LoginForm"; // Import LoginForm component
import Tasks from "./components/Tasks/Tasks"; // Import Tasks component
import ProtectedRoute from "./constants/ProtectedRoutes"; // Import ProtectedRoute component for handling protected routes

// Main component representing the entire application
function App() {
  return (
    <div className="container"> {/* Main container for the entire app */}
      <Router> {/* Use BrowserRouter as Router to enable routing */}
        <Routes> {/* Define routes for different paths */}
          <Route path="/" element={<LoginForm />} /> {/* Route for login page */}
          <Route path="/signup" element={<RegisterForm />} /> {/* Route for registration page */}
          <Route path="/tasks" element={<ProtectedRoute element={Tasks} />} /> {/* Protected route for tasks page */}
        </Routes>
      </Router>
    </div>
  );
}

export default App; // Export the App component as the default export
