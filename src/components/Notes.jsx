import { Button, Card, Space, Typography } from "antd";
import React, { useState } from "react";
import { collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { DeleteFilled } from "@ant-design/icons";

const Notes = ({ props }) => {
  const [isHover, setIsHover] = useState(false);
  const noteRef = collection(db, "notes");

  // delete handle
  const deleteHandle = async (id) => {
    await deleteDoc(doc(noteRef, id));
  };

  return (
    <Card
      style={{
        background: `${props.color}`,
        width: "250px",
        height: "200px",
        margin: "10px",
        overflow: "scroll",
        padding: "0px",
      }}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {isHover && (
        <Button
          icon={<DeleteFilled />}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
          }}
          onClick={() => deleteHandle(props.id)}
        />
      )}
      <Space
        direction="vertical"
        style={{ borderRadius: "10px", position: "relative" }}
      >
        <Typography.Title level={4}>{props.title}</Typography.Title>
        <Typography.Text>{props.description}</Typography.Text>
      </Space>
      <Typography.Text
        style={{
          position: "absolute",
          bottom: "05px",
          right: "8px",
          color: "#cfcfcf",
        }}
      >
        23aug ss
      </Typography.Text>
    </Card>
  );
};

export default Notes;
