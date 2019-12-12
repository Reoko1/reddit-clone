import { connect } from "react-redux";
import { Header } from "./Header";
import { toggleLogin, toggleRegister } from "../../ducks/modals";

const mapStateToProps = state => ({
  loginOpen: state.modals.login,
  registerOpen: state.modals.register
});

const mapDispatchToProps = { toggleLogin, toggleRegister };

export default connect(mapStateToProps, mapDispatchToProps)(Header);
