import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ModalTitle from "react-bootstrap/ModalTitle";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalBody from "react-bootstrap/ModalBody";
import ModalFooter from "react-bootstrap/ModalFooter";
import "bootstrap/dist/css/bootstrap.min.css";
import Context from "../../store/context";
import { useContext, useState, useEffect } from "react";
import Notification from "../ui/notification";
import { notificationMessage } from "../../lib/helper";
const CartModal = function (props) {
  const [requestStatus, setRequestStatus] = useState();
  // pending, success, error
  const [requestError, setRequestError] = useState();
  const Ctx = useContext(Context);
  useEffect(() => {
    if (requestStatus === "success" || requestStatus === "error") {
      const timer = setTimeout(() => {
        setRequestStatus(null);
        setRequestError(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [requestStatus]);
  const sendCartData = async function (cartData) {
    setRequestStatus("pending");
    try {
      const response = await fetch("/api/user-data/send-cart", {
        method: "PATCH",
        body: JSON.stringify(cartData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      setRequestStatus("success");
      const data = response.json();
    } catch (e) {
      setRequestError(error.message);
      setRequestStatus("error");
    }
  };
  let notification;
  if (requestStatus === "pending") {
    notification = notificationMessage(
      "pending",
      "Sending data",
      "Request pending"
    );
  } else if (requestStatus === "success") {
    notification = notificationMessage(
      "success",
      "Success!",
      "Purchase is successful!"
    );
  } else if (requestStatus === "error") {
    notification = notificationMessage(
      "error",
      "There was an error",
      requestError
    );
  }
  return (
    <div>
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
      <div className="profileContainer__notification">
        {notification && (
          <Notification
            status={notification.status}
            title={notification.title}
            message={notification.message}
          />
        )}
      </div>
    </div>
  );
};
export default CartModal;
