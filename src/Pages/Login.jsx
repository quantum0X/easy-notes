import {
  Typography,
  Space,
  Image,
  Form,
  Input,
  Button,
  Row,
  Col,
  message,
} from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ArrowLeftOutlined, MinusOutlined } from "@ant-design/icons";

const PasswordSection = (props) => {
  const [password, setPassword] = useState("");
  const { signInHandle } = useAuth();
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
    if (err.code === "auth/wrong-password")
      openNotificationWithIcon("error", "Wrong password");
    else if (err.code === "auth/too-many-requests")
      openNotificationWithIcon("error", "Too many attempts.Please try later");
  };

  const loginHandle = async (e) => {
    e.preventDefault();
    if (password === "") {
      openNotificationWithIcon("warning", "Enter your password");
      return;
    }
    setLoading(true);
    try {
      await signInHandle(props.mail, password);
      setLoading(false);
      navigate("/");
    } catch (err) {
      console.log(err);
      setLoading(false);
      firebaseErrorHandler(err);
    }
  };
  return (
    <>
      {contextHolder}
      <Form.Item>
        <Input.Password
          size="large"
          style={{ width: "60%" }}
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Item>
      <Button
        size="large"
        style={{
          background: "#dbc4f0",
          fontWeight: "500",
          "&::hover": {
            color: "black",
            background: "black",
          },
        }}
        onClick={loginHandle}
        loading={loading}
      >
        Sign up
      </Button>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "end",
        }}
      >
        <MinusOutlined
          style={{
            color: "gray",
            fontSize: "20px",
          }}
        />
        <MinusOutlined
          style={{ color: "black", fontSize: "20px", marginRight: "2rem" }}
        />
      </div>
    </>
  );
};

// main login page
const Login = () => {
  const [email, setEmail] = useState();
  const [loading, setLoading] = useState(false);
  const [passwordSection, setPasswordSection] = useState(false);
  const navigate = useNavigate();
  const { checkMailHandle, currentUser } = useAuth();

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
    if (err.code === "auth/invalid-email")
      openNotificationWithIcon("error", "Invalid email");
    else if (err.code === "auth/missing-identifier")
      openNotificationWithIcon("error", "Please enter mail");
  };

  const navigateHandle = () => {
    navigate("/signup");
  };

  const nextPageHandle = async (e) => {
    e.preventDefault();
    if (email === "") {
      openNotificationWithIcon("warning", "Please enter your mail");
      return;
    }
    setLoading(true);
    try {
      const res = await checkMailHandle(email);
      setLoading(false);
      if (!res.length) {
        openNotificationWithIcon("error", "No user found!");
        return;
      }
      setPasswordSection(true);
    } catch (err) {
      console.log(err);
      setLoading(false);
      firebaseErrorHandler(err);
    }
  };

  useEffect(() => {
    if (currentUser) return navigate("/");
  });

  return (
    <Space
      style={{
        height: "100vh",
      }}
    >
      {contextHolder}
      <div
        style={{
          height: "70vh",
          width: "80vw",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Space
          direction="vertical"
          style={{ width: "40%", background: "#faf3f0" }}
        >
          <Typography.Title level={1} style={{ padding: "20px" }}>
            Beautify <br />
            Notes
            <br />
            in your Style
          </Typography.Title>

          {/* login section */}
          <Form>
            <Typography.Title level={2}>Log in</Typography.Title>
            <Row>
              <Col span={6} offset={3}>
                {!passwordSection ? (
                  <> </>
                ) : (
                  <Button
                    icon={<ArrowLeftOutlined />}
                    style={{
                      marginBottom: "10px ",
                    }}
                    onClick={() => setPasswordSection(false)}
                  ></Button>
                )}
              </Col>
            </Row>

            {!passwordSection ? (
              <>
                <Form.Item>
                  <Input
                    size="large"
                    style={{ width: "60%", marginTop: "40px" }}
                    placeholder="Enter your mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Item>
                <Button
                  size="large"
                  style={{
                    width: "40%",
                    background: "#dbc4f0",
                    fontWeight: "500",
                    "&::hover": {
                      color: "black",
                      background: "black",
                    },
                  }}
                  loading={loading}
                  onClick={nextPageHandle}
                >
                  Continue
                </Button>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "end",
                  }}
                >
                  <MinusOutlined style={{ color: "black", fontSize: "20px" }} />
                  <MinusOutlined
                    style={{
                      color: "gray",
                      fontSize: "20px",
                      marginRight: "2rem",
                    }}
                  />
                </div>
              </>
            ) : (
              <PasswordSection mail={email} />
            )}
          </Form>
          <Space
            style={{
              marginTop: "10px",
            }}
          >
            <Typography.Text>Create new account &rarr;</Typography.Text>
            <Typography.Link onClick={navigateHandle}>Sign up</Typography.Link>
          </Space>
        </Space>

        {/* right section */}
        <Image
          height={"100%"}
          src={process.env.PUBLIC_URL + "img/NotesLandingImg.png"}
          preview={"disable"}
        />
      </div>
    </Space>
  );
};

export default Login;
