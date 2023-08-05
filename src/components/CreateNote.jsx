import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, notification, Modal, Row } from "antd";
import React, { useState } from "react";
import { getDocs, collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

const { TextArea } = Input;

const CreateNote = (props) => {
  const [open, setOpen] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const dbRef = collection(db, "notes");

  const [notes, setNotes] = useState({
    color: "#ffffff",
    title: "",
    description: "",
  });

  const openNotificationWithIcon = () => {
    api["warning"]({
      message: "Title may not be empty",
    });
  };

  const submitHandle = (e) => {
    e.preventDefault();
    if (notes.title === "") {
      openNotificationWithIcon();
      return;
    }
    props.onChange(notes);
    addDoc(dbRef, notes)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    cancelHandle();
  };

  const cancelHandle = () => {
    setNotes({
      color: "#ffffff",
      title: "",
      description: "",
    });
    setOpen(false);
  };

  const onChangeHandle = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setNotes({ ...notes, [name]: value });
  };

  return (
    <>
      {contextHolder}
      <Modal
        title="Add Notes"
        bodyStyle={{ width: "100%" }}
        open={open}
        onCancel={cancelHandle}
        okText="Add"
        onOk={submitHandle}
        centered
      >
        <Row justify="end">
          <Input
            style={{
              outlineStyle: "none",
              width: "50px",
              margin: "5px",
              padding: "0px 1px",
            }}
            name="color"
            type="color"
            value={notes.color}
            onChange={onChangeHandle}
            required
          />
        </Row>
        <Form layout="vertical" style={{ textAlign: "center" }}>
          <Form.Item>
            <Input
              name="title"
              placeholder="Title"
              value={notes.title}
              onChange={onChangeHandle}
              maxLength={30}
              showCount
            />
          </Form.Item>
          <Form.Item>
            <TextArea
              name="description"
              type="textarea"
              placeholder="description"
              value={notes.description}
              onChange={onChangeHandle}
              required
            />
          </Form.Item>
        </Form>
      </Modal>
      <Button icon={<PlusOutlined />} onClick={() => setOpen(true)}>
        Add Notes
      </Button>
    </>
  );
};

export default CreateNote;
