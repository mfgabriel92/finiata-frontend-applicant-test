import React, { Component } from "react";
import PropTypes from "prop-types";
import Dropzone from "react-dropzone";
import Button from "../common/Button";
import AdditionalFilesList from "./AdditionalFilesList";

class AdditionalFiles extends Component {
  constructor(props) {
    super(props);

    this.state = {
      additionalFiles: []
    }
  }

  handleOnDrop = (files) => {
    const { additionalFiles } = this.state;

    files.forEach((f) => {
      additionalFiles.push(f);
    });

    this.setState({ additionalFiles });
  };

  render() {
    const { onSubmit } = this.props;
    const { additionalFiles } = this.state;

    return (
      <div className="row block">
        <div className="col-lg-12">
          <AdditionalFilesList list={additionalFiles} />
        </div>
        <div className="col-lg-12">
          <Dropzone
            multiple={true}
            className={"dropzone"}
            activeClassName={"active-dropzone"}
            rejectClassName={"reject-dropzone"}
            onDrop={this.handleOnDrop}
          >
            <p>Drag additional files here</p>
          </Dropzone>
        </div>
        <div className="col-lg-12 text-right">
          <Button
            className="btn-primary col-lg-2 col-md-6 col-sm-12"
            text="Proceed"
            onClick={onSubmit}
          />
        </div>
      </div>
    )
  }
}

AdditionalFiles.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default AdditionalFiles;