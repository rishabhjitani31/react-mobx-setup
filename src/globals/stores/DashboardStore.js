import { observable } from "mobx";

class GlobalStore {
  @observable inputValue = "";
  @observable visible = false;
  @observable score = 0;
  @observable slideData = null;
  @observable currentIndex = 0;
  @observable selectedAnswers = [];

  onChange = e => {
    this.inputValue = e.target.value;
  };

  toggleModalState = visible => {
    this.visible = visible;
  };

  setScore = score => {
    this.score = score;
  };

  setSlideData = slideData => {
    this.slideData = slideData;
  };

  setCurrentIndex = currentIndex => {
    this.currentIndex = currentIndex;
  };

  setSelectedAnswers = selectedAnswers => {
    this.selectedAnswers = selectedAnswers;
  };
}

export default GlobalStore;
