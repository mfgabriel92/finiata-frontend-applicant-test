import React, { Component } from "react";
import PropTypes from "prop-types";
import cx from "classnames";

class Button extends Component {
  render() {
    const { className, onClick, text } = this.props;

    return (
      <div className="form-group">
        <button className={cx("btn", className)} onClick={onClick}>
          {text}
        </button>
      </div>
    )
  }
}

Button.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string
};

Button.defaultProps = {
  text: "Submit"
};

export default Button;