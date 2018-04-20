import Home from "../../components/Home";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { uploadInvoice } from "../../actions/invoices/invoices";

function mapStateToProps(state) {
  return {
    invoice: {
      post: state.uploadInvoice
    }
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    uploadInvoice
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);