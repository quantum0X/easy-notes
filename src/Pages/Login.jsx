import { Typography, Space, Image, Form, Input, Button } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const navigateHandle = () => {
    navigate("/signup");
  };

  const nextPageHandle = (e) => {
    e.preventDefault();
    setLoading(true);
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
