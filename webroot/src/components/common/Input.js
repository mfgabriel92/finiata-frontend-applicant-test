import React, { Component } from "react";
import PropTypes from "prop-types";
import cx from "classnames";

class Input extends Component {
  render() {
    const {
      label,
      type,
      name,
      value,
      className,
      placeholder,
      onChange,
      error
    } = this.props;

    return (
      <div className="form-group">
        { label && <label>{label}</label> }
        <input
          type={type}
          name={name}
          value={value}
          className={cx("form-control", className, error && "is-invalid")}
          placeholder={placeholder}
          onChange={onChange}
        />
        {error && <span className="error-label small float-right text-danger">{error}</span>}
      </div>
    )
  }
}

Input.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

Input.defaultProps = {
  type: "text"
};

export default Input;