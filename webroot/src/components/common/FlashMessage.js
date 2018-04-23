import React, { Component } from "react";
import { deleteFlashMessage } from "../../actions/app";
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

  getContent = () => {
    const { flash: { message, type } } = this.props;

    console.log(message.isArray);
  };

  render() {
    const { flash: { message, type } } = this.props;
    const { hide } = this.state;

    let modalClass;
    let spanClass;

    switch (type) {
      case "success":
        modalClass = "alert-success";
        spanClass = "text-success";
        break;
      case "processing":
        modalClass = "alert-warning";
        spanClass = "text-warning";
        break;
      case "error":
        modalClass = "alert-danger";
        spanClass = "text-danger";
        break;
    }

    return (
      !hide && <div className={cx("text-center alert", modalClass)}>
        <span className={spanClass}>
          {
            type === "error"
              ? message.message
              : message
          }
        </span>
      </div>
    )
  }
}

export default FlashMessage;