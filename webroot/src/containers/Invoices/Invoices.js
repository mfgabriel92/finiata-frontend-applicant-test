import Invoices from "../../components/Invoices";
import { connect } from "react-redux";
import { setInvoiceFile, fetchInvoices, deleteUnsavedInvoiceFile } from "../../actions/invoices/invoices";
import { downloadAdditionalFile} from "../../actions/additionalFiles/additionalFiles";

const mapActionCreators = {
  setInvoiceFile,

  fetchInvoices,
  deleteUnsavedInvoiceFile,
  downloadAdditionalFile
};

const mapStateToProps = state => ({
  invoices: state.invoices
});

export default connect(mapStateToProps, mapActionCreators)(Invoices);
