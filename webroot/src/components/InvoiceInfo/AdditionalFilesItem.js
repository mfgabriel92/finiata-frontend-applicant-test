import React, { Component } from "react";
import PropTypes from "prop-types";
import Input from "../common/Input";
import Button from "../common/Button";
import FontAwesome from "react-fontawesome";

class AdditionalFilesItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      description: ""
    };
  }

  handleOnChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  };

  handleAddClick = () => {

  };

  handleRemoveClick = () => {

  };

  getItemName = (name) => {
    if (name.length > 25) {
      const firstPart = name.substr(0, 20);
      const lastPart = name.substr(-4);

      return firstPart + "..." + lastPart;
    }

    return name;
  };

  getItemFileIcon = (name) => {
    switch (name.substr(-3)) {
      case "pdf":
        return "file-pdf-o";
      case "ocx" || "doc":
        return "file-word-o";
      case "png" || "gif" || "jpg" || "peg":
        return "file-photo-o";
      default:
        return "file";
    }
  };

  render() {
    const { item } = this.props;
    const { description } = this.state;

    return (
      <div className="col-lg-12 additional-file">
        <div className="row">
          <div className="col-lg-3 col-md-6 col-sm-12">
            <FontAwesome name={this.getItemFileIcon(item.name)} className="file-icon"/>
            <span className="small">{this.getItemName(item.name)}</span>
          </div>
          <div className="col-lg-7 col-md-12">
            <Input
              name="description"
              value={description}
              onChange={this.handleOnChange}
              placeholder="Write a short description..."
            />
          </div>
          <div className="col-lg-2 col-md-12">
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                <Button
                  className="btn-primary col-lg-12"
                  onClick={this.handleAddClick}
                  text={<FontAwesome name="check"/>}/>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                <Button
                  className="btn-danger col-lg-12"
                  onClick={this.handleRemoveClick}
                  text={<FontAwesome name="trash"/>}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

AdditionalFilesItem.propTypes = {
  item: PropTypes.object.isRequired
};

export default AdditionalFilesItem;