import React, { Component } from "react";
import PropTypes from "prop-types";
import AdditionalFilesItem from "./AdditionalFilesItem";

class AdditionalFilesList extends Component {
  render() {
    const { list, deleteAdditionalFile, addAdditionalFile, showControls } = this.props;

    return (
      list && list.length > 0 && <div className="additional-files">
        <div className="row">
          {
            list.map((item) => {
              return (
                <AdditionalFilesItem
                  item={item}
                  deleteAdditionalFile={deleteAdditionalFile}
                  addAdditionalFile={addAdditionalFile}
                  showControls={showControls}
                />
              )
            })
          }
        </div>
      </div>
    )
  }
}

AdditionalFilesList.propTypes = {
  list: PropTypes.array,
  deleteAdditionalFile: PropTypes.func,
  addAdditionalFile: PropTypes.func,
  showControls: PropTypes.bool
};

AdditionalFilesList.defaultProps = {
  list: [],
  showControls: true
};

export default AdditionalFilesList;