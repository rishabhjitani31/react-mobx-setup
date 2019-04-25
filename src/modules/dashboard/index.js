import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { toJS } from "mobx";
import apiService from "../../services/RequestServices";
import { Spin, Carousel, Icon, Radio, Button } from "antd";
import SubmitModal from "./SubmitModal";
const RadioGroup = Radio.Group;
// import { Input } from "antd";

@inject("dashboard")
@observer
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.carousel = React.createRef();
  }

  onSubmit = () => {
    const { selectedAnswers } = this.getData();
    const correctAnswers = Object.entries(selectedAnswers)
      .map(([k, v]) => v)
      .filter(v => v);
    const score = correctAnswers.length;
    this.props.dashboard.setScore(score);
    this.props.dashboard.toggleModalState(true);
  };

  next = () => {
    this.carousel.next();
    const { currentIndex } = this.getData();
    this.props.dashboard.setCurrentIndex(currentIndex + 1);
  };

  previous = () => {
    this.carousel.prev();
    const { currentIndex } = this.getData();
    this.props.dashboard.setCurrentIndex(currentIndex - 1);
  };

  getData = () => {
    const selectedAnswers = toJS(this.props.dashboard.selectedAnswers);
    const currentIndex = toJS(this.props.dashboard.currentIndex);
    const slideData = toJS(this.props.dashboard.slideData);
    return { selectedAnswers, currentIndex, slideData };
  };

  onChange = e => {
    const { slideData, selectedAnswers, currentIndex } = this.getData();
    const selectedAnswer = slideData[currentIndex].answerOptions.find(
      a => a.id === e.target.value
    );
    this.props.dashboard.setSelectedAnswers({
      ...selectedAnswers,
      [currentIndex]: selectedAnswer.istrue
    });
  };

  async componentDidMount() {
    const res = await apiService.getQuestionsList();
    this.props.dashboard.setSlideData(res);
  }

  renderComponent = () => {
    const { slideData, currentIndex, selectedAnswers } = this.getData();
    // console.log("observable", slideData.length === selectedAnswers.length);
    // console.log("slideData", slideData);
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
          <center>
            <Button onClick={this.onSubmit} type="primary">
              Submit
            </Button>
          </center>
        )}
        <SubmitModal />
      </div>
    );
  };

  render() {
    return <>{this.getData().slideData ? this.renderComponent() : <Spin />}</>;
  }
}

export default Dashboard;
