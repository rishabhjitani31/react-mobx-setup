import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { Input } from "antd";

@inject("dashboard")
@observer
class Dashboard extends Component {
  render() {
    const {
      globals: { isLoggedIn },
      dashboard: { inputValue, onChange }
    } = this.props;
    return (
      <>
        <h4>Dashboard</h4>
        <div>User is logged in: {isLoggedIn ? "Yes" : "No"}</div>
        <Input
          placeholder="Type here.."
          onChange={onChange}
          value={inputValue}
          style={{ width: "250px" }}
        />
        {inputValue && <div>You typed: {inputValue}</div>}
      </>
    );
  }
}

export default Dashboard;
