import { Typography, Space, Image, Form, Input, Button } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PasswordSection = (props) => {
  const [password, setPassword] = useState("");
  const { signInHandle } = useAuth();
  const navigate = useNavigate();

  const loginHandle = async (e) => {
    e.preventDefault();
    try {
      const res = await signInHandle(props.mail, password);
      console.log(res);
      console.log("user lgged in");
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Space>
      <Space>
        <Typography.Title>password</Typography.Title>
        <Input
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={loginHandle}>Sign up</Button>
      </Space>
    </Space>
  );
};

const Login = () => {
  const [email, setEmail] = useState();
  const [loading, setLoading] = useState(false);
  const [passwordSection, setPasswordSection] = useState(false);
  const navigate = useNavigate();
  const { checkMailHandle } = useAuth();
  const navigateHandle = () => {
    navigate("/signup");
  };

  const nextPageHandle = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await checkMailHandle(email);
      console.log(res);
      if (res.length) {
        setPasswordSection("cliked");
        console.log("chenged");
      } else {
        console.log("not username");
      }

      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  return (
    <Space
      style={{
        height: "100vh",
      }}
    >
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
          block
        >
          <Typography.Title level={1} style={{ padding: "20px" }}>
            Beautify <br />
            Notes
            <br />
            in your Style
          </Typography.Title>

          <Form>
            <Typography.Title level={2}>Log in</Typography.Title>
            <Form.Item>
              <Input
                size="large"
                style={{ width: "60%" }}
                placeholder="Enter your mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
              loading={loading}
              onClick={nextPageHandle}
            >
              Continue
            </Button>
          </Form>
          <Space>
            <Typography.Text>Create new account &rarr;</Typography.Text>
            <Typography.Link onClick={navigateHandle}>Sign up</Typography.Link>
          </Space>
          {/* <PasswordSection mail={email} /> */}
        </Space>

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
