import { Card, Layout } from "antd";
import React from "react";
import Notes from "./Notes";
import CreateNote from "./CreateNote";

const Dashboard = (props) => {
  const { Header, Content, Footer } = Layout;
  return (
    <Layout>
      <Header>
        <CreateNote />
      </Header>
    </Layout>
  );
};

export default Dashboard;
