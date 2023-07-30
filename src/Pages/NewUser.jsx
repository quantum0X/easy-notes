import { Button, Form, Input, Space } from "antd";
import React, { useState } from "react";

const NewUser = () => {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandle = (e) => {
    e.preventDefault();
  };
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <Space
        style={{
          height: "50%",
          width: "50%",
          backgroundImage: `url(${process.env.PUBLIC_URL + "/img/img-1.png"})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backdropFilter: "blur(8px)",
        }}
      >
        {/* <Image src={BackImage} alt="img" /> */}
        <Form>
          <Form.Item>
            <Input
              type="text"
              placeholder="Email Address"
              value={mail}
              onChange={(e) => setMail(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <Input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <Input
              type="password"
              placeholder="confirm password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>
          <Button onClick={submitHandle}>Log in</Button>
        </Form>
      </Space>
    </div>
  );
};

export default NewUser;
