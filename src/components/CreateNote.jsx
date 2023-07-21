import { Button, Form, Input, Modal, Row } from "antd";
import React, { useState } from "react";

const CreateNote = (props) => {
  const [open, setOpen] = useState(false);
  const [notes, setNotes] = useState({
    color: "#ffffff",
    title: "",
    description: "",
  });

  const submitHandle = (e) => {
    e.preventDefault();
    props.onChange(notes);
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
          />
        </Row>
        <Form layout="vertical" style={{ textAlign: "center" }}>
          <Form.Item>
            <Input
              name="title"
              placeholder="Title"
              value={notes.title}
              onChange={onChangeHandle}
            />
          </Form.Item>
          <Form.Item>
            <Input
              name="description"
              type="textarea"
              placeholder="description"
              value={notes.description}
              onChange={onChangeHandle}
            />
          </Form.Item>
        </Form>
      </Modal>
      <Button onClick={() => setOpen(true)}>Add Notes</Button>
    </>
  );
};

export default CreateNote;
