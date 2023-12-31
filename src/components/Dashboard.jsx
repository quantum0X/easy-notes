import { Empty, Layout, Menu, Space, Typography } from "antd";
import React, { useEffect, useState } from "react";
import Notes from "./Notes";
import CreateNote from "./CreateNote";
import {
  GithubOutlined,
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

const items = [
  {
    label: `${auth?.currentUser?.displayName}`,
    key: "user",
    children: [
      {
        icon: <UserOutlined />,
        label: "Profile",
        key: "profile",
      },
      {
        icon: <SettingOutlined />,
        label: "Setting",
        key: "setting",
      },

      {
        icon: <LogoutOutlined />,
        label: "Log Out",
        key: "logOut",
      },
    ],
  },
];
const Dashboard = () => {
  const { Header, Content, Footer } = Layout;
  const [notes, setNotes] = useState([]);
  const { currentUser, signOutHandle } = useAuth();
  const dataRef = collection(db, "notes");
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      const data = await getDocs(dataRef);
      setNotes(data.docs.map((docs) => ({ ...docs.data(), id: docs.id })));
    };

    getData();
  }, [notes]);

  useEffect(() => {
    if (!currentUser) return navigate("/login");
  });

  const menuClickHandle = (e) => {
    console.log(e);

    if (e.key === "logOut") signOutHandle();
    else if (e.key === "profile") navigate("/profile");
  };

  return (
    <Layout>
      {currentUser && (
        <>
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
            <Typography.Title
              style={{ margin: "0px", padding: "0px" }}
              level={3}
            >
              Easy Notes
            </Typography.Title>
            {notes.length > 0 && <CreateNote />}
            {/* Menu */}
            <Menu onClick={menuClickHandle} mode="horizontal" items={items} />
          </Header>

          {/* content section */}
          <Content
            style={{
              minHeight: "90vh",
              marginTop: "60px",
              width: "100wv",
            }}
          >
            <Space
              size="small"
              style={{
                height: "100%",
                width: "100%",
                padding: "15px",
                overflow: "hidden",
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
              wrap
            >
              {notes.length ? (
                notes.map((note, idx) => (
                  <Notes
                    key={idx}
                    props={note}
                    // color={note.color}
                    // title={note.title}
                    // description={note.description}
                    // createdTime={note.createdTime}
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
                  <CreateNote />
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
        </>
      )}
    </Layout>
  );
};

export default Dashboard;
