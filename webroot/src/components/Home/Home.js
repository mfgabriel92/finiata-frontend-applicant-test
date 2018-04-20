import React, { Component } from "react";
import Dropzone from "react-dropzone";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      invoice: []
    }
  }

  handleOnDrop = (invoice) => {
    this.setState({ invoice });
  }

  render() {
    return (
      <div id="home">
        <h1>Upload your invoice</h1>
        <Dropzone
          accept=".pdf"
          preventDropOnDocument={false}
          multiple={false}
          className={"invoice-dropzone"}
          onDrop={this.handleOnDrop}
        >
          <p>drag your files here...</p>
        </Dropzone>
      </div>
    )
  }
}

export default Home;