import React, { Component } from "react";
import PropTypes from "prop-types";
import Dropzone from "react-dropzone";
import Button from "../common/Button";

class AdditionalFiles extends Component {
  render() {
    const { onSubmit } = this.props;

    return (
      <div className="row block">
        <div className="col-lg-12">
          <Dropzone
            accept="application/pdf"
            className={"dropzone"}
            activeClassName={"active-dropzone"}
            rejectClassName={"reject-dropzone"}
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