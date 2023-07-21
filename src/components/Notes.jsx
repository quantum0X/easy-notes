import { Card } from "antd";
import React from "react";

const Notes = (props) => {
  const { Meta } = Card;
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
    >
      <Meta title={props.title} description={props.description} />
    </Card>
  );
};

export default Notes;
