import React, { Component } from "react";
import PropTypes from "prop-types";
import Dropzone from "react-dropzone";
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

  handleDeleteAdditionalFile = (file, id) => {
    if (file) {
      const { filesList } = this.state;
      const removed = _.remove(filesList, { name: file.name });

      this.setState({
        filesList: _.reject(filesList, removed[0].name)
      });

      return;
    }

    const { removeAdditionalFile } = this.props;
    removeAdditionalFile(id);
  };

  render() {
    const {
      addAdditionalFile,
      additionalFiles: {
        additionalFiles
      }
    } = this.props;

    const { filesList } = this.state;

    return (
      <div className="row block">
        <div className="col-lg-12">
          <AdditionalFilesList
            list={additionalFiles}
            showControls={false}
            deleteAdditionalFile={this.handleDeleteAdditionalFile}
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
      </div>
    )
  }
}

AdditionalFiles.propTypes = {
  addAdditionalFile: PropTypes.func,
  additionalFiles: PropTypes.object,
  removeAdditionalFile: PropTypes.object,
};

export default AdditionalFiles;