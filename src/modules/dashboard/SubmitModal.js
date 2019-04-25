import React, { Component } from "react";
import { Modal, Form, Input, Icon, Button } from "antd";
import { observer, inject } from "mobx-react";
import { toJS } from "mobx";
import apiService from "../../services/RequestServices";

@inject("dashboard")
@observer
class SubmitModal extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  handleCancel = () => this.props.dashboard.toggleModalState(false);

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        try {
          const { email = "" } = values;
          const score = toJS(this.props.dashboard.score);
          const data = { score, email };
          // eslint-disable-next-line no-unused-vars
          const res = await apiService.postQuizResults(data);
          let performance = "";
          if (0 <= score && score <= 3) {
            performance = "below average";
          } else if (3 <= score && score <= 6) {
            performance = "average";
          } else if (6 <= score && score <= 9) {
            performance = "good";
          } else {
            performance = "excellent";
          }
          const handleCancel = this.handleCancel;
          Modal.info({
            title: "This is a quiz result",
            content: (
              <div>
                <p>Your Score is {score}</p>
                <p>Your Performance is {performance}</p>
              </div>
            ),
            onOk() {
              handleCancel();
            }
          });
        } catch (err) {
          console.log(err);
        }
      }
    });
  };

  validateEmail = (rule, value, callback) => {
    // eslint-disable-next-line no-useless-escape
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(value).toLowerCase())) {
      callback("Enter Valid Email Address");
    } else {
      callback();
    }
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    if (!this.props.dashboard.visible) return null;
    return (
      <Modal
        title="Sumbit your details to get the quiz results"
        visible={true}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        footer={null}
      >
        <Form onSubmit={this.handleSubmit}>
          <Form.Item>
            {getFieldDecorator("email", {
              rules: [
                { required: true, message: "Please enter your email!" },
                { validator: this.validateEmail }
              ]
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Email"
              />
            )}
          </Form.Item>

          <center>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </center>
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(SubmitModal);
