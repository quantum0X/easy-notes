import { Card, Layout, Typography } from "antd";
import React from "react";
import Notes from "./Notes";
import CreateNote from "./CreateNote";

const Dashboard = (props) => {
  const { Header, Content, Footer } = Layout;
  return (
    <Layout>
      <Header
        style={{
          height: "60px",
          background: "white",
          boxShadow: "2px 0px 2px gray",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography.Title style={{ margin: "0px", padding: "0px" }} level={3}>
          Easy Notes
        </Typography.Title>
        <CreateNote />
      </Header>
      <Content style={{ height: "90vh" }}>
        <Notes />
      </Content>
      <Footer></Footer>
    </Layout>
  );
};

export default Dashboard;
