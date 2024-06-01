import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { ContactsOutlined } from "@ant-design/icons";
import { Routes, Route, Link } from "react-router-dom";

import "./App.css";
import ContactList from "./Pages/ContactList";
import ContactForm from "./Pages/ContactForm";

const { Header, Content, Footer, Sider } = Layout;

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  const items = [
    {
      key: "1",
      label: "Liste des contacts",
      icon: <ContactsOutlined />,
      path: "/",
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value: boolean) => setCollapsed(value)}
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          backgroundColor: "#000000",
        }}
        className="custom-sider"
      >
        <div className="logo" style={{ backgroundColor: "#FF7900" }} />
        <Menu
          theme="dark"
          mode="vertical"
          style={{ backgroundColor: "#000000" }}
        >
          {items.map((item) => (
            <Menu.Item key={item.key} icon={item.icon}>
              <Link to={item.path}>{item.label}</Link>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout
        style={{
          marginLeft: collapsed ? 80 : 200,
          transition: "margin-left 0.2s",
        }}
      >
        <Header
          style={{
            backgroundColor: "#FF7900",
            padding: 0,
            position: "fixed",
            width: "100%",
            zIndex: 1,
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <h1 className="text-3xl m-0 text-center text-white ml-6 mt-2">
              Test HoudaTech
            </h1>
          </div>
        </Header>
        <Content
          style={{
            margin: "29px",
            padding: 24,
            minHeight: 600,
            backgroundColor: "white",
            overflow: "auto",
            marginTop: "50px",
          }}
        >
          <Routes>
            <Route path="/" element={<ContactList />} />
            <Route path="/addContact" element={<ContactForm />} />

            <Route path="/addContact/:id" element={<ContactForm />} />
          </Routes>
        </Content>

        <Footer
          style={{
            textAlign: "center",
            position: "fixed",
            width: "100%",
            bottom: 0,
          }}
        >
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default App;
