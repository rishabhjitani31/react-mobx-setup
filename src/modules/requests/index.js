import React, { Component } from "react";
import { Icon } from "antd";

class Requests extends Component {
  render() {
    return (
      <div className="requests">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h2>Requests</h2>
          <span>
            Configure Requests Module{" "}
            <Icon
              style={{ fontSize: "20px", cursor: "pointer" }}
              type="setting"
            />
          </span>
        </div>
      </div>
    );
  }
}

export default Requests;
