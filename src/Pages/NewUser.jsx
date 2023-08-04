import { Button, Form, Input, Space } from "antd";
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const NewUser = () => {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { currentUser, signUpHandle } = useAuth();
  const navigate = useNavigate();

  const submitHandle = async (e) => {
    e.preventDefault();

    if (password.length < 6 || confirmPassword.length < 6) {
      alert("<6");
      return;
    }

    if (password !== confirmPassword) {
      alert("no =");
      return;
    }

    try {
      await signUpHandle(mail, password);
      navigate("/");
    } catch (err) {
      console.error(err);
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
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      {!currentUser && (
        <Space
          style={{
            height: "50%",
            width: "50%",
            backgroundImage: `url(${
              process.env.PUBLIC_URL + "/img/img-1.png"
            })`,
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
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Item>
            <Button onClick={submitHandle}>Sign up</Button>
          </Form>

          <Space>
            Already account :
            <Button onClick={() => navigate("/login")}>log in</Button>
          </Space>
        </Space>
      )}
    </div>
  );
};

export default NewUser;
