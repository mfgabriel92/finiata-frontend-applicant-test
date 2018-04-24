import React, { Component } from "react";
import PropTypes from "prop-types";
import Dropzone from "react-dropzone";
import Button from "../common/Button";
import AdditionalFilesList from "./AdditionalFilesList";
import _ from "lodash";

class AdditionalFiles extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filesList: []
    }
  }

  componentWillReceiveProps(nextProps) {
    const { additionalFiles: { addingAdditionalFileSuccess } } = nextProps;

    if (addingAdditionalFileSuccess) {
      this.setState({
        filesList: []
      })
    }
  }

  handleOnDrop = (files) => {
    const { filesList } = this.state;

    files.forEach((f) => {
      filesList.push(f);
    });

    this.setState({ additionalFiles: filesList });
  };

  handleDeleteAdditionalFile = (file) => {
    const { filesList } = this.state;
    const removed = _.remove(filesList, { name: file.name });

    this.setState({
      filesList: _.reject(filesList, removed[0].name)
    });
  };

  render() {
    const { onSubmit, addAdditionalFile, additionalFiles: { additionalFiles }  } = this.props;
    const { filesList } = this.state;

    return (
      <div className="row block">
        <div className="col-lg-12">
          <AdditionalFilesList
            list={additionalFiles}
            showControls={false}
          />
          <AdditionalFilesList
            list={filesList}
            deleteAdditionalFile={this.handleDeleteAdditionalFile}
            addAdditionalFile={addAdditionalFile}
          />
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
  onSubmit: PropTypes.func,
  addAdditionalFile: PropTypes.func,
  additionalFiles: PropTypes.object
};

export default AdditionalFiles;