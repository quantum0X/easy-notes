import { Empty, Layout, Space, Typography } from "antd";
import React, { useState } from "react";
import Notes from "./Notes";
import CreateNote from "./CreateNote";

const Dashboard = () => {
  const { Header, Content, Footer } = Layout;
  const [notes, setNotes] = useState([]);

  const createNote = (note) => {
    console.log(note);
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
      <Footer style={{ background: "#212121" }}>
        <Space
          style={{
            display: "flex",
            justifyContent: "space-evenly",
          }}
          align="center"
        >
          <Typography.Title style={{ color: "white" }}>
            Easy Notes
          </Typography.Title>
          <Space>
            <Typography.Title level={4}>My Profile</Typography.Title>
            <Typography.Text>GitHub: </Typography.Text>
          </Space>
        </Space>
      </Footer>
    </Layout>
  );
};

export default Dashboard;
