import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ModalTitle from "react-bootstrap/ModalTitle";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalBody from "react-bootstrap/ModalBody";
import ModalFooter from "react-bootstrap/ModalFooter";
import "bootstrap/dist/css/bootstrap.min.css";
const CartModal = function (props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      animation={true}
      dialogClassName="cart-modal"
    >
      <Modal.Header>
        <ModalTitle bsPrefix="cart-modal__title">Your Cart</ModalTitle>
      </Modal.Header>
      <Modal.Body>
        Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
        dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
        consectetur ac, vestibulum at eros.
      </Modal.Body>
      <ModalFooter bsPrefix="cart-modal__footer">
        <Button variant="success">Continue to Payment</Button>
        <Button onClick={props.onHide} variant="danger">
          Continue Shopping
        </Button>
      </ModalFooter>
    </Modal>
  );
};
export default CartModal;
