import React, { Component } from "react";
import { deleteFlashMessage } from "../../actions/app";
import FontAwesome from "react-fontawesome";
import cx from "classnames";

class FlashMessage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hide: true,
    };
  }

  componentDidMount() {
    const { flash: { message } } = this.props;
    message && this.hideMessage();
  }

  componentWillReceiveProps(nextProps) {
    const { flash: { message } } = nextProps;
    message && this.hideMessage();
  }

  hideMessage = () => {
    this.setState({ hide: false });

    setTimeout(() => {
      this.setState({ hide: true });
      deleteFlashMessage();
    }, 4000);
  };

  render() {
    const {
      flash: {
        message,
        type
      }
    } = this.props;

    const { hide } = this.state;

    let modalClass;
    let icon;

    switch (type) {
      case "success":
        modalClass = "alert-success";
        icon = "check";
        break;
      case "processing":
        modalClass = "alert-warning";
        icon = "warning";
        break;
      case "error":
        modalClass = "alert-danger";
        icon = "close";
        break;
      default:
        modalClass = "alert-default";
        icon = "question";
        break;
    }

    let text = type === "error"
      ? message.response.message || message.response.sqlMessage
      : message;

    return (
      !hide && <div className={cx("text-center alert", modalClass)}>
        <FontAwesome name={icon} className="flash-file-icon"/>
        <span>
          {text && text.charAt(0).toUpperCase() + text.slice(1)}
        </span>
      </div>
    )
  }
}

export default FlashMessage;