import React, { Component } from "react";
import { Button } from "antd";
import { observer, inject } from "mobx-react";
import { withRouter } from "react-router-dom";

@inject("dashboard")
@observer
class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  onSubmit = () => {
    console.log('this.props', this.props)
    console.log('called')
    this.props.history.push('/home')
  }

  render() {
    return (
      <Button onClick={this.onSubmit} type="primary">
        Submit
      </Button>
    );
  }
}

export default withRouter(LandingPage);
