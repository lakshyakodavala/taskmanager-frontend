import React from "react";
import logo from '../../logo.png';

const Header = () => {
  return (
    <div
      style={{
        backgroundColor: "white",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '10px',
        margin: '10px', // Example: Reduce margin
      }}
    >
      <img src={logo} alt="logo" style={{ width: '100px', height: '100px' }} /> {/* Adjusted logo size */}
    </div>
  );
};

export default Header;
