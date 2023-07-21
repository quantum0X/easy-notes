import { Button, Form, Input, Modal, Row } from "antd";
import React, { useState } from "react";

const CreateNote = () => {
  const [colorHex, setColorHex] = useState("#ffffff");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [open, setOpen] = useState(false);

  const submitHandle = (e) => {
    e.preventDefault();
    console.log(colorHex, title, description);
  };

  return (
    <>
      <Modal
        title="Add Notes"
        bodyStyle={{ width: "100%", background: `${colorHex}` }}
        open={open}
        onCancel={() => setOpen(false)}
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
            type="color"
            value={colorHex}
            onChange={(e) => setColorHex(e.target.value)}
          />
        </Row>
        <Form layout="vertical" style={{ textAlign: "center" }}>
          <Form.Item>
            <Input
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <Input
              type="comment"
              placeholder="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Item>
        </Form>
      </Modal>
      <Button onClick={() => setOpen(true)}>Add Notes</Button>
    </>
  );
};

export default CreateNote;
