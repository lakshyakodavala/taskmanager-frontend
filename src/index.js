import React from 'react'; // Import React library
import ReactDOM from 'react-dom/client'; // Import ReactDOM library
import './index.css'; // Import CSS styles for the root component
import App from './App'; // Import the main App component

// Create a root instance for ReactDOM and render the App component
const root = ReactDOM.createRoot(document.getElementById('root')); // Create a root instance for ReactDOM
root.render(
  <App /> // Render the main App component inside the root
);
