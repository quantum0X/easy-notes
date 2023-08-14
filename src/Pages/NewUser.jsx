import { Button, Form, Image, Input, Typography, message } from "antd";
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  MailOutlined,
  LockOutlined,
  UserOutlined,
  RightOutlined,
} from "@ant-design/icons";

const NewUser = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { currentUser, signUpHandle } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // notification
  const [api, contextHolder] = message.useMessage();
  const openNotificationWithIcon = (type, message) => {
    api.open({
      type: type,
      content: message,
    });
  };

  // firebase error handle
  const firebaseErrorHandler = (err) => {
    if (
      err.code === "auth/email-already-exists" ||
      err.code === "auth/email-already-in-use"
    )
      openNotificationWithIcon("error", "email already exists");
    else if (err.code === "auth/invalid-email")
      openNotificationWithIcon("error", "invalid email");
    else if (err.code === "auth/missing-email")
      openNotificationWithIcon("error", "missing email");
  };

  // submit handle
  const submitHandle = async (e) => {
    e.preventDefault();

    if (mail === "") {
      openNotificationWithIcon("warning", "please enter mail");
      return;
    } else if (password.length < 6 || confirmPassword.length < 6) {
      openNotificationWithIcon("warning", "password greater than 6");
      return;
    }

    if (password !== confirmPassword) {
      openNotificationWithIcon("warning", "password not equal");
      return;
    }

    try {
      setLoading(true);
      await signUpHandle(mail, password);
      setLoading(false);
      navigate("/");
    } catch (err) {
      setLoading(false);
      firebaseErrorHandler(err);
    }
  };

  useEffect(() => {
    if (currentUser) return navigate("/");
  });

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {contextHolder}
      {!currentUser && (
        <>
          <div
            style={{
              display: "flex",
              height: "70vh",
              width: "70vw",
              justifyContent: "center",
              alignItems: "center",
              border: "1px solid gray",
              boxShadow: "4px 4px 4px #dedede",
            }}
          >
            <Image
              height={"100%"}
              width="50%"
              src={process.env.PUBLIC_URL + "/img/signupImg.jpg"}
              alt="img"
            />
            <Form
              style={{
                width: "50%",
                height: "100%",
                padding: "2rem auto",
                background: "#faf3f0",
              }}
            >
              <Typography.Title level={1} style={{ marginBottom: "20px" }}>
                Sign up
              </Typography.Title>

              <Form.Item style={{ justifyContent: "space-between" }}>
                <Input
                  prefix={
                    <UserOutlined
                      style={{
                        marginRight: "5px",
                        color: "#6b6b6b",
                        fontSize: "20px",
                      }}
                    />
                  }
                  style={{
                    width: "45%",
                    height: "40px",
                    margin: "5px",
                    paddingLeft: "10px",
                  }}
                  placeholder="First Name"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                />
                <Input
                  prefix={
                    <UserOutlined
                      style={{
                        marginRight: "5px",
                        color: "#6b6b6b",
                        fontSize: "20px",
                      }}
                    />
                  }
                  style={{ width: "40%", height: "40px", margin: "5px" }}
                  placeholder="Last Name"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                />
              </Form.Item>
              <Form.Item
                rules={[{ required: true, message: "please enter mail" }]}
              >
                <Input
                  prefix={
                    <MailOutlined
                      style={{
                        marginRight: "5px",
                        color: "#6b6b6b",
                        fontSize: "20px",
                      }}
                    />
                  }
                  style={{
                    width: "90%",
                    height: "40px",
                    margin: "auto",
                    // padding: "0px 0px 0px 15px",
                  }}
                  type="text"
                  placeholder="Email Address"
                  value={mail}
                  onChange={(e) => setMail(e.target.value)}
                />
              </Form.Item>
              <Form.Item>
                <Input
                  prefix={
                    <LockOutlined
                      style={{
                        marginRight: "5px",
                        color: "#6b6b6b",
                        fontSize: "20px",
                      }}
                    />
                  }
                  style={{ width: "90%", height: "40px", margin: "auto" }}
                  type="password"
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Item>
              <Form.Item>
                <Input
                  prefix={
                    <LockOutlined
                      style={{
                        marginRight: "5px",
                        color: "#6b6b6b",
                        fontSize: "20px",
                      }}
                    />
                  }
                  style={{ width: "90%", height: "40px", margin: "auto" }}
                  type="password"
                  placeholder="confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Form.Item>
              <Button
                style={{
                  width: "30%",
                  background: "#dbc4f0",
                  margin: "10px",
                  fontWeight: "500",
                  "&::hover": {
                    color: "black",
                    background: "black",
                  },
                }}
                loading={loading}
                onClick={submitHandle}
              >
                Sign up
              </Button>

              <div style={{ margin: "20px auto" }}>
                <Typography.Text style={{ margin: "10px" }} level={4}>
                  Already account:
                </Typography.Text>
                <Typography.Link
                  style={{ margin: "5px", fontSize: "15px" }}
                  onClick={() => navigate("/login")}
                >
                  log in <RightOutlined />
                </Typography.Link>
              </div>
            </Form>
          </div>
        </>
      )}
    </div>
  );
};

export default NewUser;
