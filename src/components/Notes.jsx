import { Card } from "antd";
import React from "react";

const Notes = (props) => {
  const { Meta } = Card;
  return (
    <Card.Grid
      style={{ background: `${props.color}`, width: "250px", height: "200px" }}
    >
      <Meta title={props.title} description={props.description} />
    </Card.Grid>
  );
};

export default Notes;
