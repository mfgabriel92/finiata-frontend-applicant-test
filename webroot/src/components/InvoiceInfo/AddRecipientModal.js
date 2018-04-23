import React, { Component } from "react";
import PropTypes from "prop-types";
import { ModalContainer, ModalDialog } from "react-modal-dialog-react16";
import Input from "../common/Input";
import validate from "../../utils/validators/recipient";

class AddRecipientModal extends Component {
  constructor(props) {
    super(props);

    this.defaultState = {
      name: "",
      surname: "",
      address: "",
      phone: "",
      show: false,
      errors: {}
    };

    this.state = this.defaultState;
  }

  open = () => {
    this.setState({ show: true });
  };

  close = () => {
    this.setState({ show: false });
  };

  handleOnChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  };

  isValid = (data) => {
    const { errors, isValid } = validate(data);

    if (!isValid) {
      this.setState({ errors });
      return false;
    }

    return true;
  };

  handleOnSubmit = (e) => {
    e.preventDefault();

    if (this.isValid(this.state)) {
      const { addRecipient } = this.props;
      addRecipient(1, this.state);
    }
  };

  render() {
    const { name, surname, address, phone, show, errors } = this.state;

    return (
      show && <ModalContainer>
        <ModalDialog>
          <div className="col-lg-12">
            <h3>Add Recipient</h3>
          </div>
          <hr/>
          <div className="col-lg-12">
            <Input label="Name" name="name" value={name} onChange={this.handleOnChange} error={errors.name}/>
            <Input label="Surname" name="surname" value={surname} onChange={this.handleOnChange} error={errors.surname}/>
            <Input label="Address" name="address" value={address} onChange={this.handleOnChange} error={errors.address}/>
            <Input label="Phone" name="phone" value={phone} onChange={this.handleOnChange} error={errors.phone}/>
          </div>
          <hr/>
          <div className="col-lg-12 float-right">
            <button className="btn btn-default float-right" onClick={this.close}>Cancel</button>
            <button className="btn btn-primary float-right" onClick={this.handleOnSubmit}>Submit</button>
          </div>
        </ModalDialog>
      </ModalContainer>
    )
  }
}

AddRecipientModal.propTypes = {
  addRecipient: PropTypes.func.isRequired,
  recipients: PropTypes.object.isRequired
};
//
// AddRecipientModal.defaultProps = {};

export default AddRecipientModal;