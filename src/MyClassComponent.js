import React, { Component } from "react";

class MyClassComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
      submittedValue: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleInputChange = (event) => {
    console.log({ inputValue: event.target.value });
    this.setState({ inputValue: event.target.value });
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
          <button type="submit">Отправить</button>
        </form>
        <ChildComponent value={this.state.submittedValue} cb={() => console.log('Ребенок смонтирован!')} />
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
