import { Container, Row, Col } from 'react-bootstrap'
import PropTypes from "prop-types";

const FormContainer = ({ children }) => {
  return (
    <Container>
        <Row className="justify-content-md-center">
            <Col xs={12} md={6}>
                {children}
            </Col>
        </Row>
    </Container>
  )
}

FormContainer.propTypes = {
  children: PropTypes.string
}

export default FormContainer