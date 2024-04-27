import { Alert } from "react-bootstrap";
import PropTypes from "prop-types";

const Message = ({ variant, children }) => {
  return <Alert variant={variant}>{children}</Alert>;
};

Message.propTypes = {
  variant: PropTypes.string,
  children: PropTypes.array,
};

Message.defaultProps = {
  variant: "info",
};

export default Message;
