import React, { Component } from "react";
import PropTypes from "prop-types";
import cx from "classnames";

class Button extends Component {
  render() {
    const { className, onClick, text, showFromGroup } = this.props;

    return (
      <div className={showFromGroup && "form-group"}>
        <button className={cx("btn", className)} onClick={onClick}>
          {text}
        </button>
      </div>
    )
  }
}

Button.propTypes = {
  className: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string,
  showFromGroup: PropTypes.bool
};

Button.defaultProps = {
  text: "Submit",
  showFromGroup: false
};

export default Button;