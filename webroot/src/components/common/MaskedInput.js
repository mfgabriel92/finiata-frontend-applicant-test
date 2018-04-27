import React, { Component } from "react";
import PropTypes from "prop-types";
import Cleave from "cleave.js/react";
import cx from "classnames";

class MaskedInput extends Component {
  render() {
    const {
      label,
      name,
      classNames,
      value,
      placeholder,
      options,
      onChange,
      error
    } = this.props;

    return (
      <div className="form-group">
        { label && <label>{label}</label> }
        <Cleave
          className={cx("form-control", classNames)}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          options={options}
        />
        {error && <span className="error-label small float-right text-danger">{error}</span>}
      </div>
    )
  }
}

MaskedInput.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  options: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
};

export default MaskedInput;