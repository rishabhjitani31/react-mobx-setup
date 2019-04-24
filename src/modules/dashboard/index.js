import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { observable, toJS } from "mobx";
import apiService from "../../services/RequestServices";
import { Spin, Carousel, Icon, Radio, Button } from "antd";
const RadioGroup = Radio.Group;
// import { Input } from "antd";

@inject("dashboard")
@observer
class Dashboard extends Component {
  @observable data = null;
  @observable currentIndex = 0;
  @observable currentChecked = [];
  @observable selectedAnswers = [];
  constructor(props) {
    super(props);
    this.props = props;
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.carousel = React.createRef();
  }

  next() {
    this.carousel.next();
    const { currentIndex } = this.getData();
    this.currentIndex = currentIndex + 1;
  }
  previous() {
    this.carousel.prev();
    const { currentIndex } = this.getData();
    this.currentIndex = currentIndex - 1;
  }

  getData = () => {
    const selectedAnswers = toJS(this.selectedAnswers);
    const currentIndex = toJS(this.currentIndex);
    const slideData = toJS(this.data);
    return { selectedAnswers, currentIndex, slideData };
  };

  onChange = e => {
    const { slideData, selectedAnswers, currentIndex } = this.getData();
    const selectedAnswer = slideData[currentIndex].answerOptions.find(
      a => a.id === e.target.value
    );
    this.selectedAnswers = {
      ...selectedAnswers,
      [currentIndex]: selectedAnswer.istrue
    };
  };

  async componentDidMount() {
    const res = await apiService.getQuestionsList();
    this.data = res;
  }

  renderComponent = () => {
    const { slideData, currentIndex, selectedAnswers } = this.getData();
    // console.log("observable", slideData.length === selectedAnswers.length);
    console.log("currentChecked", selectedAnswers);
    const props = {
      dots: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    const radioStyle = {
      display: "block",
      height: "30px",
      lineHeight: "30px"
    };
    return (
      <div>
        {currentIndex !== 0 && (
          <Icon type="left-circle" onClick={this.previous} />
        )}
        <Carousel ref={node => (this.carousel = node)} {...props}>
          {slideData.map(d => (
            <div key={String(d.id)}>
              <h3>{d.questionName}</h3>
              <RadioGroup onChange={this.onChange}>
                {d.answerOptions.map(a => (
                  <Radio key={String(a.id)} style={radioStyle} value={a.id}>
                    {a.answerName}
                  </Radio>
                ))}
              </RadioGroup>
            </div>
          ))}
        </Carousel>
        {currentIndex !== slideData.length - 1 && (
          <Icon type="right-circle" onClick={this.next} />
        )}
        {slideData.length === Object.keys(selectedAnswers).length && (
          <center><Button type="primary">Submit</Button></center>
        )}
      </div>
    );
  };

  render() {
    return <>{this.data ? this.renderComponent() : <Spin />}</>;
  }
}

export default Dashboard;
