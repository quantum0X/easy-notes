import { Empty, Layout, Space, Typography } from "antd";
import React, { useState } from "react";
import Notes from "./Notes";
import CreateNote from "./CreateNote";
import { GithubOutlined } from "@ant-design/icons";

const Dashboard = () => {
  const { Header, Content, Footer } = Layout;
  const [notes, setNotes] = useState([]);

  const createNote = (note) => {
    setNotes((prevNote) => [...prevNote, note]);
  };

  return (
    <Layout>
      <Header
        style={{
          height: "60px",
          width: "100%",
          background: "white",
          boxShadow: "2px 0px 2px gray",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          zIndex: "999",
          position: "fixed",
        }}
      >
        <Typography.Title style={{ margin: "0px", padding: "0px" }} level={3}>
          Easy Notes
        </Typography.Title>
        {notes.length > 0 && <CreateNote onChange={createNote} />}
      </Header>

      <Content
        style={{
          height: "90vh",
          marginTop: "60px",
          width: "100wv",
          overflow: "scroll",
        }}
      >
        <Space
          size="small"
          style={{
            height: "100%",
            width: "100%",
            padding: "15px",
            overflow: "hidden",
          }}
          wrap
        >
          {notes.length ? (
            notes.map((note, idx) => (
              <Notes
                key={idx}
                color={note.color}
                title={note.title}
                description={note.description}
              />
            ))
          ) : (
            <Empty
              description="No notes"
              style={{
                width: "100vw",
                height: "100%",
                margin: "auto",
              }}
            >
              <CreateNote onChange={createNote} />
            </Empty>
          )}
        </Space>
      </Content>
      <Footer style={{ background: "#212121", height: "25vh" }}>
        <Space
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
          align="center"
        >
          <Typography.Title style={{ color: "white" }}>
            Easy Notes
          </Typography.Title>
          <Space direction="vertical">
            <Typography.Title
              style={{
                color: "white",
              }}
              level={4}
            >
              My Profile
            </Typography.Title>
            <Typography.Text
              style={{
                color: "gray",
              }}
            >
              <GithubOutlined /> GitHub:
              <Typography.Link
                href="https://github.com/quantum0X"
                target="_blank"
                style={{ color: "white", marginInline: "5px" }}
              >
                quantum0X
              </Typography.Link>
            </Typography.Text>
          </Space>
        </Space>
      </Footer>
    </Layout>
  );
};

export default Dashboard;
