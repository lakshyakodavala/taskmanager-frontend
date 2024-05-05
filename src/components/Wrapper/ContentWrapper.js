import React from "react";
import { ConfigProvider } from "antd";
import Header from "../Header/Header";
import SideNavbar from "../SideNavBar/SideNavBar";

export default function ContentWrapper({ children }) {
  return (
    <ConfigProvider>
      <div
        style={{ display: "flex", flexDirection: "column", height: "100vh" }}
      >
        <div style={{ flex: "1", display: "flex" }}>
          <SideNavbar />
          <div style={{ flex: "1", overflowY: "auto" }}>
            <div>
              <Header />
              {children}
            </div>
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
}
