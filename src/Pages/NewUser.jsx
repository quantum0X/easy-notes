import { Button, Form, Image, Input, Space, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { MailOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import { db } from "../firebase";
import { collection } from "firebase/firestore";

const NewUser = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { currentUser, signUpHandle } = useAuth();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const dataRef = collection(db, "notes");

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

  // useEffect(() => {
  //   const getData = async () => {
  //     const data = await getDocs(dataRef);
  //     // console.log();
  //     setNotes(data.docs.map((docs) => ({ ...docs.data(), id: docs.id })));
  //   };

  //   getData();
  // }, []);

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
        <div
          style={{
            display: "flex",
            height: "70vh",
            width: "80vw",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            height={"100%"}
            width="fit-content"
            src={process.env.PUBLIC_URL + "/img/signupImg.jpg"}
            alt="img"
          />
          <Form
            style={{
              width: "30%",
              height: "100%",
              background: "brown",
              padding: "20px",
            }}
            form={form}
          >
            <Form.Item>
              <Input
                prefix={<UserOutlined />}
                style={{ width: "50%" }}
                placeholder="First Name"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />
              <Input
                prefix={<UserOutlined />}
                style={{ width: "50%" }}
                placeholder="Last Name"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
            </Form.Item>
            <Form.Item
              rules={[{ required: true, message: "please enter mail" }]}
            >
              <Input
                prefix={<MailOutlined />}
                type="text"
                placeholder="Email Address"
                value={mail}
                onChange={(e) => setMail(e.target.value)}
              />
            </Form.Item>
            <Form.Item>
              <Input
                prefix={<LockOutlined />}
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Item>
            <Form.Item>
              <Input
                prefix={<LockOutlined />}
                type="password"
                placeholder="confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Item>
            <Button onClick={submitHandle}>Sign up</Button>

            <div>
              <Typography.Text level={4}>Already account:</Typography.Text>
              <Typography.Link onClick={() => navigate("/login")}>
                log in
              </Typography.Link>
            </div>
          </Form>
        </div>
      )}
    </div>
  );
};

export default NewUser;
