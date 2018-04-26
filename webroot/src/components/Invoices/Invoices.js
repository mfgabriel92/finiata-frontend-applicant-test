import React, { Component } from "react";

class Invoices extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allInvoices: [],
      isLoading: false
    }
  }

  componentWillMount() {
    const { fetchInvoices } = this.props;

    fetchInvoices();
  }

  componentWillReceiveProps(nextProps) {
    const {
      invoices: {
        fetchingInvoices,
        fetchingInvoicesSuccess,
        allInvoices
      }
    } = nextProps;

    if (fetchingInvoices && !fetchingInvoicesSuccess) {
      this.setState({
        isLoading: true
      })
    }

    if (allInvoices && allInvoices.length > 0) {
      this.setState({
        allInvoices,
        isLoading: false
      })
    }
  }

  renderInvoices = () => {
    const { allInvoices, isLoading } = this.state;

    if (isLoading && allInvoices.length === 0) {
      return (<p>Loading...</p>)
    }

    return (
      <div>
        {
          allInvoices.map((i) => {
            return (
              <p>{i.filename}</p>
            )
          })
        }
      </div>
    )
  };

  render() {
    return (
      <div id="invoices">
        <div className="container">
          <div className="col-lg-12">
            <div className="row">
              <div className="col-lg-3">
                <h4>Unsaved Invoices</h4>
              </div>
              <div className="col-lg-9">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="row">
                      <h4>Invoices</h4>
                    </div>
                  </div>
                  {this.renderInvoices()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Invoices;