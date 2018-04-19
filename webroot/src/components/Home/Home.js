import React, { Component } from "react";

class Home extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.testGET();
  }

  showGetTestResult = () => {
    const { api: { get: { data } } } = this.props;

    if (!data) {
      return "Loading...";
    }

    return data.map((d) => {
      return (
        <p>{d.name}</p>
      )
    })
  };

  render() {
    return (
      <div>
        <h1>Testing API GET</h1>
        {this.showGetTestResult()}
      </div>
    )
  }
}

export default Home;