import { connect } from "react-redux";

import { logout } from "../../actions/session_actions";
import Splash from "./Splash";

const mapStateToProps = state => {
  return {
    currentUser: state.entities.users[state.session.id]
  }
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Splash);