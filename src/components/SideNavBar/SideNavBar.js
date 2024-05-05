import { Menu } from "antd";
import { Link, useNavigate } from "react-router-dom";
import logo from '../../logo.png';

import {
  BookFilled,
  LogoutOutlined
} from "@ant-design/icons";

const SideNavbar = () => {
  const navigate = useNavigate();

  const items = [
    {
      key: "Tasks",
      title: "Tasks",
      to: "/tasks",
      icon: <BookFilled />,
    }
  ];

  const handleLogout = () => {
    localStorage.removeItem("email");
    navigate("/");
  };

  return (
    <div style={{ width: "200px", height: "100%", backgroundColor: "#fff", borderRight: "1px solid #e8e8e8", overflowY: "auto", position: "fixed", left: "0", top: "0", zIndex:9999 }}>
      <div style={{ margin: "20px" }}>
        <img src={logo} alt="logo" style={{ width: "100%" }} />
      </div>
      <Menu
        inlineIndent={30}
        defaultOpenKeys={[items[0].key]}
        defaultSelectedKeys={[items[0].key]}
        style={{ height: "calc(100% - 50px)", overflowY: "auto" }}
      >
        {items.map((item) => (
          <Menu.Item key={item.key} icon={item.icon}>
            <Link to={item.to}>{item.title}</Link>
          </Menu.Item>
        ))}
        <Menu.Item key="logout" onClick={handleLogout} icon={<LogoutOutlined />}>
          Logout
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default SideNavbar;
