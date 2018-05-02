import React, { Component } from "react";
import PropTypes from "prop-types";
import Input from "../common/Input";
import Button from "../common/Button";
import FontAwesome from "react-fontawesome";
import moment from "moment";

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

  handleAddClick = (item) => {
    const { addAdditionalFile } = this.props;
    const { description } = this.state;

    addAdditionalFile(item, description);
  };

  handleRemoveClick = (item) => {
    const { deleteAdditionalFile } = this.props;

    item.hasOwnProperty("id")
      ? deleteAdditionalFile(null, item.id)
      : deleteAdditionalFile(item)
  };

  getItemName = (name) => {
    if (name.startsWith(moment().format("Y"))) {
      name = name.substr(20);
    }

    if (name.length > 30) {
      const firstPart = name.substr(0, 25);
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

  renderFilename = (name) => {
    const { item, showControls } = this.props;

    return (
      <div>
        <FontAwesome name={this.getItemFileIcon(name)} className="file-icon"/>
        <span className="small">
            {
              showControls
                ? <span>{this.getItemName(name)}</span>
                : <a href={`http://localhost:3333/${item.path}`} target="_blank">{name}</a>
            }
        </span>
      </div>
    )
  };

  renderFileDescription = () => {
    const { item, showControls } = this.props;
    const { description } = this.state;

    return (
      showControls
        ? <Input
          name="description"
          value={description}
          onChange={this.handleOnChange}
          placeholder="Write a short description..."
        />
        : <span>{item.description || ""}</span>
    )
  };

  renderFileButtons = () => {
    const { item, showControls } = this.props;

    return (
      showControls
        ? <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
              <Button
                className="btn-primary col-lg-12"
                onClick={() => this.handleAddClick(item)}
                text={<FontAwesome name="check"/>}/>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
              <Button
                className="btn-danger col-lg-12"
                onClick={() => this.handleRemoveClick(item)}
                text={<FontAwesome name="trash"/>}/>
            </div>
          </div>
        : <div className="additional-files-added">
            <span className="small text-md-hide">
              {moment(item.created_at).format("MM/DD/YYYY \\, HH:mm A")}
            </span>
            <Button
              className="btn-danger btn-sm"
              onClick={() => this.handleRemoveClick(item)}
              text={<FontAwesome name="trash"/>}/>
          </div>
    )
  };

  render() {
    const { item } = this.props;
    const name = item.name || item.filename;

    return (
      <div className="col-lg-12 additional-file">
        <div className="row">
          <div className="col-lg-4 col-md-5 col-sm-5 col-xs-12">
            {this.renderFilename(name)}
          </div>
          <div className="col-lg-5 col-md-5 col-sm-5 col-xs-12">
            {this.renderFileDescription()}
          </div>
          <div className="col-lg-3 col-md-2 col-sm-2 col-xs-12 text-left">
            {this.renderFileButtons()}
          </div>
        </div>
      </div>
    )
  }
}

AdditionalFilesItem.propTypes = {
  item: PropTypes.object,
  deleteAdditionalFile: PropTypes.func,
  addAdditionalFile: PropTypes.func,
  showControls: PropTypes.bool
};

AdditionalFilesItem.defaultProps = {
  showControls: true
};

export default AdditionalFilesItem;