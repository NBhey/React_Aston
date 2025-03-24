import React, { Component } from "react";

class MyClassComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
      submittedValue: "",
      stateButton: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);

  }
  handleInputChange = (event) => {
    this.setState({ inputValue: event.target.value , stateButton: event.target.value.toLowerCase().includes("react")});  
    if(this.state.stateButton){
      console.warn('продолжайте печатать, кнопка доступна')
    }
  };

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ submittedValue: this.state.inputValue });
    this.setState({ inputValue: "" }, () => {
      console.log("State после отправки:", this.state);
    });
  }

  componentDidMount() {
    console.log("Компонент смонтирован");
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("Компонент обновлен", prevProps, prevState);
  }

  componentWillUnmount() {
    console.log("Компонент размонтирован");
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Введите текст:
            <input
              type="text"
              value={this.state.inputValue}
              onChange={this.handleInputChange}
            />
          </label>
          <button type="submit" disabled = {this.state.stateButton}>Отправить</button>
        </form>
        <ChildComponent
          value={this.state.submittedValue}
          cb={() => console.log("Ребенок смонтирован!")}
        />
      </div>
    );
  }
}

class ChildComponent extends Component {
  componentDidMount() {
    console.log("Ребенок-компонент смонтирован");
    if (this.props.cb) {
      this.props.cb();
    }
  }

  componentDidUpdate(prevProps) {
    console.log("Ребенок-компонент обновлен", prevProps);
  }

  componentWillUnmount() {
    console.log("Ребенок компонент демонтирован");
  }

  render() {
    return (
      <div>
        <p>Переданное значение: {this.props.value}</p>
      </div>
    );
  }
}

export default MyClassComponent;
