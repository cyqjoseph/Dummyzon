import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ModalTitle from "react-bootstrap/ModalTitle";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalBody from "react-bootstrap/ModalBody";
import ModalFooter from "react-bootstrap/ModalFooter";
import "bootstrap/dist/css/bootstrap.min.css";
import Context from "../../store/context";
import { useContext } from "react";
const CartModal = function (props) {
  const Ctx = useContext(Context);

  const sendCartData = async function (cartData) {
    try {
      const response = await fetch("/api/user-data/send-cart", {
        method: "PATCH",
        body: JSON.stringify(cartData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = response.json();
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      animation={true}
      dialogClassName="cart-modal"
    >
      <ModalHeader>
        <div className="cart-modal__title">Your Cart</div>
        <div className="cart-modal__cost">Total cost: ${Ctx.cartPrice}</div>
      </ModalHeader>
      <ModalBody bsPrefix="cart-modal__body">
        <div>
          <ul className="cart-modal__body-ul">
            {Ctx.cartItems?.map((cartItem) => (
              <li key={cartItem.title} className="cart-modal__body-list">
                <div className="cart-modal__body-list-title">
                  {cartItem.title} x{cartItem.count}
                </div>
                <div>
                  <span className="cart-modal__body-list-buttons">
                    <Button
                      variant="success"
                      onClick={Ctx.addCartItem.bind(null, cartItem)}
                    >
                      +
                    </Button>
                  </span>
                  <span className="cart-modal__body-list-buttons">
                    <Button
                      variant="danger"
                      onClick={Ctx.removeCartItem.bind(null, cartItem)}
                    >
                      -
                    </Button>
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </ModalBody>
      <ModalFooter bsPrefix="cart-modal__footer">
        <Button variant="warning" onClick={props.onHide}>
          Continue Shopping
        </Button>
        <Button
          variant="success"
          onClick={sendCartData.bind(null, Ctx.cartItems)}
        >
          Continue to Payment
        </Button>
      </ModalFooter>
    </Modal>
  );
};
export default CartModal;
