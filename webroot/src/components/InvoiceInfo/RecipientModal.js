import React from "react";
import PropTypes from "prop-types";
import Input from "../common/Input";
import Button from "../common/Button";
import validate from "../../utils/validators/recipient";
import BaseModal from "../common/BaseModal";
import FontAwesome from "react-fontawesome";

class RecipientModal extends BaseModal {
  constructor(props) {
    super(props);

    this.defaultState = {
      name: "",
      surname: "",
      address: "",
      phone: "",
      recipient: null,
      errors: {},
    };

    this.state = this.defaultState;
    this.editing = false;
  }

  setEditing = (editing) => {
    this.editing = editing;
  };

  componentWillReceiveProps(nextProps) {
    const { recipients: { addingRecipientSuccess, updatingRecipientSuccess, recipient } } = nextProps;

    if (recipient) {
      this.setEditing(true);
      this.setState({ ...recipient });
    }

    if (addingRecipientSuccess || updatingRecipientSuccess) {
      this.close();
      this.setState(...this.defaultState);
    }
  }

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

    const { id } = this.state;

    if (this.isValid(this.state)) {
      switch (this.editing) {
        case true:
          const { updateRecipient } = this.props;
          updateRecipient(id, this.state);
          break;
        case false:
          const { addRecipient } = this.props;
          addRecipient(this.state);
          break;
        default:
          console.log("It won't reach here.");
          break;
      }
    }
  };

  renderHeader = () => {
    return (
      <h3>
        {
          this.editing
            ? <span><FontAwesome name="pencil"/> Edit </span>
            : <span><FontAwesome name="plus"/> Add </span>
        }
        Recipient
      </h3>
    )
  };

  renderBody = () => {
    const { name, surname, address, phone, errors } = this.state;

    return (
      <div>
        <Input label="Name" name="name" value={name} onChange={this.handleOnChange} error={errors.name}/>
        <Input label="Surname" name="surname" value={surname} onChange={this.handleOnChange} error={errors.surname}/>
        <Input label="Address" name="address" value={address} onChange={this.handleOnChange} error={errors.address}/>
        <Input label="Phone" name="phone" value={phone} onChange={this.handleOnChange} error={errors.phone}/>
      </div>
    )
  };

  renderFooter = () => {
    return (
      <div className="row">
        <div className="col-lg-6">
          <Button
            className="btn-default col-lg-12"
            text="Cancel"
            onClick={this.close}
          />
        </div>
        <div className="col-lg-6">
          <Button
            className="btn-primary col-lg-12"
            onClick={this.handleOnSubmit}
          />
        </div>
      </div>
    )
  };
}

RecipientModal.propTypes = {
  addRecipient: PropTypes.func.isRequired,
  recipients: PropTypes.object.isRequired
};

export default RecipientModal;