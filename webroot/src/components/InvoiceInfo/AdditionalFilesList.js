import React, { Component } from "react";
import PropTypes from "prop-types";
import AdditionalFilesItem from "./AdditionalFilesItem";

class AdditionalFilesList extends Component {
  render() {
    const { list } = this.props;

    return (
      list.length > 0 && <div className="additional-files">
        <div className="row">
          {
            list.map((item) => {
              return (
                <AdditionalFilesItem item={item}/>
              )
            })
          }
        </div>
      </div>
    )
  }
}

AdditionalFilesList.propTypes = {
  list: PropTypes.array
};

AdditionalFilesList.defaultProps = {
  list: []
};

export default AdditionalFilesList;